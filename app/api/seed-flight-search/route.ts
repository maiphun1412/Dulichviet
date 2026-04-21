import { NextResponse } from "next/server";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "../../../lib/firebase";

type FlightSearchSeedItem = {
  id: string;
  fromCode: string;
  fromLabel: string;
  toCode: string;
  toLabel: string;
  departDate: string;
  tripType: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  flightNumber: string;
  aircraft: string;
  departTime: string;
  arriveTime: string;
  durationText: string;
  stopsText: string;
  cabin: string;
  price: number;
  seatsLeft: number;
  baggageText: string;
  promoText: string;
  active: boolean;
  featured: boolean;
  carryOnText?: string;
  checkedBaggageText?: string;
  changePolicy?: string;
  refundPolicy?: string;
  renamePolicy?: string;
  createdAt?: unknown;
};

const airportMap = {
  SGN: "Hồ Chí Minh (SGN)",
  HAN: "Hà Nội (HAN)",
  DAD: "Đà Nẵng (DAD)",
  CXR: "Nha Trang (CXR)",
  HUI: "Huế (HUI)",
  PQC: "Phú Quốc (PQC)",
  BMV: "Buôn Ma Thuột (BMV)",
  VII: "Vinh (VII)",
};

type AirportCode = keyof typeof airportMap;

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function makeId(
  fromCode: string,
  toCode: string,
  departDate: string,
  airlineCode: string,
  departTime: string
) {
  return `${fromCode}-${toCode}-${departDate}-${airlineCode}-${departTime.replace(":", "")}`;
}

function timeToMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function addMinutes(time: string, plus: number) {
  return minutesToTime(timeToMinutes(time) + plus);
}

function durationText(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function getDurationMinutes(fromCode: AirportCode, toCode: AirportCode) {
  const key = `${fromCode}-${toCode}`;

  const routeDurationMap: Record<string, number> = {
    "SGN-HAN": 130,
    "HAN-SGN": 130,
    "SGN-DAD": 90,
    "DAD-SGN": 90,
    "HAN-DAD": 85,
    "DAD-HAN": 85,
    "SGN-CXR": 65,
    "CXR-SGN": 65,
    "HAN-CXR": 110,
    "CXR-HAN": 110,
    "SGN-HUI": 95,
    "HUI-SGN": 95,
    "HAN-HUI": 75,
    "HUI-HAN": 75,
    "SGN-PQC": 65,
    "PQC-SGN": 65,
    "HAN-PQC": 125,
    "PQC-HAN": 125,
    "SGN-BMV": 55,
    "BMV-SGN": 55,
    "HAN-BMV": 105,
    "BMV-HAN": 105,
    "SGN-VII": 110,
    "VII-SGN": 110,
    "HAN-VII": 55,
    "VII-HAN": 55,
    "DAD-CXR": 60,
    "CXR-DAD": 60,
    "DAD-PQC": 100,
    "PQC-DAD": 100,
  };

  return routeDurationMap[key] ?? 90;
}

function getBasePrice(fromCode: AirportCode, toCode: AirportCode) {
  const key = `${fromCode}-${toCode}`;

  const routePriceMap: Record<string, number> = {
    "SGN-HAN": 1299000,
    "HAN-SGN": 1399000,
    "SGN-DAD": 999000,
    "DAD-SGN": 999000,
    "HAN-DAD": 899000,
    "DAD-HAN": 899000,
    "SGN-CXR": 799000,
    "CXR-SGN": 799000,
    "HAN-CXR": 1099000,
    "CXR-HAN": 1099000,
    "SGN-HUI": 899000,
    "HUI-SGN": 899000,
    "HAN-HUI": 759000,
    "HUI-HAN": 759000,
    "SGN-PQC": 859000,
    "PQC-SGN": 859000,
    "HAN-PQC": 1499000,
    "PQC-HAN": 1499000,
    "SGN-BMV": 699000,
    "BMV-SGN": 699000,
    "HAN-BMV": 999000,
    "BMV-HAN": 999000,
    "SGN-VII": 1199000,
    "VII-SGN": 1199000,
    "HAN-VII": 689000,
    "VII-HAN": 689000,
    "DAD-CXR": 669000,
    "CXR-DAD": 669000,
    "DAD-PQC": 999000,
    "PQC-DAD": 999000,
  };

  return routePriceMap[key] ?? 999000;
}

function getAirlineLogo(code: string) {
  const map: Record<string, string> = {
    VN: "/airlines/vietnam-airlines.png",
    VJ: "/airlines/vietjet-air.png",
    QH: "/airlines/bamboo-airways.png",
    VU: "/airlines/vietravel-airlines.png",
  };

  return map[code] ?? "/airlines/default-airline.png";
}

function getAirlineName(code: string) {
  const map: Record<string, string> = {
    VN: "Vietnam Airlines",
    VJ: "VietJet Air",
    QH: "Bamboo Airways",
    VU: "Vietravel Airlines",
  };

  return map[code] ?? "Hãng bay";
}

function createFlightItem(params: {
  fromCode: AirportCode;
  toCode: AirportCode;
  departDate: string;
  airlineCode: "VN" | "VJ" | "QH" | "VU";
  flightNumber: string;
  departTime: string;
  priceOffset?: number;
  seatsLeft?: number;
  featured?: boolean;
  promoText?: string;
}) {
  const duration = getDurationMinutes(params.fromCode, params.toCode);
  const basePrice = getBasePrice(params.fromCode, params.toCode);
  const finalPrice = basePrice + (params.priceOffset ?? 0);

  return {
    id: makeId(
      params.fromCode,
      params.toCode,
      params.departDate,
      params.airlineCode,
      params.departTime
    ),
    fromCode: params.fromCode,
    fromLabel: airportMap[params.fromCode],
    toCode: params.toCode,
    toLabel: airportMap[params.toCode],
    departDate: params.departDate,
    tripType: "oneway",
    airline: getAirlineName(params.airlineCode),
    airlineCode: params.airlineCode,
    airlineLogo: getAirlineLogo(params.airlineCode),
    flightNumber: params.flightNumber,
    aircraft:
      params.airlineCode === "VN"
        ? "Airbus 321"
        : params.airlineCode === "VJ"
          ? "Airbus 320"
          : params.airlineCode === "QH"
            ? "Airbus 320"
            : "Airbus 321",
    departTime: params.departTime,
    arriveTime: addMinutes(params.departTime, duration),
    durationText: durationText(duration),
    stopsText: "Bay thẳng",
    cabin: "Tất cả",
    price: finalPrice,
    seatsLeft: params.seatsLeft ?? 9,
    baggageText:
      params.airlineCode === "VN" || params.airlineCode === "QH"
        ? "Đã bao gồm hành lý xách tay 12kg"
        : "Đã bao gồm hành lý xách tay 7kg",
    promoText: params.promoText ?? "Giá tốt hôm nay",
    active: true,
    featured: params.featured ?? false,
    carryOnText: params.airlineCode === "VN" || params.airlineCode === "QH" ? "12kg" : "7kg",
    checkedBaggageText: params.airlineCode === "VN" || params.airlineCode === "QH" ? "23kg" : "0kg",
    changePolicy: "Được đổi chuyến bay, áp dụng phí đổi và chênh lệch giá nếu có",
    refundPolicy: "Điều kiện hoàn vé tùy theo hạng giá",
    renamePolicy: "Không hỗ trợ đổi tên sau khi xuất vé",
    createdAt: serverTimestamp(),
  } satisfies FlightSearchSeedItem;
}

function buildFlightSearchSeed(): FlightSearchSeedItem[] {
  const now = new Date();
  const today = formatDate(now);
  const tomorrow = formatDate(addDays(now, 1));

  const routes: Array<{ fromCode: AirportCode; toCode: AirportCode }> = [
    { fromCode: "SGN", toCode: "HAN" },
    { fromCode: "HAN", toCode: "SGN" },
    { fromCode: "SGN", toCode: "DAD" },
    { fromCode: "DAD", toCode: "SGN" },
    { fromCode: "HAN", toCode: "DAD" },
    { fromCode: "DAD", toCode: "HAN" },
    { fromCode: "SGN", toCode: "CXR" },
    { fromCode: "CXR", toCode: "SGN" },
    { fromCode: "HAN", toCode: "CXR" },
    { fromCode: "CXR", toCode: "HAN" },
    { fromCode: "SGN", toCode: "HUI" },
    { fromCode: "HUI", toCode: "SGN" },
    { fromCode: "HAN", toCode: "HUI" },
    { fromCode: "HUI", toCode: "HAN" },
    { fromCode: "SGN", toCode: "PQC" },
    { fromCode: "PQC", toCode: "SGN" },
    { fromCode: "HAN", toCode: "PQC" },
    { fromCode: "PQC", toCode: "HAN" },
    { fromCode: "SGN", toCode: "BMV" },
    { fromCode: "BMV", toCode: "SGN" },
    { fromCode: "HAN", toCode: "BMV" },
    { fromCode: "BMV", toCode: "HAN" },
    { fromCode: "SGN", toCode: "VII" },
    { fromCode: "VII", toCode: "SGN" },
    { fromCode: "HAN", toCode: "VII" },
    { fromCode: "VII", toCode: "HAN" },
    { fromCode: "DAD", toCode: "CXR" },
    { fromCode: "CXR", toCode: "DAD" },
    { fromCode: "DAD", toCode: "PQC" },
    { fromCode: "PQC", toCode: "DAD" },
  ];

  const dailyFlightTemplates = [
    {
      airlineCode: "VN" as const,
      flightNumberSuffix: "101",
      departTime: "06:30",
      priceOffset: 300000,
      seatsLeft: 12,
      featured: true,
      promoText: "Bay sáng giá tốt",
    },
    {
      airlineCode: "VJ" as const,
      flightNumberSuffix: "201",
      departTime: "09:00",
      priceOffset: 0,
      seatsLeft: 8,
      featured: true,
      promoText: "Giá tiết kiệm",
    },
    {
      airlineCode: "QH" as const,
      flightNumberSuffix: "301",
      departTime: "13:20",
      priceOffset: 180000,
      seatsLeft: 6,
      featured: false,
      promoText: "Linh hoạt hành lý",
    },
    {
      airlineCode: "VU" as const,
      flightNumberSuffix: "401",
      departTime: "18:10",
      priceOffset: 90000,
      seatsLeft: 5,
      featured: false,
      promoText: "Giờ đẹp cuối ngày",
    },
  ];

  const items: FlightSearchSeedItem[] = [];

  [today, tomorrow].forEach((departDate, dayIndex) => {
    routes.forEach((route, routeIndex) => {
      dailyFlightTemplates.forEach((template) => {
        const priceShiftByDay = dayIndex === 1 ? 50000 : 0;
        const dynamicPriceOffset = template.priceOffset + priceShiftByDay + routeIndex * 3000;
        const dynamicSeats = Math.max(3, (template.seatsLeft ?? 8) - (routeIndex % 4));
        const airlinePrefix = template.airlineCode;
        const flightNumber = `${airlinePrefix}${Number(template.flightNumberSuffix) + routeIndex}`;

        items.push(
          createFlightItem({
            fromCode: route.fromCode,
            toCode: route.toCode,
            departDate,
            airlineCode: template.airlineCode,
            flightNumber,
            departTime: template.departTime,
            priceOffset: dynamicPriceOffset,
            seatsLeft: dynamicSeats,
            featured: template.featured,
            promoText: template.promoText,
          })
        );
      });
    });
  });

  return items;
}

async function seedFlightSearchItemsOnly() {
  const batch = writeBatch(db);
  const items = buildFlightSearchSeed();

  items.forEach((item) => {
    const ref = doc(collection(db, "flight_search_items"), item.id);
    batch.set(ref, item, { merge: true });
  });

  await batch.commit();

  return {
    success: true,
    count: items.length,
  };
}

export async function GET() {
  try {
    const result = await seedFlightSearchItemsOnly();

    return NextResponse.json({
      ok: true,
      message: "Seed flight_search_items thành công",
      ...result,
    });
  } catch (error) {
    console.error("Seed flight_search_items error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Seed flight_search_items thất bại",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}