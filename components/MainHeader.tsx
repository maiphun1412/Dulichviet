import { Menu } from "lucide-react";

const navItems = [
  "TOUR",
  "VÉ MÁY BAY",
  "KHÁCH SẠN",
  "DỊCH VỤ VISA",
  "THUÊ XE",
  "PHỤ KIỆN DU LỊCH",
  "SỨC XANH",
  "TIN TỨC",
];

export default function MainHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="flex h-[96px] items-center justify-between gap-6">
          <a href="#" className="shrink-0">
            <img
              src="/trangchu/logo.png"
              alt="Du Lịch Việt"
              className="h-[43px] w-auto object-contain lg:h-[56px]"
            />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`whitespace-nowrap text-[15px] font-medium transition ${
                  index === 0
                    ? "text-[#f0178d]"
                    : "text-[#4d4d4d] hover:text-[#f0178d]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center text-[#666]"
          >
            <Menu size={42} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}