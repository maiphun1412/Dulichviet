"use client";

import { useState } from "react";

const serviceRows = [
  "Khách sạn\n(Hotel)",
  "Nhà hàng\n(Restaurant)",
  "Chương trình du lịch\n(Tourism program)",
  "Hướng dẫn viên Du Lịch Việt\n(Viet Media Tour guide)",
  "Hướng dẫn viên địa phương\n(Local Tour Guide)",
  "Xe tham quan\n(Transportation)",
  "Máy bay\n(Plane)",
  "Nhân viên tư vấn\n(Sale Consultant)",
];

const channels = [
  "Báo chí (Newspapers)",
  "Website",
  "Facebook",
  "Zalo",
  "TikTok",
  "Khách hàng cũ (Old customers)",
];

const promotions = [
  "Giảm giá (Discount)",
  "Quà tặng (Gift)",
  "Rút thăm (Lucky draw)",
  "Thẻ quà tặng (Voucher)",
];

type RatingKey = "excellent" | "good" | "fair" | "bad";

export default function FeedbackFormContent() {
  const [form, setForm] = useState({
    fullName: "",
    itinerary: "",
    phone: "",
    departureDate: "",
    returnDate: "",
    guideName: "",
    introducer: "",
    continueWithCompany: "",
    noReason: "",
    otherOpinion: "",
  });

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, RatingKey | "">>(
    serviceRows.reduce((acc, row) => {
      acc[row] = "";
      return acc;
    }, {} as Record<string, RatingKey | "">)
  );
  const [comments, setComments] = useState<Record<string, string>>(
    serviceRows.reduce((acc, row) => {
      acc[row] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleText = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiValue = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
      return;
    }
    setter([...list, value]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã ghi nhận phiếu góp ý.");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1460px] px-4 pb-16 pt-6 md:px-6 lg:px-8">
        <div className="mb-5 bg-[#f1f3f5] px-4 py-3 text-[14px] text-[#7a7a7a]">
          Trang Chủ &gt; Phiếu Góp Ý
        </div>

        <div className="mx-auto max-w-[1420px]">
          <h1 className="mb-6 text-[30px] font-bold text-[#0f5aa8]">
            Phiếu góp ý
          </h1>

          <p className="mb-8 max-w-[1380px] text-[16px] leading-[1.8] text-[#333]">
            Chân thành cảm ơn Quý khách đã tín nhiệm và sử dụng các dịch vụ của
            Công ty Cổ phần Truyền thông Du Lịch Việt. Với mong muốn không ngừng
            nâng cao chất lượng sản phẩm để phục vụ khách hàng ngày càng tốt
            hơn, chúng tôi rất mong Quý khách dành ít thời gian đóng góp ý kiến
            theo bảng dưới đây, hoặc Quý khách cũng có thể góp ý trực tiếp bằng
            thư điện tử cho Phòng Chăm sóc Khách hàng qua email:{" "}
            <span className="text-[#0f5aa8]">cskh@dulichviet.com.vn.</span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="border-t border-[#dddddd] pt-6">
              <div className="mb-1 text-[18px] font-bold text-[#222]">
                Thông tin cá nhân (Personal Information)
              </div>
              <div className="mb-6 text-[16px] text-red-500">
                * Thông tin cần có (required field)
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[16px] font-bold text-[#222]">
                    Họ và tên (Full name)*:
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(e) => handleText("fullName", e.target.value)}
                    placeholder="Họ và tên (Full name)"
                    className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-bold text-[#222]">
                    Tuyến du lịch (Tour itinerary)*:
                  </label>
                  <input
                    value={form.itinerary}
                    onChange={(e) => handleText("itinerary", e.target.value)}
                    placeholder="Tuyến du lịch (Tour itinerary)"
                    className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-bold text-[#222]">
                    Điện thoại (Phone)*:
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => handleText("phone", e.target.value)}
                    placeholder="Điện thoại (Phone)"
                    className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[16px] font-bold text-[#222]">
                      Ngày đi (Departure date):
                    </label>
                    <input
                      value={form.departureDate}
                      onChange={(e) =>
                        handleText("departureDate", e.target.value)
                      }
                      placeholder="Ngày đi (Departure date)"
                      className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[16px] font-bold text-[#222]">
                      Ngày về (Return date):
                    </label>
                    <input
                      value={form.returnDate}
                      onChange={(e) =>
                        handleText("returnDate", e.target.value)
                      }
                      placeholder="Ngày về (Return date)"
                      className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[16px] font-bold text-[#222]">
                    Tên hướng dẫn viên (Tour guide's name)*:
                  </label>
                  <input
                    value={form.guideName}
                    onChange={(e) => handleText("guideName", e.target.value)}
                    placeholder="Tên hướng dẫn viên (Tour guide's name)"
                    className="h-[48px] w-full border border-[#d8d8d8] px-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4 text-[16px] font-bold text-[#222]">
                  Quý khách đến với Công ty Du Lịch Việt qua (How did you know
                  Viet Media Travel):
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
                  {channels.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-[15px] text-[#333]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(item)}
                        onChange={() =>
                          toggleMultiValue(
                            item,
                            selectedChannels,
                            setSelectedChannels
                          )
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}

                  <label className="flex items-center gap-2 text-[15px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(
                        "Giới thiệu (Introduce)"
                      )}
                      onChange={() =>
                        toggleMultiValue(
                          "Giới thiệu (Introduce)",
                          selectedChannels,
                          setSelectedChannels
                        )
                      }
                      className="h-[18px] w-[18px]"
                    />
                    <span>Giới thiệu (Introduce):</span>
                  </label>

                  <input
                    value={form.introducer}
                    onChange={(e) => handleText("introducer", e.target.value)}
                    placeholder="Người giới thiệu (Introducer)"
                    className="h-[46px] border border-[#d8d8d8] px-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4 text-[16px] font-bold text-[#222]">
                  Quý khách mong muốn chương trình khuyến mãi nào nhất (Which
                  promotion do you expect)?
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
                  {promotions.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-[15px] text-[#333]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPromotions.includes(item)}
                        onChange={() =>
                          toggleMultiValue(
                            item,
                            selectedPromotions,
                            setSelectedPromotions
                          )
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-[16px] font-bold text-[#222]">
                  Đánh giá dịch vụ (Customer Feedback):
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px] border-collapse border border-[#d7d7d7]">
                    <thead>
                      <tr className="bg-white text-center text-[15px] font-bold text-[#333]">
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Chi tiết
                          <br />
                          Details
                        </th>
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Xuất sắc
                          <br />
                          Excellent
                        </th>
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Tốt
                          <br />
                          Good
                        </th>
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Trung bình
                          <br />
                          Fair
                        </th>
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Kém
                          <br />
                          Bad
                        </th>
                        <th className="border border-[#d7d7d7] px-4 py-3">
                          Ý kiến cụ thể
                          <br />
                          Your comment/ Suggestions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRows.map((row) => (
                        <tr key={row} className="align-top">
                          <td className="w-[33%] border border-[#d7d7d7] px-4 py-5 text-center text-[15px] leading-[1.5] whitespace-pre-line">
                            {row}
                          </td>

                          {(["excellent", "good", "fair", "bad"] as RatingKey[]).map(
                            (rating) => (
                              <td
                                key={rating}
                                className="border border-[#d7d7d7] px-4 py-5 text-center"
                              >
                                <input
                                  type="radio"
                                  name={`rating-${row}`}
                                  checked={ratings[row] === rating}
                                  onChange={() =>
                                    setRatings((prev) => ({
                                      ...prev,
                                      [row]: rating,
                                    }))
                                  }
                                  className="h-[18px] w-[18px]"
                                />
                              </td>
                            )
                          )}

                          <td className="border border-[#d7d7d7] px-3 py-3">
                            <textarea
                              value={comments[row]}
                              onChange={(e) =>
                                setComments((prev) => ({
                                  ...prev,
                                  [row]: e.target.value,
                                }))
                              }
                              className="h-[104px] w-full resize-none border border-[#d7d7d7] px-3 py-2 text-[15px] outline-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 text-[16px] font-bold text-[#222]">
                Quý khách sẽ đồng hành cùng Du Lịch Việt trong những chuyến du
                lịch tiếp theo (Will you continue with Viet Media Travel for
                your next trips)?
                <label className="ml-4 inline-flex items-center gap-2 font-normal">
                  <input
                    type="radio"
                    name="continueWithCompany"
                    checked={form.continueWithCompany === "yes"}
                    onChange={() => handleText("continueWithCompany", "yes")}
                    className="h-[18px] w-[18px]"
                  />
                  <span>Có (Yes)</span>
                </label>
                <label className="ml-4 inline-flex items-center gap-2 font-normal">
                  <input
                    type="radio"
                    name="continueWithCompany"
                    checked={form.continueWithCompany === "no"}
                    onChange={() => handleText("continueWithCompany", "no")}
                    className="h-[18px] w-[18px]"
                  />
                  <span>Không (No)</span>
                </label>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[16px] font-bold text-[#222]">
                  Nếu không, xin quý khách cho biết lí do cụ thể (If not, please
                  give us your reasons):
                </label>
                <textarea
                  value={form.noReason}
                  onChange={(e) => handleText("noReason", e.target.value)}
                  className="h-[170px] w-full resize-none border border-[#d7d7d7] px-4 py-3 text-[15px] outline-none"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[16px] font-bold text-[#222]">
                  Các ý kiến khác (nếu có) về cảm nhận chuyến đi hoặc góp ý cải
                  thiện dịch vụ - Other opinions (if any):
                </label>
                <textarea
                  value={form.otherOpinion}
                  onChange={(e) => handleText("otherOpinion", e.target.value)}
                  className="h-[210px] w-full resize-none border border-[#d7d7d7] px-4 py-3 text-[15px] outline-none"
                />
              </div>

              <div className="mt-6 w-full max-w-[350px] rounded-[4px] border border-[#d7d7d7] bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 border border-[#555] bg-white" />
                    <div className="text-[14px] leading-[1.2] text-[#333]">
                      Tôi không phải là người máy
                    </div>
                  </div>
                  <div className="text-[12px] text-[#666]">reCAPTCHA</div>
                </div>
                <div className="mt-2 text-[11px] text-[#666]">
                  reCAPTCHA đang thay đổi điều khoản dịch vụ.
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="inline-flex h-[48px] min-w-[320px] items-center justify-center rounded-[4px] bg-[#e3178d] px-8 text-[16px] font-bold uppercase text-white transition hover:bg-[#ca177f]"
                >
                  GỬI Ý KIẾN - SEND
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}