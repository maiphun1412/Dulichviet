"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Armchair,
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
} from "lucide-react";

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

const passengerOptions = [
  "1 Người lớn, 0 Trẻ em, 0 Em bé",
  "2 Người lớn, 0 Trẻ em, 0 Em bé",
  "2 Người lớn, 1 Trẻ em, 0 Em bé",
  "2 Người lớn, 2 Trẻ em, 0 Em bé",
];

const cabinOptions = ["Tất cả", "Phổ thông", "Phổ thông đặc biệt", "Thương gia"];

type FlightSearchBoxProps = {
  embedded?: boolean;
};

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

export default function FlightSearchBox({
  embedded = false,
}: FlightSearchBoxProps) {
  const router = useRouter();

  const today = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() + 3);
    return now.toISOString().split("T")[0];
  }, []);

  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [from, setFrom] = useState("Hồ Chí Minh (SGN)");
  const [to, setTo] = useState("Hà Nội (HAN)");
  const [departDate, setDepartDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(passengerOptions[0]);
  const [cabin, setCabin] = useState(cabinOptions[0]);

  const swapAirports = () => {
    setFrom(to);
    setTo(from);
  };

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

    if (tripType === "roundtrip" && returnDate) {
      params.set("returnDate", returnDate);
    }

    router.push(`/ve-may-bay/ket-qua?${params.toString()}`);
  };

  return (
    <div
      className={
        embedded
  ? "absolute right-[120px] top-[61%] z-20 w-full max-w-[1080px] -translate-y-1/2 px-4"
          : "mx-auto max-w-[1080px] px-4"
      }
    >
      <div className="rounded-[14px] border border-[#ececec] bg-white/98 p-3 shadow-[0_8px_22px_rgba(0,0,0,0.10)]">
        <div className="mb-3 flex items-center justify-center border-b border-[#ececec] pb-3">
          <div className="flex items-center gap-2 border-b-[2px] border-[#e11a8c] px-3 pb-2 text-[15px] font-medium text-[#e11a8c]">
            <PlaneTakeoff size={18} />
            <span>Chuyến bay</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div className="rounded-[10px] border border-[#e6e6e6] bg-white px-3 py-2.5">
            <div className="mb-1 flex items-center gap-2 text-[px] text-[#5d5d5d]">
              <PlaneTakeoff size={15} />
              <span>Điểm đi</span>
            </div>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full appearance-none bg-transparent text-[18px] font-medium text-[#233143] outline-none"
            >
              {airportOptions.map((item) => (
                <option key={item.code} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative rounded-[10px] border border-[#e6e6e6] bg-white px-3 py-2.5">
            <button
              type="button"
              onClick={swapAirports}
              className="absolute -left-[15px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d9d9] bg-white text-[#555] shadow-sm lg:flex"
              title="Đổi chiều"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div className="mb-1 flex items-center gap-2 text-[13px] text-[#5d5d5d]">
              <PlaneLanding size={15} />
              <span>Điểm đến</span>
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full appearance-none bg-transparent text-[18px] font-medium text-[#233143] outline-none"
            >
              {airportOptions.map((item) => (
                <option key={item.code} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[10px] border border-[#e6e6e6] bg-white px-3 py-2.5">
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-[14px] text-[#333]">
                <input
                  type="radio"
                  checked={tripType === "oneway"}
                  onChange={() => setTripType("oneway")}
                  className="h-4 w-4 accent-[#e11a8c]"
                />
                <span>Một chiều</span>
              </label>

              <label className="flex items-center gap-2 text-[14px] text-[#333]">
                <input
                  type="radio"
                  checked={tripType === "roundtrip"}
                  onChange={() => setTripType("roundtrip")}
                  className="h-4 w-4 accent-[#e11a8c]"
                />
                <span>Khứ hồi</span>
              </label>
            </div>

            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full bg-transparent text-[16px] font-medium text-[#233143] outline-none"
            />
            <div className="mt-1 text-[12px] text-[#6b7280]">
              {formatDisplayDate(departDate)}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.55fr_1fr]">
          <label className="flex h-[46px] items-center gap-3 rounded-[10px] border border-[#e6e6e6] bg-white px-3">
            <Users size={18} className="text-[#9a9a9a]" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="h-full w-full appearance-none bg-transparent text-[14px] outline-none"
            >
              {passengerOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
                ))}
            </select>
            <ChevronDown size={16} className="text-[#9a9a9a]" />
          </label>

          <label className="flex h-[46px] items-center gap-3 rounded-[10px] border border-[#e6e6e6] bg-white px-3">
            <Armchair size={18} className="text-[#9a9a9a]" />
            <select
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
              className="h-full w-full appearance-none bg-transparent text-[14px] outline-none"
            >
              {cabinOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="text-[#9a9a9a]" />
          </label>

          <button
            type="button"
            onClick={handleSearch}
            className="flex h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[#e11a8c] px-5 text-[16px] font-medium text-white transition hover:bg-[#c9157b]"
          >
            <Search size={22} />
            <span>Tìm chuyến bay</span>
          </button>
        </div>
      </div>
    </div>
  );
}