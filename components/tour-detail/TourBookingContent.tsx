"use client";

import { useMemo, useState } from "react";
import { BadgeInfo, CreditCard, Tag } from "lucide-react";
import type { TourDetail } from "@/lib/tours";

type Props = {
  tour: TourDetail;
};

function parsePrice(value: string) {
  const onlyNumber = String(value || "").replace(/[^\d]/g, "");
  return Number(onlyNumber || 0);
}

function formatPrice(value: number) {
  return `${value.toLocaleString("vi-VN")} đ`;
}

export default function TourBookingContent({ tour }: Props) {
  const basePrice = parsePrice(tour.price);
  const childPrice = Math.round(basePrice * 0.9);
  const smallChildPrice = Math.round(basePrice * 0.9);
  const infantPrice = Math.round(basePrice * 0.3);

  const foreignSurcharge = 1440000;
  const vietKieuSurcharge = 720000;
  const singleRoomSurcharge = 4000000;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    adults: 1,
    child511: 0,
    child25: 0,
    infant: 0,
    historyNeverTravel: false,

    noVisaCambodia: false,
    noVisaThailand: false,
    noVisaSingapore: false,
    noVisaMalaysia: false,
    noVisaOther: "",

    needVisaJapan: false,
    needVisaKorea: false,
    needVisaDubai: false,
    needVisaHongKong: false,
    needVisaOther: "",

    job: "",
    financeSaving: false,
    financeHouse: false,
    financeCar: false,

    paymentMethod: "office",
  });

  const totalPrice = useMemo(() => {
    return (
      form.adults * basePrice +
      form.child511 * childPrice +
      form.child25 * smallChildPrice +
      form.infant * infantPrice
    );
  }, [
    form.adults,
    form.child511,
    form.child25,
    form.infant,
    basePrice,
    childPrice,
    smallChildPrice,
    infantPrice,
  ]);

  const handleInput = (
    field: keyof typeof form,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã ghi nhận thông tin đặt tour.");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1460px] px-4 pb-16 pt-6 md:px-6 lg:px-8">
        <div className="mb-5 bg-[#f1f3f5] px-4 py-3 text-[14px] text-[#7a7a7a]">
          Trang Chủ &gt; Đặt tour
        </div>

        <form onSubmit={handleSubmit}>
          {/* Khối thông tin tour */}
          <section className="mb-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[450px_minmax(0,1fr)]">
              <div>
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-[305px] w-full border border-[#d7d7d7] object-cover"
                />
              </div>

              <div className="border border-[#d7d7d7] bg-white">
                <div className="border-b border-[#d7d7d7] px-6 py-5 text-[20px] font-bold uppercase leading-[1.4] text-[#252525] md:text-[22px]">
                  {tour.title}
                </div>

                <div className="grid grid-cols-[170px_1fr] gap-x-2 gap-y-4 px-6 py-5 text-[15px] leading-none text-[#333] md:text-[16px]">
                  <div className="text-[#333]">Mã tour:</div>
                  <div className="font-bold">{tour.code || "19454"}</div>

                  <div className="text-[#333]">Thời gian:</div>
                  <div className="font-bold">{tour.duration || "5 ngày"}</div>

                  <div className="text-[#333]">Giá:</div>
                  <div className="font-bold">{tour.price}</div>

                  <div className="text-[#333]">Ngày khởi hành:</div>
                  <div className="font-bold">
                    {tour.date || tour.departureDates}{" "}
                    <span className="font-medium text-[#1f5ca8]">Ngày khác</span>
                  </div>

                  <div className="text-[#333]">Nơi khởi hành:</div>
                  <div className="font-bold">
                    {tour.startFrom || tour.departure}
                  </div>

                  <div className="text-[#333]">Số chỗ còn nhận:</div>
                  <div className="font-bold">{tour.seats || 8}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Phụ thu */}
          <section className="mb-12 border-b border-[#dddddd] pb-8 text-[15px] leading-[1.65] text-[#ff2a2a]">
            <p>(***)PHỤ THU:</p>
            <p>
              Khách Việt Kiều: {formatPrice(vietKieuSurcharge)}/ khách (khách
              mang hộ chiếu nước ngoài có nơi sinh Việt Nam).
            </p>
            <p>
              Khách ngoại quốc: {formatPrice(foreignSurcharge)}/ khách (khách
              mang hộ chiếu nước ngoài có nơi sinh nước ngoài).
            </p>
            <p>
              Các khoản phí phát sinh (nếu có) như: phụ thu dành cho khách nước
              ngoài, việt kiều, phụ thu phòng đơn; phụ thu chênh lệch giá
              tour... Nhân viên sẽ gọi điện thông báo ngay sau khi có phiếu xác
              nhận booking. (Trong giờ hành chính)
            </p>
            <p>
              Trường hợp quý khách không đồng ý các khoản phát sinh, phiếu xác
              nhận booking của quý khách sẽ không có hiệu lực.
            </p>
          </section>

          {/* Bảng giá */}
          <section className="mb-12">
            <div className="mb-8 flex items-center justify-center gap-3 text-center">
              <Tag size={28} strokeWidth={2.2} className="text-[#303030]" />
              <h2
                style={{ fontSize: "28px", lineHeight: "1.2" }}
                className="font-bold uppercase text-[#303030] md:text-[24px]"
              >
                Bảng giá tour chi tiết
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse border border-[#bfbfbf] text-[14px] text-[#333] md:text-[15px]">
                <thead>
                  <tr className="bg-[#efefef] text-[#303030]">
                    <th className="border border-[#bfbfbf] px-4 py-4 text-right font-bold">
                      Loại giá\Độ tuổi
                    </th>
                    <th className="border border-[#bfbfbf] px-4 py-4 text-right font-bold">
                      Người lớn(Trên 11 tuổi)
                    </th>
                    <th className="border border-[#bfbfbf] px-4 py-4 text-right font-bold">
                      Trẻ em(5 - 11 tuổi)
                    </th>
                    <th className="border border-[#bfbfbf] px-4 py-4 text-right font-bold">
                      Trẻ nhỏ(2 - 5 tuổi)
                    </th>
                    <th className="border border-[#bfbfbf] px-4 py-4 text-right font-bold">
                      Sơ sinh(&lt; 2 tuổi)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      Giá
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(basePrice)}
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(childPrice)}
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(smallChildPrice)}
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(infantPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      Phụ thu Nước Ngoài
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(foreignSurcharge)}
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      Phụ thu Việt Kiều
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      {formatPrice(vietKieuSurcharge)}
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right">
                      0 đ
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#bfbfbf] px-4 py-3 text-right font-bold">
                      Phụ thu Phòng đơn
                    </td>
                    <td
                      className="border border-[#bfbfbf] px-4 py-3 text-center"
                      colSpan={4}
                    >
                      {formatPrice(singleRoomSurcharge)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Thông tin liên hệ */}
          <section className="mb-12">
            <div className="mb-8 flex items-center justify-center gap-3 text-center">
              <BadgeInfo
                size={28}
                strokeWidth={2.2}
                className="text-[#303030]"
              />
              <h2
                style={{ fontSize: "28px", lineHeight: "1.2" }}
                className="font-bold uppercase text-[#303030] md:text-[24px]"
              >
                Thông tin liên hệ
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  HỌ TÊN *:
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => handleInput("fullName", e.target.value)}
                  placeholder="Họ tên"
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Email *:
                </label>
                <input
                  value={form.email}
                  onChange={(e) => handleInput("email", e.target.value)}
                  placeholder="Email"
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Số điện thoại *:
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => handleInput("phone", e.target.value)}
                  placeholder="Số điện thoại"
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Địa chỉ *:
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleInput("address", e.target.value)}
                  placeholder="Địa chỉ"
                  className="h-[50px] w-full resize-none border border-[#d7d7d7] px-4 py-3 text-[15px] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Ghi chú:
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => handleInput("note", e.target.value)}
                  placeholder="Ghi chú"
                  className="h-[50px] w-full resize-none border border-[#d7d7d7] px-4 py-3 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Người lớn:
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.adults}
                  onChange={(e) => handleInput("adults", Number(e.target.value))}
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Trẻ em(5 - 11 tuổi):
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.child511}
                  onChange={(e) =>
                    handleInput("child511", Number(e.target.value))
                  }
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Trẻ nhỏ(2 - 5 tuổi):
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.child25}
                  onChange={(e) => handleInput("child25", Number(e.target.value))}
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-bold text-[#303030]">
                  Sơ sinh(nhỏ hơn 2 tuổi):
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.infant}
                  onChange={(e) => handleInput("infant", Number(e.target.value))}
                  className="h-[50px] w-full border border-[#d7d7d7] px-4 text-[15px] outline-none"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-[#dddddd] pt-6 text-right text-[22px] text-[#303030]">
              Tổng giá trị :{" "}
              <span className="font-medium text-[#f0068f]">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </section>

          {/* Tư vấn visa */}
<section className="mb-12">
  <div className="mb-8 flex items-center justify-center gap-3 text-center">
    <BadgeInfo size={30} strokeWidth={2.2} className="text-[#2f2f2f]" />
    <h2 className="text-[26px] font-bold uppercase text-[#2f2f2f] md:text-[30px]">
      Thông tin tư vấn visa
    </h2>
  </div>

  <div className="border-b border-[#d9d9d9] pb-5">
    <div className="mb-4 text-[15px] leading-[1.6]">
      <span className="font-bold uppercase text-[#f0068f]">Lịch sử du lịch </span>
      <span className="text-[#333]">
        (Vui lòng nhập đầy đủ các nước tất cả các nước bạn đã đi để chúng tôi có được sự tư vấn tốt nhất)
      </span>
    </div>

    <div className="mb-4 flex items-center gap-4 text-[16px] text-[#333]">
      <span className="min-w-[210px]">Chưa từng đi du lịch:</span>
      <input
        type="checkbox"
        checked={form.historyNeverTravel}
        onChange={(e) => handleInput("historyNeverTravel", e.target.checked)}
        className="h-[18px] w-[18px]"
      />
    </div>

    <div className="mb-4 grid grid-cols-[210px_repeat(4,minmax(120px,1fr))_190px] items-center gap-x-8 gap-y-4 text-[16px] text-[#333]">
      <div>Các nước không cần visa:</div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.noVisaCambodia}
          onChange={(e) => handleInput("noVisaCambodia", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Combodia</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.noVisaThailand}
          onChange={(e) => handleInput("noVisaThailand", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Thái Lan</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.noVisaSingapore}
          onChange={(e) => handleInput("noVisaSingapore", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Singapore</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.noVisaMalaysia}
          onChange={(e) => handleInput("noVisaMalaysia", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Malaysia</span>
      </label>

      <input
        value={form.noVisaOther}
        onChange={(e) => handleInput("noVisaOther", e.target.value)}
        placeholder="Nước khác"
        className="h-[44px] w-[185px] border border-[#d7d7d7] px-4 text-[15px] text-[#666] outline-none"
      />
    </div>

    <div className="grid grid-cols-[210px_repeat(4,minmax(120px,1fr))_190px] items-center gap-x-8 gap-y-4 text-[16px] text-[#333]">
      <div>Các nước cần visa:</div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.needVisaJapan}
          onChange={(e) => handleInput("needVisaJapan", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Nhật Bản</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.needVisaKorea}
          onChange={(e) => handleInput("needVisaKorea", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Hàn Quốc</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.needVisaDubai}
          onChange={(e) => handleInput("needVisaDubai", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Dubai</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.needVisaHongKong}
          onChange={(e) => handleInput("needVisaHongKong", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
        <span>Hongkong</span>
      </label>

      <input
        value={form.needVisaOther}
        onChange={(e) => handleInput("needVisaOther", e.target.value)}
        placeholder="Nước khác"
        className="h-[44px] w-[185px] border border-[#d7d7d7] px-4 text-[15px] text-[#666] outline-none"
      />
    </div>
  </div>

  <div className="border-b border-[#d9d9d9] py-5">
    <div className="mb-4 text-[15px] leading-[1.6]">
      <span className="font-bold uppercase text-[#f0068f]">Công việc hiện tại </span>
      <span className="text-[#333]">(Vui lòng chỉ chọn một câu trả lời)</span>
    </div>

    <div className="grid max-w-[560px] gap-y-3 text-[16px] text-[#333]">
      {[
        "Làm theo hợp đồng thu nhập trên 10 triệu",
        "Làm theo hợp đồng thu nhập dưới 10 triệu",
        "Chủ hộ kinh doanh cá thể",
        "Chủ doanh nghiệp",
        "Hưu trí",
      ].map((item) => (
        <label
          key={item}
          className="grid grid-cols-[1fr_26px] items-center gap-4"
        >
          <span>{item}</span>
          <input
            type="radio"
            name="job"
            checked={form.job === item}
            onChange={() => handleInput("job", item)}
            className="h-[18px] w-[18px]"
          />
        </label>
      ))}
    </div>
  </div>

  <div className="py-5">
    <div className="mb-4 text-[15px] leading-[1.6]">
      <span className="font-bold uppercase text-[#f0068f]">Tài chính </span>
      <span className="text-[#333]">(Không bắt buộc điền)</span>
    </div>

    <div className="mb-4 text-[16px] text-[#333]">
      Vui lòng chọn vào ô bên dưới về tài sản bạn đang có:
    </div>

    <div className="grid max-w-[440px] gap-y-3 text-[16px] text-[#333]">
      <label className="grid grid-cols-[1fr_26px] items-center gap-4">
        <span>Sổ tiết kiệm</span>
        <input
          type="checkbox"
          checked={form.financeSaving}
          onChange={(e) => handleInput("financeSaving", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
      </label>

      <label className="grid grid-cols-[1fr_26px] items-center gap-4">
        <span>Giấy tờ nhà đất</span>
        <input
          type="checkbox"
          checked={form.financeHouse}
          onChange={(e) => handleInput("financeHouse", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
      </label>

      <label className="grid grid-cols-[1fr_26px] items-center gap-4">
        <span>Xe hơi</span>
        <input
          type="checkbox"
          checked={form.financeCar}
          onChange={(e) => handleInput("financeCar", e.target.checked)}
          className="h-[18px] w-[18px]"
        />
      </label>
    </div>
  </div>
</section>

          {/* Thanh toán */}
          <section className="mb-10">
            <div className="mb-8 flex items-center justify-center gap-3 text-center">
              <CreditCard
                size={28}
                strokeWidth={2.2}
                className="text-[#303030]"
              />
              <h2
                style={{ fontSize: "28px", lineHeight: "1.2" }}
                className="font-bold uppercase text-[#303030] md:text-[24px]"
              >
                Phương thức thanh toán
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-y-4 text-[15px] md:grid-cols-2 md:gap-x-24">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "office"}
                  onChange={() => handleInput("paymentMethod", "office")}
                  className="h-4 w-4"
                />
                <span>Thanh toán tại quầy Du Lịch Việt</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "bank"}
                  onChange={() => handleInput("paymentMethod", "bank")}
                  className="h-4 w-4"
                />
                <span>Thanh toán chuyển khoản qua ngân hàng</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "vnpay"}
                  onChange={() => handleInput("paymentMethod", "vnpay")}
                  className="h-4 w-4"
                />
                <span>Thanh toán qua VNPAY</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "momo"}
                  onChange={() => handleInput("paymentMethod", "momo")}
                  className="h-4 w-4"
                />
                <span>Thanh toán qua ví MoMo</span>
              </label>
            </div>

            <div className="mt-12 text-center text-[15px] text-[#333]">
              Bằng việc tiếp tục, bạn chấp nhận đồng ý với chính sách/điều khoản
              như trên.
            </div>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="inline-flex h-[50px] min-w-[170px] items-center justify-center rounded-[4px] bg-[#d8248f] px-8 text-[16px] font-bold uppercase text-white transition hover:bg-[#c01d80]"
              >
                Hoàn thành
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}