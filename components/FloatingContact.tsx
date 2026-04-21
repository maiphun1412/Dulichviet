export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      
      {/* BOX CHAT */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-xl">
        <div className="mb-2 flex items-center gap-2">
          
          {/* ICON */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-[#f3c6db]">
            <img
              src="/trangchu/đi.jpg"
              alt="icon"
              className="h-full w-full object-cover"
            />
          </div>

          {/* NAME */}
          <div className="font-semibold text-[#555]">
            Du Lịch Việt
          </div>

          {/* ONLINE */}
          <div className="flex items-center gap-1 rounded-full bg-[#e6f8ea] px-2 py-[2px] text-xs font-semibold text-[#1fa34a]">
            <span className="h-2 w-2 rounded-full bg-[#1fa34a]" />
            ONLINE
          </div>
        </div>

        <div className="text-[14px] text-[#444]">
          Gửi cho bạn một tin nhắn
        </div>
      </div>

      {/* 🔥 KHUNG HỒNG DUY NHẤT */}
      <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-[#ef1a9a] to-[#b3126d] px-4 py-5 shadow-xl">
        
        {/* ICON CHAT */}
        <div className="relative flex items-center justify-center">
          <img
            src="/trangchu/alo.png"
            alt="chat"
            className="h-10 w-10 object-contain"
          />

          {/* BADGE */}
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b3b] text-[10px] font-bold text-white">
            24
          </span>
        </div>

        {/* ZALO */}
        <img
          src="/trangchu/zalo.png"
          alt="zalo"
          className="h-10 w-10 object-contain"
        />
      </div>
    </div>
  );
}