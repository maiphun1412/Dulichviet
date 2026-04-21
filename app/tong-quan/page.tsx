"use client";

import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const branches = [
  {
    title: "Địa chỉ",
    lines: [
      "Trụ sở chính: 239A Hoàng Văn Thụ, P. Phú Nhuận, TP. HCM",
      "Địa chỉ: 217 Bis Nguyễn Thị Minh Khai, P. Cầu Ông Lãnh, TP. HCM",
      "Hotline: 1900 1177",
      "Tel: (+84 8) 730 56789",
      "Website: www.dulichviet.com.vn",
      "Email: info@dulichviet.com.vn",
    ],
  },
  {
    title: "Chi nhánh Hà Nội",
    lines: [
      "Địa chỉ: Tầng 3, số 243, Xã Đàn, P. Đống Đa, Hà Nội",
      "Điện thoại: (+84 4) 35 123 388",
      "Email: info@dulichviet.com.vn",
    ],
  },
  {
    title: "Du Lịch Việt tại Vũng Tàu",
    lines: [
      "Địa chỉ: 344 Trương Công Định, Phường 8, TP. Vũng Tàu",
      "Điện thoại: 083 268 4567",
      "Email: vungtau@dulichviet.com.vn",
    ],
  },
  {
    title: "Du Lịch Việt tại Nghệ An",
    lines: [
      "Địa chỉ: Số 28B Nguyễn Sỹ Sách, TP. Nghệ An",
      "Điện thoại: 094 266 8026",
      "Email: nghean@dulichviet.com.vn",
    ],
  },
  {
    title: "Du Lịch Việt tại Hải Phòng",
    lines: [
      "Địa chỉ: 200D Tô Hiệu, Lê Chân, Hải Phòng",
      "Điện thoại: 0225 371 0099",
      "Email: haiphong@dulichviet.com.vn",
    ],
  },
  {
    title: "Văn phòng đại diện Hoa Kỳ",
    lines: [
      "Địa chỉ: 15751 Bookhurst St, Suite #203 Westminster California 92683",
      "Tel: (714) 775 - 9999 ; Cell: (714) 713 – 1524",
      "Email: info@dulichviet.com.vn",
    ],
  },
];

const achievements = [
  "8 năm liền đứng trong TOP 10 công ty Du lịch hàng đầu Việt Nam do Tổng Cục Du lịch Việt Nam trao tặng.",
  "Doanh nghiệp 8 năm liên tiếp trong TOP 10 Doanh nghiệp Du lịch hàng đầu TP. HCM do Sở Văn hóa Thông tin Du lịch và UBND TP. Hồ Chí Minh trao tặng.",
  "2 lần liên tiếp TOP 100 Doanh nghiệp Sao Vàng Đất Việt.",
  "Top 10 thương hiệu tiêu biểu có khả năng cạnh tranh quốc tế.",
  "Nhiều giải thưởng lữ hành vàng, doanh nghiệp uy tín và đối tác chiến lược trong ngành du lịch.",
];

const products = [
  "Du lịch lễ hội",
  "Du lịch hành hương: Israel – Jerusalem – Nazareth, Ấn Độ - Nepal, Myanmar",
  "Du lịch kết hợp chăm sóc sức khỏe & làm đẹp: Thái Lan, Singapore, Hàn Quốc",
  "Du lịch công vụ & tìm hiểu cơ hội đầu tư",
  "Du lịch M.I.C.E và EVENT",
  "Du lịch ẩm thực & giao lưu văn hóa",
  "Dịch vụ visa",
  "Booking vé máy bay",
  "Booking khách sạn",
  "Dịch vụ xe du lịch",
];

const socialWorks = [
  "Tham gia các hoạt động xã hội góp phần xây dựng cộng đồng nhân ái, văn minh.",
  "Đồng hành cùng ngày hội giáo dục phát triển TP.HCM và các chương trình ươm mầm tài năng Việt.",
  "Kết hợp cùng nhiều đơn vị tổ chức chương trình từ thiện và trao quà cho học sinh khó khăn.",
  "Tài trợ các chương trình dành cho trẻ em khuyết tật, trẻ em có hoàn cảnh khó khăn.",
  "Tổ chức hành trình yêu thương, bát cháo yêu thương và nhiều hoạt động thiện nguyện khác.",
  "Liên kết với các trường Đại học và Khoa Du lịch để hỗ trợ sinh viên thực tập, hướng nghiệp.",
];

const clientLogos = [
      "/trangchu/tongquan/tq11.webp",
];

function PlaceholderImage({
  title,
  height = "h-[240px]",
}: {
  title: string;
  height?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-[6px] border border-[#d6d6d6] bg-[#f7f7f7] text-center text-[15px] text-[#888] ${height}`}
    >
      {title}
    </div>
  );
}

export default function TongQuanPage() {
  return (
    <div className="min-h-screen bg-white text-[#222]">
      <HeaderTop />
      <MainHeader />

      <main>
        <section className="bg-[#eef1f5]">
          <div className="mx-auto max-w-[1240px] px-4 py-3 text-[14px] text-[#7a8797]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Tin Tức</span>
            <span className="mx-1">{">"}</span>
            <span>Giới Thiệu</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-10">
          <div className="border-b border-[#dfdfdf] pb-8">
            <h1 className="text-[24px] font-bold text-[#1d3557]">Giới thiệu</h1>

            <div className="mt-6">
              <h2 className="text-[20px] font-semibold uppercase leading-[1.6] text-[#111]">
                Công ty Cổ phần Truyền thông Du Lịch Việt
              </h2>
              <p className="mt-1 text-[17px] uppercase leading-[1.7] text-[#222]">
                Top 10 công ty du lịch hàng đầu Việt Nam
              </p>
            </div>
          </div>

          <div className="py-8 text-[15px] leading-[1.9] text-[#222]">
            <h3 className="mb-3 text-[22px] font-bold uppercase text-[#111]">
              Thông tin cơ bản về công ty
            </h3>

            <div className="space-y-1">
              <p>- Tên chính thức : CÔNG TY CỔ PHẦN TRUYỀN THÔNG DU LỊCH VIỆT</p>
              <p>- Tên giao dịch đối ngoại: VIET MEDIA TRAVEL CORPORATION</p>
              <p>- Tên giao dịch viết tắt: VIET MEDIA TRAVEL</p>
              <p>- Hình thức sở hữu: Cổ phần; Thành lập: Ngày 11/01/2008</p>
              <p>- Giấy phép LHQT số: GP79-042/2009/TCDL-GP.</p>
              <p>
                - Số ĐKKD: 030 5448 565 được cấp bởi Sở Kế hoạch và Đầu tư TP.
                Hồ Chí Minh.
              </p>
              <p>- Đăng ký lần đầu ngày 11/01/2008</p>
              <p>- Đăng ký thay đổi lần 05 ngày 26/10/2017</p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-[#dfdfdf] py-8 lg:grid-cols-2">
            {branches.map((branch) => (
              <div key={branch.title}>
                <h3 className="mb-3 text-[20px] font-bold uppercase text-[#111]">
                  {branch.title}
                </h3>
                <div className="space-y-1 text-[15px] leading-[1.9] text-[#222]">
                  {branch.lines.map((line) => (
                    <p key={line}>- {line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#dfdfdf] py-8">
            <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
              Tầm nhìn
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-[#222]">
              <li>Trở thành thương hiệu du lịch được yêu thích nhất của người Việt Nam.</li>
              <li>Trở thành tập đoàn du lịch nghỉ dưỡng top đầu Đông Nam Á.</li>
            </ul>

            <h3 className="mb-4 mt-8 text-[22px] font-bold uppercase text-[#111]">
              Sứ mệnh
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-[#222]">
              <li>Tạo ra các sản phẩm du lịch phong phú, nhân văn cho mọi gia đình Việt với giá trị gốc - chất lượng cao.</li>
              <li>Chuyển tải vẻ đẹp của các danh lam thắng cảnh, nét văn hóa độc đáo và thành tựu phát triển của các vùng đất đến khách hàng.</li>
              <li>Kết nối, dẫn dắt để du khách trải nghiệm hành trình thú vị tại Việt Nam và các nền văn minh trên thế giới.</li>
            </ul>
          </div>

          <div className="border-t border-[#dfdfdf] py-8">
            <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
              Các thành tích đạt được
            </h3>
            <p className="mb-4 text-[18px] font-semibold text-[#222]">
              Công ty Cổ phần Truyền thông Du Lịch Việt tự hào:
            </p>

            <ul className="list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-[#222]">
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

           <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq1.webp" alt="1" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq2.webp" alt="2" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq3.webp" alt="3" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq4.webp" alt="4" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq5.webp" alt="5" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq6.webp" alt="6" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq7.webp" alt="7" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq8.webp" alt="8" fill className="object-contain" />
  </div>
  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq9.webp" alt="9" fill className="object-contain" />
  </div>

  <div className="relative h-[240px] w-full">
    <Image src="/trangchu/tongquan/tq10.webp" alt="10" fill className="object-contain" />
  </div>

</div>

            <div className="mt-8">
              <h4 className="mb-3 text-[20px] font-bold text-[#111]">
                Thành tích đạt được gần nhất:
              </h4>
              <ul className="list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-[#222]">
                <li>Top 10 Doanh nghiệp Lữ hành Outbound hàng đầu Việt Nam năm 2019.</li>
                <li>Top 3 Doanh nghiệp lữ hành outbound hàng đầu TP. HCM năm 2018.</li>
                <li>Top 5 Doanh nghiệp lữ hành nội địa hàng đầu TP. HCM năm 2018.</li>
                <li>Top 10 Giải thưởng du lịch Việt Nam năm 2018.</li>
                <li>Nhiều giải thưởng doanh nghiệp lữ hành vàng và thương hiệu mạnh khác.</li>
              </ul>
            </div>
          </div>
<div className="border-t border-[#dfdfdf] py-8">
  <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
    Các khách hàng truyền thống
  </h3>

  <div className="w-full overflow-hidden rounded-[4px] border border-[#555]">
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
      <Image
        src="/trangchu/tongquan/tq11.webp" // <-- ảnh của mày
        alt="Khách hàng truyền thống"
        fill
        className="object-contain"
      />
    </div>
  </div>
</div>

          <div className="border-t border-[#dfdfdf] py-8">
            <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
              Các sản phẩm của công ty
            </h3>

            <p className="mb-2 text-[16px] italic text-[#444]">Du lịch chuyên đề</p>
            <ul className="list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-[#222]">
              {products.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#dfdfdf] py-8">
            <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
              Quá trình hình thành và phát triển của Du Lịch Việt
            </h3>

            <ul className="list-disc space-y-3 pl-6 text-[15px] leading-[1.9] text-[#222]">
              <li>
                Được thành lập từ năm 2008, trong bối cảnh thị trường du lịch
                trong nước và quốc tế nhiều biến động, Du Lịch Việt từng bước
                khẳng định vị thế bằng chiến lược sản phẩm đa dạng, giá hợp lý
                và dịch vụ ổn định.
              </li>
              <li>
                Công ty tập trung phát triển mạnh các tuyến tour nội địa, quốc
                tế, tour hành hương, MICE, du lịch nghỉ dưỡng và các dịch vụ
                đi kèm như visa, vé máy bay, khách sạn, thuê xe.
              </li>
              <li>
                Trong suốt quá trình phát triển, Du Lịch Việt luôn chú trọng
                chất lượng dịch vụ, trải nghiệm khách hàng và mở rộng hệ thống
                chi nhánh, đối tác trong và ngoài nước.
              </li>
              <li>
                Với hơn 11 năm hoạt động, công ty đã phục vụ hàng trăm nghìn
                lượt khách hàng mỗi năm, trong đó tỉ lệ khách quay lại tiếp tục
                sử dụng dịch vụ luôn ở mức cao.
              </li>
            </ul>

            
          </div>

          <div className="border-t border-[#dfdfdf] py-8">
            <h3 className="mb-4 text-[22px] font-bold uppercase text-[#111]">
              Công tác xã hội
            </h3>

            <ul className="list-disc space-y-3 pl-6 text-[15px] leading-[1.9] text-[#222]">
              {socialWorks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#dfdfdf] py-8">
            <div className="text-right text-[15px] italic text-[#444]">
              Thứ 2, 20/06/2016
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 text-[15px] text-[#222]">
              <span className="font-semibold">Đánh giá:</span>
              <span className="text-[#f4b400]">★★★★★</span>
              <span className="font-semibold">5/5</span>
              <span>trong 798 Đánh giá</span>
              <span>👁 42,019</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#cfcfcf] py-8">
            <h3 className="mb-5 text-[22px] font-bold uppercase text-[#111]">
              Tin tức liên quan
            </h3>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Du Lịch Việt & MobiFone bắt tay chiến lược...",
                "Đoạt Giải Thưởng Top 10 Công Ty Du Lịch Hàng Đầu...",
                "Thông cáo báo chí Du Lịch Việt khởi động...",
                "Dịch vụ tour 0 đồng uy tín - săn tour 0đ trong & ngoài nước",
                "Kinh nghiệm Du lịch Nhật Bản tự túc từ A đến Z",
                "Cẩm nang Du lịch Nhật Bản A-Z mới nhất 2026",
                "Tháp Bà Ponagar & Nhà Thờ Đá: Hành trình khám phá...",
                "Lặn biển Hòn Mun & Sea Walking: Phiêu lưu dưới nước",
                "Khám phá ẩm thực đường phố Nha Trang",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-[15px] text-[#222]">
                  <span className="mt-[8px] h-[5px] w-[5px] rounded-full bg-[#444]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 h-[3px] w-full bg-[#e71b8c]" />

          <div className="grid gap-8 py-8 md:grid-cols-3">
            <div>
              <h4 className="mb-4 text-[24px] font-bold text-[#222]">Trong nước</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-[#444]">
                {[
                  "Du lịch Nam Du",
                  "Du lịch Miền tây",
                  "Du lịch Côn Đảo",
                  "Du lịch Đà Nẵng",
                  "Du lịch Hạ Long",
                  "Du lịch Quy Nhơn",
                  "Du lịch Đà Lạt",
                  "Du lịch Nha Trang",
                  "Du lịch Sapa",
                  "Du lịch Phú Quốc",
                  "Du lịch Phan Thiết",
                  "Du lịch Huế",
                ].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-[24px] font-bold text-[#222]">Châu Á</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-[#444]">
                {[
                  "Du lịch Nhật Bản",
                  "Du lịch Trung Quốc",
                  "Du lịch Malaysia",
                  "Du lịch Dubai",
                  "Du lịch Hàn Quốc",
                  "Du lịch Đài Loan",
                  "Du lịch Singapore",
                  "Du lịch Indonesia",
                  "Du lịch Thái Lan",
                  "Du lịch Tây Tạng",
                  "Du lịch Trương Gia Giới",
                  "Du lịch Phượng Hoàng Cổ Trấn",
                ].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-[24px] font-bold text-[#222]">
                Châu Âu - Úc - Mỹ
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-[#444]">
                {[
                  "Du lịch Châu Âu",
                  "Du lịch Đức",
                  "Du lịch Thụy Sĩ",
                  "Du lịch Anh",
                  "Du lịch Mỹ",
                  "Du lịch Thổ Nhĩ Kỳ",
                  "Du lịch Bỉ",
                  "Du lịch Luxembourg",
                  "Du lịch Hà Lan",
                ].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}