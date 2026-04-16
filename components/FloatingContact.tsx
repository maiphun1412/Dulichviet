export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-xl">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffeff8] text-[#e91e8f]">
            ✈
          </div>
          <div className="font-semibold text-[#555]">Du Lịch Việt</div>
          <div className="rounded-full bg-[#e6f8ea] px-2 py-1 text-xs font-bold text-[#1fa34a]">
            ONLINE
          </div>
        </div>
        <div className="text-[15px] text-[#444]">Gửi cho bạn một tin nhắn</div>
      </div>

      <button className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ef1a9a] text-2xl text-white shadow-lg">
        💬
      </button>

      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-bold text-[#1677ff] shadow-lg">
        Zalo
      </button>
    </div>
  );
}