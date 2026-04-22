"use client";

import { useEffect, useState } from "react";
import ChatPopup from "./chat/ChatPopup";
import { ensureChatSession } from "@/lib/chat-service";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [showMiniPopup, setShowMiniPopup] = useState(true);

  useEffect(() => {
    const initChat = async () => {
      try {
        const id = await ensureChatSession();
        setSessionId(id);
      } catch (error) {
        console.error("Lỗi khởi tạo chat session:", error);
      }
    };

    initChat();
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
        {showMiniPopup && !isOpen && (
          <div className="relative rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-xl">
            <button
              type="button"
              onClick={() => setShowMiniPopup(false)}
              aria-label="Đóng popup nhỏ"
              className="absolute right-2 top-1 text-[18px] leading-none text-[#999] transition duration-200 hover:scale-110 hover:text-[#666]"
            >
              ×
            </button>

            <div className="mb-2 flex items-center gap-2 pr-5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#f3c6db]">
                <img
                  src="/trangchu/đi.jpg"
                  alt="icon"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="text-[14px] font-semibold text-[#555]">
                Du Lịch Việt
              </div>

              <div className="flex items-center gap-1 rounded-full bg-[#e6f8ea] px-2 py-[2px] text-[11px] font-semibold text-[#1fa34a]">
                <span className="h-2 w-2 rounded-full bg-[#1fa34a]" />
                ONLINE
              </div>
            </div>

            <div className="text-[13px] text-[#444]">
              Gửi cho bạn một tin nhắn
            </div>
          </div>
        )}

        <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-[#ef1a9a] to-[#b3126d] px-4 py-5 shadow-xl">
          <button
            type="button"
            onClick={() => {
              setShowMiniPopup(false);
              setIsOpen(true);
            }}
            className="relative flex items-center justify-center transition duration-200 hover:scale-125"
            aria-label="Mở chat"
          >
            <img
              src="/trangchu/alo.png"
              alt="chat"
              className="h-10 w-10 object-contain transition duration-200 hover:scale-110"
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b3b] text-[10px] font-bold text-white">
              24
            </span>
          </button>

          <a
            href="https://zalo.me/2849615761982580160"
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 hover:scale-125"
            aria-label="Mở Zalo"
          >
            <img
              src="/trangchu/zalo.png"
              alt="zalo"
              className="h-10 w-10 object-contain transition duration-200 hover:scale-110"
            />
          </a>
        </div>
      </div>

      <ChatPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sessionId={sessionId}
      />
    </>
  );
}