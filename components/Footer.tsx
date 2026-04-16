import { Hotel, Car, Globe, Plane } from "lucide-react";
export default function Footer() {
  const domestic1 = [
    "Du lịch Nam Du",
    "Du lịch Miền Tây",
    "Du lịch Côn Đảo",
    "Du lịch Đà Nẵng",
    "Du lịch Hạ Long",
    "Du lịch Quy Nhơn",
  ];

  const domestic2 = [
    "Du lịch Đà Lạt",
    "Du lịch Nha Trang",
    "Du lịch Sapa",
    "Du lịch Phú Quốc",
    "Du lịch Phan Thiết",
    "Du lịch Huế",
  ];

  const asia1 = [
    "Du lịch Nhật Bản",
    "Du lịch Trung Quốc",
    "Du lịch Malaysia",
    "Du lịch Dubai",
    "Du lịch Thái Lan",
    "Du lịch Trương Gia Giới",
  ];

  const asia2 = [
    "Du lịch Hàn Quốc",
    "Du lịch Tây Tạng",
    "Du lịch Đài Loan",
    "Du lịch Singapore",
    "Du lịch Indonesia",
    "Du lịch Phượng Hoàng Cổ Trấn",
  ];

  const euUs1 = [
    "Du lịch Châu Âu",
    "Du lịch Đức",
    "Du lịch Thụy Sĩ",
    "Du lịch Anh",
    "Du lịch Luxembourg",
    "Du lịch Hà Lan",
  ];

  const euUs2 = [
    "Du lịch Mỹ",
    "Du lịch Thổ Nhĩ Kỳ",
    "Du lịch Bỉ",
    "Du lịch Nga",
    "Du lịch Pháp",
    "Du lịch Ý",
  ];

  const customerLinks = [
    "Chính sách đặt tour",
    "Chính sách bảo mật",
    "Ý kiến khách hàng",
    "Phiếu góp ý",
  ];

  const featureBoxes = [
  {
    title: "KHÁCH SẠN",
    desc: "Khách sạn tốt nhất tại các địa điểm du lịch nổi tiếng.",
    icon: Hotel,
    bg: "bg-[#e45198]",
  },
  {
    title: "THUÊ XE",
    desc: "Dịch vụ thuê xe giá tốt từ các nhà xe uy tín và chu đáo",
    icon: Car,
    bg: "bg-[#106db8]",
  },
  {
    title: "VISA",
    desc: "Dịch vụ Visa nhanh, rẻ. Visa trọn gói, thủ tục đơn giản",
    icon: Globe,
    bg: "bg-[#e28733]",
  },
  {
    title: "VÉ MÁY BAY",
    desc: "Vé máy bay giá rẻ nhất, nhiều khuyến mãi hấp dẫn",
    icon: Plane,
    bg: "bg-[#1f9fbe]",
  },

  ];

  return (
    <footer className="bg-white text-[14px] text-[#333]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="pb-4 pt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureBoxes.map((item) => {
  const Icon = item.icon;

  return (
    <a
      key={item.title}
      href="#"
      className={`flex min-h-[120px] items-center gap-5 rounded-[4px] px-6 py-5 text-white ${item.bg}`}
    >
      {/* ICON */}
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[6px] bg-white/20">
        <Icon size={32} strokeWidth={2.5} className="text-white" />
      </div>

      {/* TEXT */}
      <div>
        <h3 className="mb-1 text-[17px] font-bold uppercase text-white">
          {item.title}
        </h3>
        <p className="text-[14px] leading-[1.4] text-white/90">
          {item.desc}
        </p>
      </div>
    </a>
  );
})}
          </div>
        </div>

        <div className="border-t-[3px] border-[#f0178d] pt-8">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 grid grid-cols-12 gap-x-6">
              <div className="col-span-12 grid grid-cols-2 gap-x-10 md:col-span-4">
                <div>
                  <h3 className="mb-4 text-[14px] font-bold text-[#2f2f2f]">
                    Trong nước
                  </h3>
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {domestic1.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-[36px]">
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {domestic2.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-12 grid grid-cols-2 gap-x-10 md:col-span-4">
                <div>
                  <h3 className="mb-4 text-[14px] font-bold text-[#2f2f2f]">
                    Châu Á
                  </h3>
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {asia1.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-[36px]">
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {asia2.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-12 grid grid-cols-2 gap-x-10 md:col-span-4">
                <div>
                  <h3 className="mb-4 text-[14px] font-bold text-[#2f2f2f]">
                    Châu Âu - Úc - Mỹ
                  </h3>
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {euUs1.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-[36px]">
                  <ul className="space-y-[8px] text-[14px] leading-[1.25] text-[#333]">
                    {euUs2.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-[#f0178d]">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-5 grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-5">
                <h3 className="mb-4 text-[14px] font-bold uppercase text-[#1f2f5a]">
                  CÔNG TY CỔ PHẦN TRUYỀN THÔNG DU LỊCH VIỆT
                </h3>

                <div className="space-y-[4px] text-[14px] leading-[1.6] text-[#3a3a3a]">
                  <p>
                    <span className="font-semibold">Địa chỉ:</span> 239A Hoàng
                    Văn Thụ, P.Phú Nhuận, TP. Hồ Chí Minh.
                  </p>
                  <p>
                    <span className="font-semibold">Văn phòng:</span> 217 Bis
                    Nguyễn Thị Minh Khai, P.Cầu Ông Lãnh, TP. Hồ Chí Minh.
                  </p>
                  <p>
                    <span className="font-semibold">Chi nhánh Hà Nội:</span>{" "}
                    Tầng 3, số 243 xã Đàn, P.Đống Đa, TP. Hà Nội
                  </p>
                  <p>
                    <span className="font-semibold">Điện thoại:</span> 028
                    73056789 | <span className="font-semibold">Hotline:</span>{" "}
                    1900 1177
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    dulichviet.com.vn {" | "}
                    <span className="font-semibold">Email:</span>{" "}
                    info@dulichviet.com.vn
                  </p>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-2">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Góc khách hàng
                </h3>

                <ul className="space-y-[10px] text-[14px] leading-[1.35] text-[#3a3a3a]">
                  {customerLinks.map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#f0178d]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 lg:col-span-2">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Chứng nhận
                </h3>

                <div className="space-y-3">
                  <img
                    src="/trangchu/dmca.webp"
                    alt="DMCA"
                    className="h-[31px] w-auto object-contain"
                  />
                  <img
                    src="/trangchu/bocongthuong.png"
                    alt="Bộ công thương"
                    className="h-[42px] w-auto object-contain"
                  />
                  <img
                    src="/trangchu/dnb.png"
                    alt="DNB"
                    className="h-[120px] w-auto object-contain"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Đăng ký nhận thông tin khuyến mãi
                </h3>

                <p className="mb-4 text-[14px] leading-[1.6] text-[#3a3a3a]">
                  Nhập email để có cơ hội giảm 50% cho chuyến đi tiếp theo của
                  Quý khách
                </p>

                <div className="flex h-[46px] items-center border border-[#cfcfcf] bg-white">
                  <input
                    type="text"
                    placeholder="Email của bạn"
                    className="h-full flex-1 px-4 text-[14px] outline-none placeholder:text-[#7a7a7a]"
                  />
                  <button className="flex h-full w-[52px] items-center justify-center text-[#333]">
                    ✉
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-4 grid grid-cols-12 gap-x-6 gap-y-8 items-start">
              <div className="col-span-12 lg:col-span-5">
                <h3 className="mb-4 text-[14px] font-bold uppercase text-[#1f2f5a]">
                  GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ
                </h3>

                <div className="space-y-[4px] text-[14px] leading-[1.6] text-[#3a3a3a]">
                  <p>Số GP/ No: 79-042/2022/ TCDL – GP LHQT</p>
                  <p>
                    TCDL cấp ngày 30/11/2009 - Cấp thay đổi ngày 06/06/2022
                  </p>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-2">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Kết nối với chúng tôi
                </h3>

                <div className="flex items-center gap-[6px]">
                  <a href="#" aria-label="Facebook">
                    <img
                      src="/trangchu/f.png"
                      alt="Facebook"
                      className="h-[34px] w-[34px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="YouTube">
                    <img
                      src="/trangchu/y.png"
                      alt="YouTube"
                      className="h-[34px] w-[34px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="Map">
                    <img
                      src="/trangchu/m.png"
                      alt="Map"
                      className="h-[34px] w-[34px] object-contain"
                    />
                  </a>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-2">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Chấp nhận thanh toán
                </h3>

                <div className="flex items-center gap-2">
                  <img
                    src="/trangchu/badge-payment-accepted.webp"
                    alt="Payment Methods"
                    className="h-[34px] w-auto object-contain"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <h3 className="mb-4 text-[14px] font-bold text-[#1f55a5]">
                  Ứng dụng di động
                </h3>

                <div className="flex items-center gap-3">
                  <img
                    src="/trangchu/badge-app.webp"
                    alt="Ứng dụng di động"
                    className="h-[40px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-2 border-t border-[#d9d9d9] py-4 text-[14px] italic text-[#555]">
              Copyright © 2019 DU LỊCH VIỆT. Ghi rõ nguồn "dulichviet.com.vn"
              khi sử dụng thông tin từ website này
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}