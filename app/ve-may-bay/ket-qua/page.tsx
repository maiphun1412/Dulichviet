"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Armchair,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Search,
  Users,
} from "lucide-react";

type FlightItem = {
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
};

type FarePackage = {
  name: string;
  price: number;
  baggageCarry: string;
  baggageChecked: string;
  conditions: string[];
};

const passengerOptions = [
  "1 Người lớn, 0 Trẻ em, 0 Em bé",
  "2 Người lớn, 0 Trẻ em, 0 Em bé",
  "2 Người lớn, 1 Trẻ em, 0 Em bé",
  "2 Người lớn, 2 Trẻ em, 0 Em bé",
];

const cabinOptions = ["Tất cả", "Phổ thông", "Phổ thông đặc biệt", "Thương gia"];

const airportOptions = [
  { code: "SGN", label: "Hồ Chí Minh (SGN)" },
  { code: "HAN", label: "Hà Nội (HAN)" },
  { code: "DAD", label: "Đà Nẵng (DAD)" },
  { code: "CXR", label: "Nha Trang (CXR)" },
  { code: "HUI", label: "Huế (HUI)" },
  { code: "PQC", label: "Phú Quốc (PQC)" },
  { code: "BMV", label: "Buôn Ma Thuột (BMV)" },
  { code: "VII", label: "Vinh (VII)" },
];


function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")} ₫`;
}

function formatDisplayDate(dateValue: string) {
  if (!dateValue) return "Chọn ngày";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Chọn ngày";

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const months = [
    "Th01",
    "Th02",
    "Th03",
    "Th04",
    "Th05",
    "Th06",
    "Th07",
    "Th08",
    "Th09",
    "Th10",
    "Th11",
    "Th12",
  ];

  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(
    2,
    "0"
  )} ${months[date.getMonth()]}`;
}

function extractAirportCode(text: string) {
  const match = text.match(/\(([A-Z]{3})\)/);
  return match?.[1] ?? "";
}

function getFarePackages(item: FlightItem): FarePackage[] {
  const base = item.price;

  if (item.airline.includes("Vietjet")) {
    return [
      {
        name: "Eco",
        price: base,
        baggageCarry: "7kg",
        baggageChecked: "0kg",
        conditions: [
          "Hoàn Bảo lưu định danh: Thu phí hoàn; Thông báo trước khởi hành 24 tiếng; Bảo lưu tiền vé trong tối đa 01 năm kể từ ngày khởi hành",
          "Thay đổi chuyến bay: Thu phí thay đổi; Thu chênh lệch Giá vé (nếu có); Thông báo trước khởi hành 03 tiếng",
          "Đổi tên hành khách: Không áp dụng",
        ],
      },
      {
        name: "Deluxe",
        price: base + 590000,
        baggageCarry: "7kg",
        baggageChecked: "20kg",
        conditions: [
          "Hoàn Bảo lưu định danh: Thu phí hoàn; Thông báo trước khởi hành 24 tiếng; Bảo lưu tiền vé trong tối đa 01 năm kể từ ngày khởi hành",
          "Thay đổi chuyến bay: Miễn phí thay đổi; Thu chênh lệch Giá vé (nếu có); Thông báo trước khởi hành 03 tiếng",
          "Đổi tên hành khách: Không áp dụng",
        ],
      },
      {
        name: "SkyBoss",
        price: base + 1832000,
        baggageCarry: "10kg",
        baggageChecked: "30kg + bộ dụng cụ golf",
        conditions: [
          "Hoàn Bảo lưu định danh: Được hoàn; Bảo lưu định danh trong vòng 02 năm kể từ ngày khởi hành",
          "Thay đổi chuyến bay: Miễn phí thay đổi; Thu chênh lệch nếu có; Thông báo trước giờ khởi hành",
          "Đổi tên hành khách: Áp dụng và chênh lệch giá",
        ],
      },
    ];
  }

  if (item.airline.includes("Vietnam")) {
    return [
      {
        name: "Economy Lite",
        price: base,
        baggageCarry: "12kg",
        baggageChecked: "23kg",
        conditions: [
          "Hoàn vé: Không hoàn",
          "Đổi vé: Thu phí đổi + chênh lệch giá nếu có",
          "Chọn chỗ: Có thể phát sinh phụ phí",
        ],
      },
      {
        name: "Economy Flex",
        price: base + 420000,
        baggageCarry: "12kg",
        baggageChecked: "23kg",
        conditions: [
          "Hoàn vé: Được hoàn, có phụ phí",
          "Đổi vé: Linh hoạt hơn, có phụ phí đổi",
          "Ưu tiên hỗ trợ tại sân bay",
        ],
      },
      {
        name: "Business",
        price: base + 1750000,
        baggageCarry: "18kg",
        baggageChecked: "32kg",
        conditions: [
          "Hoàn vé: Được hoàn",
          "Đổi vé: Linh hoạt",
          "Ưu tiên check-in, hành lý, phòng chờ theo điều kiện hãng",
        ],
      },
    ];
  }

  if (item.airline.includes("Bamboo")) {
    return [
      {
        name: "Economy Smart",
        price: base,
        baggageCarry: "7kg",
        baggageChecked: "20kg",
        conditions: [
          "Hoàn vé: Có điều kiện",
          "Đổi vé: Thu phí đổi + chênh lệch",
          "Tiêu chuẩn phổ thông",
        ],
      },
      {
        name: "Economy Flex",
        price: base + 324000,
        baggageCarry: "7kg",
        baggageChecked: "20kg",
        conditions: [
          "Hoàn vé: Linh hoạt hơn",
          "Đổi vé: Hỗ trợ tốt hơn",
          "Phù hợp khách cần thay đổi lịch trình",
        ],
      },
      {
        name: "Business",
        price: base + 1450000,
        baggageCarry: "14kg",
        baggageChecked: "30kg",
        conditions: [
          "Hoàn vé: Linh hoạt",
          "Ưu tiên check-in",
          "Dịch vụ hạng thương gia theo điều kiện hãng",
        ],
      },
    ];
  }

  if (item.airline.includes("Sun Phu Quoc")) {
    return [
      {
        name: "Economy Flex",
        price: base,
        baggageCarry: "1 kiện x 07 kg",
        baggageChecked: "01 kiện (23kg)",
        conditions: [
          "Hoàn vé: Được hoàn vé. Phí hoàn: 500,000 VNĐ",
          "Đổi vé: Thay đổi (trước 30 ngày so với ngày khởi hành), phí đổi: 50,000 VNĐ",
          "Đổi vé: Thay đổi (trong vòng 30 ngày so với ngày khởi hành và về sau), phí đổi: 500,000 VNĐ",
        ],
      },
      {
        name: "Economy plus",
        price: base + 324000,
        baggageCarry: "1 kiện x 07 kg",
        baggageChecked: "01 kiện (23kg)",
        conditions: [
          "Hoàn vé: Được hoàn vé. Phí hoàn: 500,000 VNĐ",
          "Đổi vé: Được đổi vé. Phí đổi: 500,000 VNĐ / 1 lần đổi + phí chênh lệch (nếu có)",
        ],
      },
    ];
  }

  return [
    {
      name: "Tiêu chuẩn",
      price: base,
      baggageCarry: "7kg",
      baggageChecked: "0kg",
      conditions: [
        "Điều kiện vé theo chính sách hiện hành của hãng",
        "Đổi/hoàn có thể phát sinh phụ phí",
      ],
    },
    {
      name: "Linh hoạt",
      price: base + 350000,
      baggageCarry: "7kg",
      baggageChecked: "20kg",
      conditions: [
        "Linh hoạt hơn khi thay đổi lịch trình",
        "Áp dụng phụ phí theo điều kiện vé",
      ],
    },
  ];
}

export default function FlightSearchResultPage() {
  const [openFareDetailKey, setOpenFareDetailKey] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get("from") || "Hồ Chí Minh (SGN)";
  const initialTo = searchParams.get("to") || "Hà Nội (HAN)";
  const initialFromCode =
    searchParams.get("fromCode") || extractAirportCode(initialFrom);
  const initialToCode =
    searchParams.get("toCode") || extractAirportCode(initialTo);
  const initialDate = searchParams.get("departDate") || "2026-04-19";
  const initialTripType =
    (searchParams.get("tripType") as "oneway" | "roundtrip") || "oneway";
  const initialPassengers =
    searchParams.get("passengers") || passengerOptions[0];
  const initialCabin = searchParams.get("cabin") || cabinOptions[0];

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [departDate, setDepartDate] = useState(initialDate);
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">(
    initialTripType
  );
  const [passengers, setPassengers] = useState(initialPassengers);
  const [cabin, setCabin] = useState(initialCabin);

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<FlightItem[]>([]);
  const [allRouteFlights, setAllRouteFlights] = useState<FlightItem[]>([]);
  const [sortMode, setSortMode] = useState<"cheap" | "early" | "late">("cheap");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [maxVisible, setMaxVisible] = useState(12);
  const [fromOpen, setFromOpen] = useState(false);
const [toOpen, setToOpen] = useState(false);

const [fromKeyword, setFromKeyword] = useState(from);
const [toKeyword, setToKeyword] = useState(to);

const filteredFromAirports = airportOptions.filter((item) =>
  item.label.toLowerCase().includes(fromKeyword.toLowerCase())
);

const filteredToAirports = airportOptions.filter((item) =>
  item.label.toLowerCase().includes(toKeyword.toLowerCase())
);

const swapAirports = () => {
  setFrom(to);
  setTo(from);
  setFromKeyword(to);
  setToKeyword(from);
};

  const [stopFilters, setStopFilters] = useState({
    direct: false,
    oneStop: false,
    multiStop: false,
  });

  const [cabinFilters, setCabinFilters] = useState({
    economy: false,
    business: false,
  });

  const [timeFilters, setTimeFilters] = useState({
    morning: false,
    noon: false,
    afternoon: false,
    night: false,
  });

  const [airlineFilters, setAirlineFilters] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const fromCode = extractAirportCode(from);
        const toCode = extractAirportCode(to);

        const q = query(
          collection(db, "flight_search_items"),
          where("active", "==", true),
          where("fromCode", "==", fromCode),
          where("toCode", "==", toCode)
        );

        const snapshot = await getDocs(q);

        const items: FlightItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();

          return {
            id: docSnap.id,
            fromCode: String(data.fromCode ?? ""),
            fromLabel: String(data.fromLabel ?? ""),
            toCode: String(data.toCode ?? ""),
            toLabel: String(data.toLabel ?? ""),
            departDate: String(data.departDate ?? ""),
            tripType: String(data.tripType ?? "oneway"),
            airline: String(data.airline ?? ""),
            airlineCode: String(data.airlineCode ?? ""),
            airlineLogo: String(data.airlineLogo ?? ""),
            flightNumber: String(data.flightNumber ?? ""),
            aircraft: String(data.aircraft ?? ""),
            departTime: String(data.departTime ?? ""),
            arriveTime: String(data.arriveTime ?? ""),
            durationText: String(data.durationText ?? ""),
            stopsText: String(data.stopsText ?? ""),
            cabin: String(data.cabin ?? ""),
            price: Number(data.price ?? 0),
            seatsLeft: Number(data.seatsLeft ?? 0),
            baggageText: String(data.baggageText ?? ""),
            promoText: String(data.promoText ?? ""),
            active: Boolean(data.active ?? false),
            featured: Boolean(data.featured ?? false),
          };
        });

        setAllRouteFlights(items);
        setFlights(items.filter((item) => item.departDate === departDate));
      } catch (error) {
        console.error("Lỗi lấy chuyến bay:", error);
        setFlights([]);
        setAllRouteFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, departDate]);

  const datePriceList = useMemo(() => {
    const grouped = new Map<string, number>();

    allRouteFlights.forEach((item) => {
      if (!grouped.has(item.departDate) || item.price < (grouped.get(item.departDate) || 0)) {
        grouped.set(item.departDate, item.price);
      }
    });

    return [...grouped.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 7)
      .map(([date, price]) => ({
        date,
        price,
      }));
  }, [allRouteFlights]);

  const airlineNames = useMemo(() => {
    return Array.from(new Set(allRouteFlights.map((item) => item.airline)));
  }, [allRouteFlights]);

  const filteredFlights = useMemo(() => {
    let result = [...flights];

    if (stopFilters.direct) {
      result = result.filter((item) => item.stopsText === "Bay thẳng");
    }

    if (cabinFilters.economy && !cabinFilters.business) {
      result = result.filter(
        (item) =>
          item.cabin.includes("Phổ thông") || item.cabin === "Tất cả"
      );
    }

    if (cabinFilters.business && !cabinFilters.economy) {
      result = result.filter((item) => item.cabin.includes("Thương gia"));
    }

    const selectedAirlines = Object.entries(airlineFilters)
      .filter(([, checked]) => checked)
      .map(([name]) => name);

    if (selectedAirlines.length > 0) {
      result = result.filter((item) => selectedAirlines.includes(item.airline));
    }

    const isAnyTimeChecked = Object.values(timeFilters).some(Boolean);
    if (isAnyTimeChecked) {
      result = result.filter((item) => {
        const hour = Number(item.departTime.split(":")[0]);

        return (
          (timeFilters.morning && hour >= 0 && hour < 6) ||
          (timeFilters.noon && hour >= 6 && hour < 12) ||
          (timeFilters.afternoon && hour >= 12 && hour < 18) ||
          (timeFilters.night && hour >= 18 && hour < 24)
        );
      });
    }

    if (sortMode === "cheap") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortMode === "early") {
      result.sort((a, b) => a.departTime.localeCompare(b.departTime));
    } else {
      result.sort((a, b) => b.departTime.localeCompare(a.departTime));
    }

    return result;
  }, [flights, stopFilters, cabinFilters, airlineFilters, timeFilters, sortMode]);

  const visibleFlights = filteredFlights.slice(0, maxVisible);

  const directCount = flights.filter((item) => item.stopsText === "Bay thẳng").length;
  const oneStopCount = 0;
  const multiStopCount = 0;

  const economyCount = flights.filter(
    (item) => item.cabin.includes("Phổ thông") || item.cabin === "Tất cả"
  ).length;
  const businessCount = flights.filter((item) =>
    item.cabin.includes("Thương gia")
  ).length;

  const handleSearch = () => {
    const fromCode = extractAirportCode(from);
    const toCode = extractAirportCode(to);

    const params = new URLSearchParams({
      from,
      to,
      fromCode,
      toCode,
      departDate,
      tripType,
      passengers,
      cabin,
    });

    router.push(`/ve-may-bay/ket-qua?${params.toString()}`);
  };

  const renderFlightRow = (item: FlightItem) => {
    const expanded = expandedId === item.id;
    const packages = getFarePackages(item);

    return (
      <div
        key={item.id}
        className={`rounded-[14px] border bg-white px-5 py-4 transition ${
          expanded ? "border-[#ea1b8f]" : "border-transparent"
        }`}
      >
        <div className="grid grid-cols-[280px_1fr_240px] items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={item.airlineLogo || "/airlines/default.png"}
              alt={item.airline}
              className="h-[40px] w-[70px] object-contain"
            />
            <div>
              <div className="text-[20px] font-medium leading-[1.2] text-[#333]">
                {item.airline}
              </div>
              <div className="mt-1 text-[16px] text-[#9a9a9a]">
                {item.flightNumber} / {item.aircraft}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[90px_1fr_90px] items-center gap-4">
            <div className="text-center">
              <div className="text-[18px] font-bold text-[#283042]">
                {item.departTime}
              </div>
              <div className="mt-1 text-[15px] text-[#8d8d8d]">
                {item.fromCode}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[14px] text-[#9b9b9b]">{item.durationText}</div>
              <div className="my-2 flex items-center justify-center gap-2 text-[#b0b0b0]">
                <span className="h-[2px] w-10 bg-[#bdbdbd]" />
                <span className="h-[6px] w-[6px] rounded-full bg-[#9f9f9f]" />
                <span className="h-[2px] w-10 bg-[#bdbdbd]" />
              </div>
              <div className="text-[15px] text-[#9a9a9a]">{item.stopsText}</div>
            </div>

            <div className="text-center">
              <div className="text-[18px] font-bold text-[#283042]">
                {item.arriveTime}
              </div>
              <div className="mt-1 text-[15px] text-[#8d8d8d]">
                {item.toCode}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="text-right">
              <div className="text-[18px] font-bold text-[#ff5a52]">
                {formatPrice(item.price)}
              </div>
              <div className="mt-1 text-[14px] text-[#9b9b9b]">
                Bao gồm thuế phí
              </div>
              <div className="mt-1 text-[15px] text-[#1677ff]">
                Còn {item.seatsLeft} vé
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpandedId(expanded ? null : item.id)}
              className={`flex h-[50px] min-w-[124px] items-center justify-center gap-2 rounded-[10px] border px-5 text-[17px] font-semibold transition ${
                expanded
                  ? "border-[#ea1b8f] bg-white text-[#ea1b8f]"
                  : "border-[#ea1b8f] bg-[#ea1b8f] text-white"
              }`}
            >
              <span>{expanded ? "Rút gọn" : "Chọn"}</span>
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {item.baggageText ? (
            <span className="rounded-full bg-[#e7f2ff] px-4 py-1 text-[14px] text-[#1677ff]">
              {item.baggageText}
            </span>
          ) : null}

          {item.promoText ? (
            <span className="rounded-full bg-[#fff0f6] px-4 py-1 text-[14px] text-[#ea1b8f]">
              ⊗ {item.promoText}
            </span>
          ) : null}
        </div>

        {expanded ? (
          <div className="mt-5 rounded-[14px] border border-[#ea1b8f] p-4">
            <div
              className={`grid gap-4 ${
                packages.length === 2
                  ? "grid-cols-2"
                  : packages.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2"
              }`}
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="overflow-hidden rounded-[12px] border border-[#e3e3e3] bg-white"
                >
                  <div className="bg-[#e11a8c] px-4 py-3 text-[18px] font-bold text-white">
                    {pkg.name}
                  </div>

                  <div className="border-b border-[#efefef] px-4 py-4">
                    <div className="mb-3 text-[16px] font-bold text-[#333]">
                      Điều Kiện Hành Lý
                    </div>
                    <div className="space-y-2 text-[15px] leading-[1.6] text-[#555]">
                      <div>🧳 Hành lý xách tay: <strong>{pkg.baggageCarry}</strong></div>
                      <div>🧰 Hành lý ký gửi: <strong>{pkg.baggageChecked}</strong></div>
                    </div>
                  </div>

                  <div className="px-4 py-4">
                    <div className="mb-3 text-[16px] font-bold text-[#333]">
                      Điều Kiện Vé
                    </div>
                    <div className="space-y-3 text-[15px] leading-[1.7] text-[#555]">
                      {pkg.conditions.map((condition, idx) => (
                        <div key={idx}>⊘ {condition}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-[#efefef] px-4 py-4">
  <div>
    <div className="text-[18px] font-bold text-[#ff5a52]">
      {formatPrice(pkg.price)}
    </div>
    <div className="mt-1 text-[14px] text-[#9b9b9b]">
      Giá đã bao gồm thuế phí
    </div>
  </div>

  <div className="flex items-center gap-4">
   <div className="relative">
  <button
    type="button"
    onClick={() =>
      setOpenFareDetailKey(openFareDetailKey === `${item.id}-${pkg.name}` ? null : `${item.id}-${pkg.name}`)
    }
    className="text-[15px] font-medium text-[#1677ff]"
  >
    Xem chi tiết
  </button>

  {openFareDetailKey === `${item.id}-${pkg.name}` && (
    <div className="absolute bottom-[42px] right-0 z-30 w-[280px] rounded-[14px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <button
        type="button"
        onClick={() => setOpenFareDetailKey(null)}
        className="absolute right-3 top-2 text-[20px] leading-none text-[#999]"
      >
        ×
      </button>

      <div className="mb-2 text-right">
        <div className="text-[16px] font-bold text-[#e91e63]">
          {formatPrice(pkg.price)}/Người lớn
        </div>
        <div className="text-[14px] text-[#777]">Giá đi trung bình</div>
      </div>

      <div className="space-y-2 border-t border-[#ececec] pt-3 text-[15px] text-[#444]">
        <div className="flex items-center justify-between">
          <span>Vé người lớn</span>
          <span>{formatPrice(pkg.price)} x 1</span>
        </div>

        <div className="flex items-center justify-between text-[#8a8a8a]">
          <span>Giá</span>
          <span>{formatPrice(Math.round(pkg.price * 0.73))}</span>
        </div>

        <div className="flex items-center justify-between text-[#8a8a8a]">
          <span>Thuế và phí</span>
          <span>{formatPrice(Math.round(pkg.price * 0.27))}</span>
        </div>
      </div>

      <div className="mt-3 border-t border-[#ececec] pt-3 text-[15px] text-[#444]">
        <div className="flex items-center justify-between">
          <span>Giảm giá</span>
          <span>0 đ</span>
        </div>

        <div className="mt-1 flex items-center justify-between font-medium">
          <span>Tổng giá đi</span>
          <span>{formatPrice(pkg.price)}</span>
        </div>
      </div>
    </div>
  )}
</div>

    <button
      type="button"
      onClick={() => {
        window.location.href = `/ve-may-bay/dat-ve?id=${item.id}`;
      }}
      className="rounded-[10px] bg-[#e11a8c] px-6 py-3 text-[16px] font-semibold text-white"
    >
      Đặt vé
    </button>
  </div>
</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="mx-auto max-w-[1280px] px-4 pt-16">
  <div className="rounded-[16px] border border-[#ececec] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
    <div className="grid grid-cols-[140px_1fr_140px] items-center gap-4 border-b border-[#ededed] pb-4">
      <label className="flex items-center gap-2 text-[16px] text-[#444]">
        <select
          value={tripType === "oneway" ? "Một chiều" : "Khứ hồi"}
          onChange={(e) =>
            setTripType(e.target.value === "Khứ hồi" ? "roundtrip" : "oneway")
          }
          className="w-full appearance-none bg-transparent text-[16px] outline-none"
        >
          <option>Một chiều</option>
          <option>Khứ hồi</option>
        </select>
        <ChevronDown size={18} className="text-[#aaa]" />
      </label>

      <label className="flex items-center gap-2 text-[16px] text-[#444]">
        <Users size={20} className="text-[#989898]" />
        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="w-full appearance-none bg-transparent text-[16px] outline-none"
        >
          {passengerOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="text-[#aaa]" />
      </label>

      <label className="flex items-center gap-2 text-[16px] text-[#444]">
        <Armchair size={20} className="text-[#989898]" />
        <select
          value={cabin}
          onChange={(e) => setCabin(e.target.value)}
          className="w-full appearance-none bg-transparent text-[16px] outline-none"
        >
          {cabinOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="text-[#aaa]" />
      </label>
    </div>

    <div className="mt-4 grid grid-cols-[1fr_42px_1fr_1.1fr_88px] gap-4">
      <div className="relative rounded-[12px] border border-[#e6e6e6] px-4 py-3">
        <div className="mb-1 text-[14px] text-[#4d4d4d]">Điểm đi</div>
        <input
          value={fromKeyword}
          onChange={(e) => {
            setFromKeyword(e.target.value);
            setFromOpen(true);
          }}
          onFocus={() => setFromOpen(true)}
          className="w-full bg-transparent text-[16px] font-medium outline-none"
          placeholder="Nhập sân bay đi"
        />

        {fromOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[240px] overflow-y-auto rounded-[12px] border border-[#e5e5e5] bg-white shadow-lg">
            {filteredFromAirports.length > 0 ? (
              filteredFromAirports.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setFrom(item.label);
                    setFromKeyword(item.label);
                    setFromOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-[15px] text-[#333] hover:bg-[#f8f8f8]"
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-[14px] text-[#888]">
                Không tìm thấy sân bay
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={swapAirports}
        className="flex items-center justify-center text-[24px] text-[#444]"
      >
        ↔
      </button>

      <div className="relative rounded-[12px] border border-[#e6e6e6] px-4 py-3">
        <div className="mb-1 text-[14px] text-[#4d4d4d]">Điểm đến</div>
        <input
          value={toKeyword}
          onChange={(e) => {
            setToKeyword(e.target.value);
            setToOpen(true);
          }}
          onFocus={() => setToOpen(true)}
          className="w-full bg-transparent text-[16px] font-medium outline-none"
          placeholder="Nhập sân bay đến"
        />

        {toOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[240px] overflow-y-auto rounded-[12px] border border-[#e5e5e5] bg-white shadow-lg">
            {filteredToAirports.length > 0 ? (
              filteredToAirports.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setTo(item.label);
                    setToKeyword(item.label);
                    setToOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-[15px] text-[#333] hover:bg-[#f8f8f8]"
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-[14px] text-[#888]">
                Không tìm thấy sân bay
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-[12px] border border-[#e6e6e6] px-4 py-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="checkbox"
              checked={tripType === "oneway"}
              onChange={() => setTripType("oneway")}
              className="h-5 w-5 accent-[#e11a8c]"
            />
            <span>Một chiều</span>
          </label>

          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="checkbox"
              checked={tripType === "roundtrip"}
              onChange={() => setTripType("roundtrip")}
              className="h-5 w-5 accent-[#e11a8c]"
            />
            <span>Khứ hồi</span>
          </label>
        </div>

        <div className="mt-2">
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full bg-transparent text-[16px] font-medium outline-none"
          />
          <div className="mt-1 text-[14px] text-[#666]">
            {formatDisplayDate(departDate)}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="flex items-center justify-center rounded-[12px] bg-[#e11a8c] text-white"
      >
        <Search size={28} />
      </button>
    </div>
  </div>
</section>

      <section className="mx-auto max-w-[1280px] px-4 pb-16 pt-7">
        <div className="grid grid-cols-[282px_1fr] gap-5">
          <aside className="space-y-5">
            <div className="rounded-[12px] border border-[#ececec] bg-white">
              <div className="border-b border-[#ececec] px-4 py-3 text-[19px] font-bold">
                Vé máy bay
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 rounded-[4px] bg-[#ff2f2f] py-1 text-center text-[15px] font-semibold text-white">
                  Đang chọn chiều đi
                </div>

                <div className="text-[18px] font-bold text-[#24324a]">
                  {extractAirportCode(from)} <span className="mx-2 text-[#888]">→</span> {extractAirportCode(to)}
                </div>

                <div className="mt-2 text-[15px] text-[#8a8a8a]">{departDate}</div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#ececec] bg-white">
              <div className="flex items-center justify-between border-b border-[#ececec] px-4 py-3">
                <div className="text-[19px] font-bold">Bộ lọc</div>
                <button
                  type="button"
                  onClick={() => {
                    setStopFilters({ direct: false, oneStop: false, multiStop: false });
                    setCabinFilters({ economy: false, business: false });
                    setTimeFilters({
                      morning: false,
                      noon: false,
                      afternoon: false,
                      night: false,
                    });
                    setAirlineFilters({});
                  }}
                  className="text-[15px] font-semibold text-[#f0178d]"
                >
                  Đặt lại
                </button>
              </div>

              <div className="border-b border-[#ececec] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[17px] font-bold">Điểm dừng</div>
                  <button className="text-[15px] font-semibold text-[#f0178d]">Đặt lại</button>
                </div>

                <div className="space-y-3 text-[17px] leading-[1.5]">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={stopFilters.direct}
                      onChange={(e) =>
                        setStopFilters((prev) => ({ ...prev, direct: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>Bay thẳng ({directCount})</span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={stopFilters.oneStop}
                      onChange={(e) =>
                        setStopFilters((prev) => ({ ...prev, oneStop: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>Một điểm dừng ({oneStopCount})</span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={stopFilters.multiStop}
                      onChange={(e) =>
                        setStopFilters((prev) => ({ ...prev, multiStop: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>Hai điểm dừng trở lên ({multiStopCount})</span>
                  </label>
                </div>
              </div>

              <div className="border-b border-[#ececec] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[17px] font-bold">Giá</div>
                  <button className="text-[15px] font-semibold text-[#f0178d]">Đặt lại</button>
                </div>

                <div className="mb-3 h-[4px] rounded-full bg-[#f7a6cf]" />
                <div className="flex items-center justify-between text-[14px] text-[#888]">
                  <div>
                    <div>Rẻ nhất</div>
                    <div className="mt-1 text-[16px] text-[#333]">1.959.000 ₫</div>
                  </div>
                  <div className="text-right">
                    <div>Đắt nhất</div>
                    <div className="mt-1 text-[16px] text-[#333]">7.599.000 ₫</div>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#ececec] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[17px] font-bold">Hạng ghế</div>
                  <button className="text-[15px] font-semibold text-[#f0178d]">Đặt lại</button>
                </div>

                <div className="space-y-3 text-[17px]">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={cabinFilters.economy}
                      onChange={(e) =>
                        setCabinFilters((prev) => ({ ...prev, economy: e.target.checked }))
                      }
                      className="h-5 w-5"
                    />
                    <span>Phổ thông ({economyCount})</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={cabinFilters.business}
                      onChange={(e) =>
                        setCabinFilters((prev) => ({ ...prev, business: e.target.checked }))
                      }
                      className="h-5 w-5"
                    />
                    <span>Thương gia ({businessCount})</span>
                  </label>
                </div>
              </div>

              <div className="border-b border-[#ececec] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[17px] font-bold">Thời gian đi</div>
                  <button className="text-[15px] font-semibold text-[#f0178d]">Đặt lại</button>
                </div>

                <div className="space-y-3 text-[17px]">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={timeFilters.morning}
                      onChange={(e) =>
                        setTimeFilters((prev) => ({ ...prev, morning: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>☁ Buổi sáng (00:00 - 06:00)</span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={timeFilters.noon}
                      onChange={(e) =>
                        setTimeFilters((prev) => ({ ...prev, noon: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>☼ Trưa (06:00 - 12:00)</span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={timeFilters.afternoon}
                      onChange={(e) =>
                        setTimeFilters((prev) => ({ ...prev, afternoon: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>☁ Chiều (12:00 - 18:00)</span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={timeFilters.night}
                      onChange={(e) =>
                        setTimeFilters((prev) => ({ ...prev, night: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5"
                    />
                    <span>☾ Tối (18:00 - 24:00)</span>
                  </label>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[17px] font-bold">Hãng bay</div>
                  <button className="text-[15px] font-semibold text-[#f0178d]">Đặt lại</button>
                </div>

                <div className="space-y-3 text-[17px]">
                  {airlineNames.map((name) => (
                    <label key={name} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={Boolean(airlineFilters[name])}
                        onChange={(e) =>
                          setAirlineFilters((prev) => ({
                            ...prev,
                            [name]: e.target.checked,
                          }))
                        }
                        className="h-5 w-5"
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 grid grid-cols-3 gap-3">
              <div className="rounded-[12px] bg-[#fbe8f1] px-4 py-4">
                <div className="text-[16px] font-bold text-[#333]">Giảm 50K vé máy bay quốc nội</div>
                <div className="mt-1 text-[18px] font-bold text-[#2f2f2f]">MBFDLV</div>
                <div className="mt-1 text-[14px] text-[#999]">Nhập mã khi thanh toán</div>
              </div>

              <div className="rounded-[12px] bg-[#fbe8f1] px-4 py-4">
                <div className="text-[16px] font-bold text-[#333]">Giảm 50K vé máy bay quốc tế</div>
                <div className="mt-1 text-[18px] font-bold text-[#2f2f2f]">DLVVMBQT</div>
                <div className="mt-1 text-[14px] text-[#999]">Nhập mã khi thanh toán</div>
              </div>

              <div className="rounded-[12px] bg-[#fbe8f1] px-4 py-4">
                <div className="text-[16px] font-bold text-[#333]">Giảm 30K vé máy bay</div>
                <div className="mt-1 text-[18px] font-bold text-[#2f2f2f]">DLVBANMOI</div>
                <div className="mt-1 text-[14px] text-[#999]">Nhập mã khi thanh toán</div>
              </div>
            </div>

            <div className="mb-4 rounded-[12px] border border-[#ececec] bg-white px-6 py-5">
              <div className="grid grid-cols-7 gap-4">
                {datePriceList.map((item) => {
                  const active = item.date === departDate;
                  const date = new Date(item.date);
                  const label = `${String(date.getDate()).padStart(2, "0")} Th${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}`;

                  return (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setDepartDate(item.date)}
                      className="text-left"
                    >
                      <div className="text-[16px] text-[#444]">{label}</div>
                      <div
                        className={`mt-2 text-[18px] font-bold ${
                          active ? "text-[#49b327]" : "text-[#2f3745]"
                        }`}
                      >
                        {formatPrice(item.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between rounded-[12px] border border-[#ececec] bg-white px-5 py-4">
              <div className="flex items-center gap-8 text-[16px]">
                <span className="text-[#444]">Sắp xếp:</span>

                <button
                  type="button"
                  onClick={() => setSortMode("cheap")}
                  className={`rounded-full px-5 py-2 font-semibold ${
                    sortMode === "cheap"
                      ? "bg-[#e11a8c] text-white"
                      : "text-[#444]"
                  }`}
                >
                  Rẻ nhất
                </button>

                <button
                  type="button"
                  onClick={() => setSortMode("early")}
                  className={`font-medium ${
                    sortMode === "early" ? "text-[#e11a8c]" : "text-[#444]"
                  }`}
                >
                  Bay sớm nhất
                </button>

                <button
                  type="button"
                  onClick={() => setSortMode("late")}
                  className={`font-medium ${
                    sortMode === "late" ? "text-[#e11a8c]" : "text-[#444]"
                  }`}
                >
                  Bay trễ nhất
                </button>
              </div>

              <div className="text-right">
                <div className="text-[16px] text-[#3a82ff]">Chế độ hiển thị</div>
                <div className="text-[17px] font-semibold text-[#1677ff]">
                  Giá gồm thuế phí 1 người lớn
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-[22px] text-[#666]">
                Đang tải dữ liệu chuyến bay...
              </div>
            ) : visibleFlights.length === 0 ? (
              <div className="rounded-[14px] border border-[#ececec] bg-white px-6 py-16 text-center text-[22px] text-[#666]">
                Không có chuyến bay phù hợp.
              </div>
            ) : (
              <div className="space-y-4">{visibleFlights.map(renderFlightRow)}</div>
            )}

            {filteredFlights.length > maxVisible && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setMaxVisible((prev) => prev + 10)}
                  className="w-full rounded-[12px] bg-[#e11a8c] py-4 text-[20px] font-semibold text-white"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}