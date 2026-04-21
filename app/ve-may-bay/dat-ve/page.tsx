"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Luggage,
  Plane,
  Plus,
  X,
  BriefcaseBusiness,
  CircleSlash2,
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
  carryOnText?: string;
  checkedBaggageText?: string;
  refundPolicy?: string;
  changePolicy?: string;
  renamePolicy?: string;
  fromAirportName?: string;
  toAirportName?: string;
};

function getAirportName(label: string, code: string) {
  return label.replace(`(${code})`, "").trim();
}

function formatPrice(price: number) {
  return `${price.toLocaleString("vi-VN")} ₫`;
}

function formatDisplayDate(dateValue: string) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  const weekdays = [
    "CN",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(
    2,
    "0"
  )}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

function FlightBookingContent() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("id");

  const [flight, setFlight] = useState<FlightItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [minuteLeft, setMinuteLeft] = useState(14);
  const [secondLeft, setSecondLeft] = useState(54);

  const [title, setTitle] = useState("Ông");
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [nationality, setNationality] = useState("Việt Nam");
  const [isContactPassenger, setIsContactPassenger] = useState(true);

  const [contactName, setContactName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+84");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [refCode, setRefCode] = useState("");
  const [showFlightDetail, setShowFlightDetail] = useState(false);

  const [selectedExtras, setSelectedExtras] = useState({
    baggage: false,
    seat: false,
    checkin: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        setLoading(true);

        if (!flightId) {
          setFlight(null);
          return;
        }

        const q = query(
          collection(db, "flight_search_items"),
          where("id", "==", flightId)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const data = docSnap.data();

          setFlight({
            id: String(data.id ?? docSnap.id),
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
            carryOnText: String(data.carryOnText ?? "7kg"),
            checkedBaggageText: String(data.checkedBaggageText ?? "20kg"),
            refundPolicy: String(
              data.refundPolicy ??
                "Hoàn Bảo lưu định danh: Thu phí hoàn; Thông báo trước khởi hành 24 tiếng; Bảo lưu tiền vé trong tối đa 01 năm kể từ ngày khởi hành"
            ),
            changePolicy: String(
              data.changePolicy ??
                "Thay đổi chuyến bay: Miễn phí thay đổi; Thu chênh lệch giá vé (nếu có); Thông báo trước khởi hành 03 tiếng"
            ),
            renamePolicy: String(
              data.renamePolicy ?? "Đổi tên hành khách: Không áp dụng"
            ),
            fromAirportName: String(
              data.fromAirportName ?? "Sân bay quốc tế Tân Sơn Nhất"
            ),
            toAirportName: String(
              data.toAirportName ?? "Sân bay quốc tế Nội Bài"
            ),
          });
        } else {
          setFlight(null);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin chuyến bay:", error);
        setFlight(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondLeft((prev) => {
        if (prev > 0) return prev - 1;
        setMinuteLeft((m) => (m > 0 ? m - 1 : 0));
        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const extraPrice = useMemo(() => {
    let total = 0;
    if (selectedExtras.baggage) total += 250000;
    if (selectedExtras.seat) total += 120000;
    if (selectedExtras.checkin) total += 30000;
    return total;
  }, [selectedExtras]);

  const taxAndFee = useMemo(() => {
    if (!flight) return 0;
    return Math.round(flight.price * 0.327);
  }, [flight]);

  const totalPrice = useMemo(() => {
    if (!flight) return 0;
    return flight.price + taxAndFee + extraPrice;
  }, [flight, taxAndFee, extraPrice]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên!";
    }

    if (!birthDay || !birthMonth || !birthYear) {
      newErrors.birth = "Vui lòng nhập ngày sinh!";
    }

    if (!contactName.trim()) {
      newErrors.contactName = "Vui lòng nhập họ tên liên hệ!";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại!";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    alert("UI bước đặt vé đã hợp lệ. Bước tiếp theo tao làm tiếp cho mày sau.");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#333]">
        <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1280px] px-4 py-16 text-[22px]">
          Đang tải thông tin đặt vé...
        </div>
        <FloatingContact />
        <Footer />
      </main>
    );
  }

  if (!flight) {
    return (
      <main className="min-h-screen bg-white text-[#333]">
        <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1280px] px-4 py-16 text-[22px]">
          Không tìm thấy chuyến bay.
        </div>
        <FloatingContact />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="border-t border-[#f2f2f2]">
        <div className="mx-auto max-w-[1280px] px-4 py-8">
          <div className="flex items-center justify-center gap-6 text-[18px] text-[#444]">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e11a8c] text-[#e11a8c]">
                ●
              </span>
              <span>Thông tin hành khách</span>
            </div>

            <span className="h-[2px] w-10 bg-[#e7b1d2]" />

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e11a8c] text-[#e11a8c]">
                ●
              </span>
              <span>Thanh toán</span>
            </div>

            <span className="h-[2px] w-10 bg-[#e7b1d2]" />

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e11a8c] text-[#e11a8c]">
                ●
              </span>
              <span>Nhận vé điện tử</span>
            </div>
          </div>
        </div>

        <div className="bg-[#e8f3ff] py-3 text-center text-[18px] text-[#444]">
          <span className="mr-2 text-[#e11a8c]">⏰</span>
          Hãy nhanh tay! Giá có thể thay đổi trong thời gian ngắn. Thời gian hoàn tất thanh toán{" "}
          <span className="font-bold text-[#e11a8c]">
            {String(minuteLeft).padStart(2, "0")}:
            {String(secondLeft).padStart(2, "0")}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10">
        <div className="grid grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[4px] border border-[#efefef] bg-white">
              <div className="border-b border-[#efefef] px-5 py-4 text-[22px] font-bold">
                Thông tin hành khách
              </div>

              <div className="px-5 py-4">
                <div className="rounded-[10px] bg-[#e8f3ff] px-4 py-4 text-[18px] text-[#444]">
                  Vui lòng nhập kí tự không dấu, họ tên trùng khớp trên giấy tờ tuỳ thân.
                </div>
              </div>

              <div className="border-t border-[#efefef] px-5 py-5">
                <div className="mb-4 text-[18px] font-bold">Thông tin hành khách 1</div>
                <div className="mb-5 inline-block rounded-[6px] bg-[#1677ff] px-3 py-1 text-[15px] font-semibold text-white">
                  Người lớn 1
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="mb-2 block text-[18px]">
                      <span className="text-[#ff4d4f]">*</span> Danh xưng
                    </label>
                    <div className="relative">
                      <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-[52px] w-full rounded-[12px] border border-[#dddddd] px-4 text-[18px] outline-none"
                      >
                        <option>Ông</option>
                        <option>Bà</option>
                        <option>Cô</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#999]" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[18px]">
                      <span className="text-[#ff4d4f]">*</span> Họ và tên (vd: Nguyen Van A)
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`h-[52px] w-full rounded-[12px] border px-4 text-[18px] outline-none ${
                        errors.fullName ? "border-[#ff4d4f]" : "border-[#dddddd]"
                      }`}
                    />
                    <div className="mt-1 text-[14px] text-[#999]">
                      Như trên CCCD (không dấu)
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[18px]">
                      <span className="text-[#ff4d4f]">*</span> Ngày sinh
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative">
                        <input
                          value={birthDay}
                          onChange={(e) => setBirthDay(e.target.value)}
                          placeholder="Ngày"
                          className={`h-[52px] w-full rounded-[12px] border px-4 pr-10 text-[18px] outline-none ${
                            errors.birth ? "border-[#ff4d4f]" : "border-[#dddddd]"
                          }`}
                        />
                        <CalendarDays
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]"
                          size={20}
                        />
                      </div>

                      <div className="relative">
                        <input
                          value={birthMonth}
                          onChange={(e) => setBirthMonth(e.target.value)}
                          placeholder="Tháng"
                          className={`h-[52px] w-full rounded-[12px] border px-4 pr-10 text-[18px] outline-none ${
                            errors.birth ? "border-[#ff4d4f]" : "border-[#dddddd]"
                          }`}
                        />
                        <CalendarDays
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]"
                          size={20}
                        />
                      </div>

                      <div className="relative">
                        <input
                          value={birthYear}
                          onChange={(e) => setBirthYear(e.target.value)}
                          placeholder="Năm"
                          className={`h-[52px] w-full rounded-[12px] border px-4 pr-10 text-[18px] outline-none ${
                            errors.birth ? "border-[#ff4d4f]" : "border-[#dddddd]"
                          }`}
                        />
                        <CalendarDays
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]"
                          size={20}
                        />
                      </div>
                    </div>
                    {errors.birth ? (
                      <div className="mt-1 text-[14px] text-[#ff4d4f]">{errors.birth}</div>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-[18px]">Quốc tịch</label>
                    <input
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="h-[52px] w-full rounded-[12px] border border-[#dddddd] px-4 text-[18px] outline-none"
                    />
                  </div>

                  <div className="col-span-2 mt-2">
                    <label className="flex items-center gap-3 text-[18px]">
                      <input
                        type="checkbox"
                        checked={isContactPassenger}
                        onChange={(e) => setIsContactPassenger(e.target.checked)}
                        className="h-5 w-5"
                      />
                      <span>Đồng thời là người liên hệ</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[4px] border border-[#efefef] bg-white">
              <div className="border-b border-[#efefef] px-5 py-4 text-[22px] font-bold">
                Thông tin liên hệ
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-5 py-5">
                <div>
                  <label className="mb-2 block text-[18px]">
                    <span className="text-[#ff4d4f]">*</span> Họ tên liên hệ
                  </label>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className={`h-[52px] w-full rounded-[12px] border px-4 text-[18px] outline-none ${
                      errors.contactName ? "border-[#ff4d4f]" : "border-[#dddddd]"
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[18px]">
                    <span className="text-[#ff4d4f]">*</span> Số điện thoại
                  </label>
                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="h-[52px] rounded-[12px] border border-[#dddddd] px-4 text-[18px] outline-none"
                    >
                      <option value="+84">+84</option>
                      <option value="+1">+1</option>
                      <option value="+81">+81</option>
                    </select>

                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`h-[52px] w-full rounded-[12px] border px-4 text-[18px] outline-none ${
                        errors.phoneNumber ? "border-[#ff4d4f]" : "border-[#dddddd]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[18px]">
                    <span className="text-[#ff4d4f]">*</span> Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-[52px] w-full rounded-[12px] border px-4 text-[18px] outline-none ${
                      errors.email ? "border-[#ff4d4f]" : "border-[#dddddd]"
                    }`}
                  />
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-[18px]">Mã giới thiệu (nếu có)</label>
                  <input
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                    className="h-[52px] w-[380px] rounded-[12px] border border-[#dddddd] px-4 text-[18px] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[4px] border border-[#efefef] bg-white">
              <div className="border-b border-[#efefef] px-5 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Luggage className="mt-1 text-[#444]" size={34} />
                    <div>
                      <div className="text-[22px] font-bold">Thêm hành lý ký gửi</div>
                      <div className="mt-2 text-[18px] text-[#999]">
                        Thêm hành lý để thuận tiện hơn cho chuyến đi. Mua bây giờ rẻ hơn tại quầy.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExtras((prev) => ({
                        ...prev,
                        baggage: !prev.baggage,
                      }))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e11a8c] text-white"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>

              <div className="border-b border-[#efefef] px-5 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Luggage className="mt-1 text-[#444]" size={34} />
                    <div>
                      <div className="text-[22px] font-bold">Chọn trước chỗ ngồi</div>
                      <div className="mt-2 text-[18px] text-[#999]">
                        Chọn trước chỗ ngồi trên máy bay, ngay từ bây giờ.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExtras((prev) => ({
                        ...prev,
                        seat: !prev.seat,
                      }))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e11a8c] text-white"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>

              <div className="px-5 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Plane className="mt-1 text-[#2d3440]" size={34} />
                    <div>
                      <div className="text-[22px] font-bold">
                        Check-in Online: 30.000 ₫
                      </div>
                      <div className="mt-2 text-[18px] text-[#999]">
                        Chọn check-in Online để không phải xếp hàng chờ đợi
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExtras((prev) => ({
                        ...prev,
                        checkin: !prev.checkin,
                      }))
                    }
                    className={`h-12 min-w-[140px] rounded-full border text-[18px] font-medium ${
                      selectedExtras.checkin
                        ? "border-[#e11a8c] bg-[#e11a8c] text-white"
                        : "border-[#e11a8c] text-[#e11a8c]"
                    }`}
                  >
                    {selectedExtras.checkin ? "Đã chọn" : "Chọn"}
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[4px] border border-[#efefef] bg-white">
              <div className="border-b border-[#efefef] px-5 py-4">
                <div className="text-[22px] font-bold">Xuất hóa đơn</div>
                <div className="mt-2 text-[18px] text-[#555]">
                  Mã đặt chỗ sẽ được gửi theo thông tin liên hệ dưới đây
                </div>
              </div>

              <div className="px-5 py-5">
                <div className="rounded-[10px] bg-[#e8f3ff] px-4 py-4 text-[18px] text-[#444]">
                  ✓ Tiết kiệm thời gian, xuất hoá đơn nhanh chóng, đừng lãng phí thời gian cho kì nghỉ của bạn. Hãy tận hưởng.
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleContinue}
                className="rounded-[12px] bg-[#e11a8c] px-8 py-4 text-[20px] font-semibold text-white"
              >
                Tiếp tục
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[4px] border border-[#efefef] bg-[#f5f9ff] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="text-right text-[20px] leading-[1.5] text-[#444]">
                  <div>{flight.fromLabel.replace(`(${flight.fromCode})`, "").trim()}</div>
                  <div>{flight.toLabel.replace(`(${flight.toCode})`, "").trim()}</div>
                </div>
                <Plane size={18} className="mt-1 text-[#444]" />
              </div>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src={flight.airlineLogo || "/airlines/default.png"}
                  alt={flight.airline}
                  className="h-[46px] w-[46px] object-contain"
                />
                <div>
                  <div className="text-[18px] text-[#555]">
                    {flight.airline}{" "}
                    <span className="text-[#1677ff]">{flight.flightNumber}</span>
                  </div>
                  <div className="mt-1 text-[16px] text-[#999]">
                    {formatDisplayDate(flight.departDate)} {flight.departTime} - {flight.arriveTime}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e7e7e7] pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowFlightDetail(true)}
                  className="text-[18px] text-[#1677ff] hover:underline"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>

            <div className="rounded-[4px] border border-[#efefef] bg-white">
              <div className="border-b border-[#efefef] px-5 py-4 text-[22px] font-bold">
                Chi tiết giá
              </div>

              <div className="px-5 py-4">
                <div className="mb-4 inline-block rounded-full bg-[#e8f3ff] px-5 py-2 text-[18px] font-semibold text-[#24324a]">
                  Chuyến 1
                </div>

                <div className="space-y-4 text-[18px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a7a]">Người lớn x1</span>
                    <span>{formatPrice(flight.price)}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#efefef] pb-4">
                    <span className="text-[#7a7a7a]">Thuế và phí</span>
                    <span>{formatPrice(taxAndFee)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a7a]">Giảm giá</span>
                    <span>0 ₫</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a7a]">Dịch vụ thêm</span>
                    <span>{formatPrice(extraPrice)}</span>
                  </div>

                  <div className="border-t border-[#efefef] pt-4">
                    <div className="flex items-center justify-between text-[20px] font-bold">
                      <span>Tổng giá vé</span>
                      <span className="text-[#ff4d4f]">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="mt-1 text-[16px] text-[#555]">
                      Đã bao gồm thuế, phí, VAT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[4px] border border-[#efefef] bg-white p-5">
              <div className="flex items-center gap-3 text-[18px] text-[#444]">
                <Clock3 size={20} className="text-[#e11a8c]" />
                <span>Thời gian giữ chỗ còn lại</span>
              </div>
              <div className="mt-3 text-[28px] font-bold text-[#e11a8c]">
                {String(minuteLeft).padStart(2, "0")}:{String(secondLeft).padStart(2, "0")}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {showFlightDetail ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(0,0,0,0.35)] px-4">
          <div className="relative max-h-[72vh] w-full max-w-[515px] overflow-y-auto rounded-[10px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <button
              type="button"
              onClick={() => setShowFlightDetail(false)}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6b7280] shadow-sm transition hover:bg-[#f3f4f6] hover:text-[#111827]"
              aria-label="Đóng popup"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-5">
              <h3 className="text-[15px] font-semibold text-[#1f2937]">
                Chi tiết chuyến bay
              </h3>

              <div className="mt-4 text-[24px] font-semibold leading-none text-[#1f2937]">
                {flight.fromCode} <span className="mx-1">→</span> {flight.toCode}
              </div>

              <div className="mt-4 h-[2px] w-[160px] rounded-full bg-[#ec168c]" />

              <div className="mt-6 grid grid-cols-[96px_28px_1fr] gap-x-4">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-[14px] font-semibold leading-none text-[#1f2937]">
                      {flight.departTime}
                    </div>
                    <div className="mt-2 text-[12px] leading-none text-[#9ca3af]">
                      {flight.departDate
                        ? new Date(flight.departDate).toLocaleDateString("vi-VN")
                        : ""}
                    </div>
                  </div>

                  <div className="py-6 text-[13px] font-medium leading-none text-[#9ca3af]">
                    {flight.durationText}
                  </div>

                  <div>
                    <div className="text-[14px] font-semibold leading-none text-[#1f2937]">
                      {flight.arriveTime}
                    </div>
                    <div className="mt-2 text-[12px] leading-none text-[#9ca3af]">
                      {flight.departDate
                        ? new Date(flight.departDate).toLocaleDateString("vi-VN")
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="relative flex min-h-full justify-center">
                  <Plane
                    size={15}
                    strokeWidth={2}
                    className="absolute left-1/2 top-[2px] -translate-x-1/2 text-[#ec168c]"
                  />
                  <div className="absolute bottom-[14px] top-[20px] left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-[#ec168c]" />
                  <div className="absolute bottom-[2px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-[2px] bg-[#ec168c]" />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-[14px] font-semibold leading-[1.35] text-[#1f2937]">
                      {getAirportName(flight.fromLabel, flight.fromCode)} ({flight.fromCode})
                    </div>
                    <div className="mt-1 text-[11px] leading-[1.4] text-[#9ca3af]">
                      {flight.fromAirportName ||
                        `Sân bay quốc tế ${getAirportName(flight.fromLabel, flight.fromCode)}`}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={flight.airlineLogo || "/airlines/default.png"}
                        alt={flight.airline}
                        className="h-[28px] w-[56px] object-contain object-left"
                      />
                      <div className="leading-tight">
                        <div className="text-[13px] font-semibold text-[#1f2937]">
                          {flight.airline}
                        </div>
                        <div className="mt-[2px] text-[13px] font-semibold text-[#ec168c]">
                          {flight.flightNumber}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-[13px] leading-[1.55] text-[#6b7280]">
                      <div className="flex items-start gap-2.5">
                        <BriefcaseBusiness
                          size={15}
                          strokeWidth={2}
                          className="mt-[2px] shrink-0 text-[#6b7280]"
                        />
                        <div>
                          Hành lý xách tay:{" "}
                          <span className="font-semibold text-[#1f2937]">
                            {flight.carryOnText || "7kg"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <BriefcaseBusiness
                          size={15}
                          strokeWidth={2}
                          className="mt-[2px] shrink-0 text-[#6b7280]"
                        />
                        <div>
                          Hành lý ký gửi:{" "}
                          <span className="font-semibold text-[#1f2937]">
                            {flight.checkedBaggageText || "20kg"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CircleSlash2
                          size={15}
                          strokeWidth={2}
                          className="mt-[2px] shrink-0 text-[#6b7280]"
                        />
                        <div>
                          Hoàn/Bảo lưu định danh:{" "}
                          <span className="text-[#4b5563]">
                            {flight.refundPolicy ||
                              "Thu phí hoàn; Thông báo trước khởi hành 24 tiếng; Bảo lưu tiền vé tối đa 01 năm kể từ ngày khởi hành"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CircleSlash2
                          size={15}
                          strokeWidth={2}
                          className="mt-[2px] shrink-0 text-[#6b7280]"
                        />
                        <div>
                          Thay đổi chuyến bay:{" "}
                          <span className="text-[#4b5563]">
                            {flight.changePolicy ||
                              "Miễn phí thay đổi; Thu chênh lệch giá vé (nếu có); Thông báo trước khởi hành 03 tiếng"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CircleSlash2
                          size={15}
                          strokeWidth={2}
                          className="mt-[2px] shrink-0 text-[#6b7280]"
                        />
                        <div>
                          Đổi tên hành khách:{" "}
                          <span className="text-[#4b5563]">
                            {flight.renamePolicy || "Không áp dụng"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="text-[14px] font-semibold leading-[1.35] text-[#1f2937]">
                      {getAirportName(flight.toLabel, flight.toCode)} ({flight.toCode})
                    </div>
                    <div className="mt-1 text-[11px] leading-[1.4] text-[#9ca3af]">
                      {flight.toAirportName ||
                        `Sân bay quốc tế ${getAirportName(flight.toLabel, flight.toCode)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <FloatingContact />
      <Footer />
    </main>
  );
}

export default function FlightBookingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white text-[#333]">
          <HeaderTop />
          <MainHeader />
          <div className="mx-auto max-w-[1280px] px-4 py-16 text-[22px]">
            Đang tải thông tin đặt vé...
          </div>
          <FloatingContact />
          <Footer />
        </main>
      }
    >
      <FlightBookingContent />
    </Suspense>
  );
}