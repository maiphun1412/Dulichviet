"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CircleAlert,
  FileText,
  Info,
  Map,
  NotebookPen,
  Phone,
  Ticket,
} from "lucide-react";
import type { TourDetail } from "@/lib/tours";
import Link from "next/link";

type Props = {
  tour: TourDetail;
};

export default function TourDetailContent({ tour }: Props) {
  const [openDay, setOpenDay] = useState(0);
  const [showIncludes, setShowIncludes] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    tour.departures?.[0]?.date || tour.date || ""
  );

  const summaryRows = [
    { label: "Mã tour:", value: tour.code || "" },
    { label: "Thời gian:", value: tour.duration || "" },
    { label: "Khởi hành:", value: tour.departureDates || tour.date || "" },
    { label: "Vận Chuyển:", value: tour.transport || "" },
    { label: "Xuất phát:", value: tour.startFrom || tour.departure || "" },
  ];

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1460px] bg-white px-4 pb-12 pt-6 md:px-6 lg:px-8">
        <div className="mb-8 bg-[#f1f3f5] px-4 py-3 text-[15px] text-[#777]">
          Trang Chủ &gt; Loại Hình Du Lịch &gt; {tour.title}
        </div>

        <h1 className="mb-8 text-[34px] font-semibold uppercase leading-[1.3] text-[#2f2f2f] md:text-[36px]">
          {tour.title}
        </h1>

        {/* KHỐI CHÍNH: sidebar phải sẽ sticky và tự dừng ở cuối khối này */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-start">
          {/* CỘT TRÁI */}
          <div className="min-w-0">
            <img
              src={tour.image}
              alt={tour.title}
              className="block w-full border border-[#dcdcdc] object-cover"
            />

            <section className="mb-12 mt-10 bg-white">
              <div className="mb-4 flex items-center gap-3">
                <Info className="text-[#ef1486]" size={24} />
                <h2 className="text-[22px] font-bold text-[#2f2f2f]">
                  Điểm nhấn hành trình
                </h2>
              </div>

              <div className="border-t border-[#dddddd] pt-4">
                <div className="mb-3 grid grid-cols-[110px_1fr] gap-5 text-[17px] leading-[1.6]">
                  <div className="font-bold text-[#444]">Hành trình</div>
                  <div className="font-semibold text-[#555]">{tour.title}</div>
                </div>

                <div className="mb-3 grid grid-cols-[110px_1fr] gap-5 text-[17px] leading-[1.6]">
                  <div className="font-bold text-[#444]">Lịch trình</div>
                  <div className="font-semibold text-[#555]">{tour.duration}</div>
                </div>

                <div className="mb-3 grid grid-cols-[110px_1fr] gap-5 text-[17px] leading-[1.6]">
                  <div className="font-bold text-[#444]">Khởi hành</div>
                  <div className="font-semibold text-[#555]">
                    {tour.departureDates || tour.date}
                  </div>
                </div>

                <p className="mt-4 text-[17px] italic leading-[1.7] text-[#303030]">
                  <span className="font-bold text-[#175fa9]">{tour.title}. </span>
                  {tour.overviewText}
                </p>

                <div className="mt-3 text-right text-[16px] text-[#333]">
                  Xem thêm »
                </div>
              </div>
            </section>

            <section className="mb-10 bg-white">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <Map className="text-[#ef1486]" size={24} />
                <h2 className="text-[22px] font-bold text-[#2f2f2f]">
                  Lịch trình
                </h2>

                <span className="rounded-[6px] bg-[#1494ea] px-3 py-[6px] text-[14px] font-bold leading-none text-white">
                  Lịch khởi hành (Cập nhật 14/03/26)
                </span>
              </div>

              <div className="border-t border-[#dddddd] pt-3">
                <div className="relative ml-[14px] border-l-[3px] border-dotted border-[#1da0ef] pl-6">
                  {tour.itinerary.map((day, index) => {
                    const isOpen = openDay === index;

                    return (
                      <div
                        key={`${day.day}-${index}`}
                        className="relative mb-[18px] last:mb-0"
                      >
                        <div className="absolute -left-[39px] top-[6px] z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white">
                          <div className="h-[16px] w-[16px] rounded-full border-[4px] border-[#ef1486] bg-white" />
                        </div>

                        <button
                          type="button"
                          onClick={() => setOpenDay(isOpen ? -1 : index)}
                          className="flex min-h-[36px] w-full items-center rounded-[6px] bg-[#f3008d] px-6 py-[7px] text-left text-white"
                        >
                          <span className="mr-2 text-[18px] font-extrabold uppercase leading-none md:text-[20px]">
                            {day.day}
                          </span>
                          <span className="text-[16px] font-bold uppercase leading-none md:text-[17px]">
                            | {day.title} ({day.meals})
                          </span>
                        </button>

                        {isOpen ? (
                          <div className="ml-[2px] mr-[2px] mt-[14px] rounded-[6px] bg-[#efefef] px-7 py-6 text-[17px] leading-[1.72] text-[#333]">
                            <div className="whitespace-pre-line">
                              {day.content}
                            </div>
                          </div>
                        ) : (
                          <div className="ml-2 mt-[6px] h-0 w-0 border-b-[12px] border-l-[12px] border-r-[12px] border-t-0 border-b-[#efefef] border-l-transparent border-r-transparent" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mb-8 border-b border-[#dddddd] bg-white pb-7">
              <button
                type="button"
                onClick={() => setShowIncludes((prev) => !prev)}
                className="flex items-center gap-3 text-left"
              >
                <Ticket className="text-[#ef1486]" size={24} />
                <span className="text-[21px] font-bold text-[#2f2f2f]">
                  Dịch vụ bao gồm và không bao gồm
                </span>
                <span className="text-[18px] text-[#333]">(Xem Thêm)</span>
              </button>

              {showIncludes && (
                <div className="mt-5 grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="mb-3 text-[18px] font-bold text-[#ef1486]">
                      Bao gồm
                    </div>
                    <ul className="space-y-2 text-[17px] leading-[1.7] text-[#333]">
                      {tour.includes.map((item, index) => (
                        <li key={`${item}-${index}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-3 text-[18px] font-bold text-[#ef1486]">
                      Không bao gồm
                    </div>
                    <ul className="space-y-2 text-[17px] leading-[1.7] text-[#333]">
                      {tour.excludes.map((item, index) => (
                        <li key={`${item}-${index}`}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8 border-b border-[#dddddd] bg-white pb-7">
              <button
                type="button"
                onClick={() => setShowNotes((prev) => !prev)}
                className="flex items-center gap-3 text-left"
              >
                <FileText className="text-[#ef1486]" size={24} />
                <span className="text-[21px] font-bold text-[#2f2f2f]">
                  Ghi chú
                </span>
                <span className="text-[18px] text-[#333]">(Xem Thêm)</span>
              </button>

              {showNotes && (
                <ul className="mt-5 space-y-3 text-[17px] leading-[1.7] text-[#333]">
                  {tour.notes.map((item, index) => (
                    <li key={`${item}-${index}`}>• {item}</li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mb-12 border-b border-[#dddddd] bg-white pb-7">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-[#ef1486]" size={24} />
                <h2 className="text-[21px] font-bold text-[#2f2f2f]">
                  Ngày khởi hành khác
                </h2>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#dddddd] text-[16px] font-bold text-[#333]">
                      <th className="px-2 py-3">STT</th>
                      <th className="px-2 py-3">Ngày khởi hành</th>
                      <th className="px-2 py-3">Đặc điểm</th>
                      <th className="px-2 py-3">Giá từ</th>
                      <th className="px-2 py-3">Số Chỗ</th>
                      <th className="px-2 py-3">Book tour</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tour.departures.map((item, idx) => (
                      <tr
                        key={`${item.id}-${idx}`}
                        className="border-b border-[#ececec] text-[17px] text-[#333]"
                      >
                        <td className="px-2 py-4">{idx + 1}</td>
                        <td className="px-2 py-4">{item.date}</td>
                        <td className="px-2 py-4">{item.airline}</td>
                        <td className="px-2 py-4 font-bold">{item.price}</td>
                        <td className="px-2 py-4">{item.seats}</td>
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="rounded-[6px] bg-[#ef1486] px-4 py-2 text-[16px] font-medium text-white"
                            >
                              {item.status}
                            </button>
                            <button
                              type="button"
                              className="rounded-[6px] border border-[#ef1486] px-4 py-2 text-[16px] font-medium text-[#ef1486]"
                            >
                              Chi tiết
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10 bg-[#f3f3f3] px-6 py-7">
              <div className="mb-5 flex items-center gap-4">
                <Phone className="text-[#ef1486]" size={38} strokeWidth={2.5} />
                <div className="text-[20px] font-black uppercase leading-none tracking-[0.1px] text-[#2f2f2f]">
                  ĐỂ LẠI SỐ ĐIỆN THOẠI CHÚNG TÔI SẼ GỌI ĐIỆN TƯ VẤN
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <input
                  placeholder="Nhập số điện thoại!"
                  className="h-[46px] flex-1 border border-[#d9d9d9] bg-white px-4 text-[16px] text-[#7a7a7a] outline-none"
                />
                <button
                  type="button"
                  className="h-[46px] min-w-[285px] border border-[#d91c8f] bg-[#d91c8f] px-6 text-[16px] font-black uppercase text-white"
                >
                  GỬI THÔNG TIN!
                </button>
              </div>
            </section>

            {/* NÚT PDF là điểm dừng của sidebar phải */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-[16px] text-[#333]">
              <div className="flex items-center gap-1 text-[28px] leading-none text-[#f3ab11]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-[#cfcfcf]">★</span>
              </div>

              <div className="text-[18px] leading-none">
                <span className="font-bold">4.14/5</span> trong{" "}
                <span className="font-bold">152</span> ĐÁNH GIÁ
              </div>

              <div className="flex items-center gap-1 text-[18px] leading-none text-[#333]">
                <span>👁</span>
                <span>710</span>
              </div>

              <button
                type="button"
                className="rounded-[4px] border border-[#cfcfcf] bg-[#f5f5f5] px-4 py-[7px] text-[16px] text-[#444]"
              >
                Yêu thích
              </button>

              <button
                type="button"
                className="ml-auto rounded-[4px] bg-[#ef1486] px-4 py-[8px] text-[16px] font-bold text-white"
              >
                Tải về PDF
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: sticky toàn bộ, tự dừng khi hết khối grid */}
          <div className="min-w-0 xl:sticky xl:top-6 xl:self-start">
            <div className="space-y-7">
              <div className="border border-[#dddddd] bg-white">
                <div className="border-b border-[#e7e7e7] px-5 py-5 text-[21px] font-bold uppercase leading-[1.45] text-[#ef1486]">
                  {tour.title}
                </div>

                <div className="px-5 py-1">
                  {summaryRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[110px_1fr] gap-4 border-b border-[#ededed] py-4 last:border-b-0"
                    >
                      <div className="text-[17px] font-bold text-[#3e3e3e]">
                        {row.label}
                      </div>
                      <div className="text-[17px] leading-[1.6] text-[#595959]">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden border border-[#ef1486] bg-[#ef1486]">
                <div className="px-4 py-3 text-white">
                  <span className="mr-2 text-[16px] font-bold">Giá từ:</span>
                  <span className="text-[26px] font-extrabold leading-none md:text-[28px]">
                    {tour.price}
                  </span>
                </div>

                <div className="bg-white px-4 pb-5 pt-5">
                  <div className="mb-4 text-[18px] font-bold text-[#333]">
                    Đặc điểm nổi bật:
                  </div>

                  <ul className="space-y-3 text-[17px] leading-[1.65] text-[#4c4c4c]">
                    {tour.highlights.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-3">
                        <span className="mt-[11px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#333]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#ef1486] px-4 pb-5 pt-4">
                  <input
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mb-4 h-[52px] w-full rounded-[4px] border border-[#d9d9d9] bg-[#f1f1f1] px-4 text-[17px] text-[#666] outline-none"
                  />

                  <Link
  href={`/tour/${tour.slug}/dat-tour`}
  className="flex h-[54px] w-full items-center justify-center rounded-[4px] bg-[#1296ea] text-[18px] font-extrabold uppercase tracking-[0.3px] text-white transition hover:bg-[#0d86d2]"
>
  ĐẶT TOUR
</Link>
                </div>
              </div>

              <aside>
                <div className="overflow-hidden border border-[#dddddd] bg-[#f1f1f1]">
                  <div className="border-b border-[#dddddd] px-4 py-4 text-[18px] font-bold text-[#333]">
                    <div className="flex items-center gap-3">
                      <CircleAlert size={20} />
                      <span>Điểm nhấn hành trình</span>
                    </div>
                  </div>

                  <div className="border-b border-[#dddddd] px-4 py-4 text-[18px] font-bold text-[#ef1486]">
                    <div className="flex items-center gap-3">
                      <BookOpen size={20} />
                      <span>Lịch trình</span>
                    </div>
                  </div>

                  <div className="border-b border-[#dddddd] px-4 py-4 text-[18px] font-medium text-[#333]">
                    <div className="flex items-center gap-3">
                      <Ticket size={20} />
                      <span>Dịch vụ bao gồm và không bao gồm</span>
                    </div>
                  </div>

                  <div className="border-b border-[#dddddd] px-4 py-4 text-[18px] font-medium text-[#333]">
                    <div className="flex items-center gap-3">
                      <NotebookPen size={20} />
                      <span>Ghi chú</span>
                    </div>
                  </div>

                  <div className="px-4 py-4 text-[18px] font-medium text-[#333]">
                    <div className="flex items-center gap-3">
                      <CalendarDays size={20} />
                      <span>Ngày khởi hành khác</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* TOUR LIÊN QUAN RA NGOÀI để sidebar dừng trước phần này */}
        <div className="mt-2">
          <div className="mb-5 text-[20px] font-bold uppercase tracking-[0.2px] text-[#134ea0]">
            TOUR LIÊN QUAN
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tour.relatedTours.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="overflow-hidden border border-[#d8d8d8] bg-white"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[230px] w-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-black/45 px-3 py-2 text-[14px] font-semibold text-white">
                    {item.departure}
                  </div>
                </div>

                <div className="px-3 pb-4 pt-3">
                  <div className="mb-3 min-h-[58px] text-[17px] font-medium leading-[1.45] text-[#333]">
                    {item.title}
                  </div>

                  <div className="text-right text-[16px] font-bold text-[#ef1486]">
                    Xem thêm →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}