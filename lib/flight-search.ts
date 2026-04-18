import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type FlightSearchItem = {
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

export async function searchFlights(params: {
  fromCode: string;
  toCode: string;
  departDate: string;
}) {
  try {
    const q = query(
      collection(db, "flight_search_items"),
      where("active", "==", true),
      where("fromCode", "==", params.fromCode),
      where("toCode", "==", params.toCode),
      where("departDate", "==", params.departDate)
    );

    const snapshot = await getDocs(q);

    const items: FlightSearchItem[] = snapshot.docs.map((docSnap) => {
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

    return items.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error("Lỗi search flights:", error);
    return [];
  }
}

export function extractAirportCode(text: string) {
  const match = text.match(/\(([A-Z]{3})\)/);
  return match?.[1] ?? "";
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")} ₫`;
}