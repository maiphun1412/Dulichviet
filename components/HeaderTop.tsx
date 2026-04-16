import { ChevronDown, FileText, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function HeaderTop() {
  return (
    <div className="bg-[linear-gradient(90deg,#f4008f_0%,#c92bbd_100%)] text-white">
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-2 leading-none">
          <span className="text-[15px] font-semibold">Hotline:</span>
          <span className="text-[18px] font-extrabold tracking-tight text-[#fff35c]">
            1900 1177
          </span>
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>

        <div className="mx-6 hidden max-w-[670px] flex-1 md:block">
          <div className="flex h-[48px] items-center rounded-[4px] bg-white px-4 text-[#555] shadow-sm">
            <svg
              viewBox="0 0 24 24"
              className="mr-3 h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              type="text"
              placeholder="Bạn muốn đi du lịch ở đâu?"
              className="w-full border-none bg-transparent text-[17px] text-[#4b5563] outline-none placeholder:text-[#7b7b7b]"
            />
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
  href="/phieu-gop-y"
  className="flex items-center gap-2 text-[16px] font-medium text-white"
>
  <FileText size={18} />
  <span>Phiếu góp ý</span>
</Link>

          <a href="#" className="text-white">
            <User size={18} />
          </a>

          <div className="relative">
            <a href="#" className="text-white">
              <ShoppingCart size={19} />
            </a>
            <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fff200] px-1 text-[11px] font-extrabold text-[#c91f97]">
              0
            </span>
          </div>

          <a href="#" className="text-white">
            <User size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}