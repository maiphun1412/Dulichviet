"use client";

import { useEffect, useState } from "react";
import ChatPopup from "./ChatPopup";
import { ensureChatSession } from "@/lib/chat-service";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

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
      <div className="fixed bottom-6 right-4 z-[998] flex flex-col items-end gap-3">
        {/* BOX CHAT */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 shadow-xl">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#f3c6db]">
              <img
                src="/trangchu/đi.jpg"
                alt="icon"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="font-semibold text-[#555]">Du Lịch Việt</div>

            <div className="flex items-center gap-1 rounded-full bg-[#e6f8ea] px-2 py-[2px] text-xs font-semibold text-[#1fa34a]">
              <span className="h-2 w-2 rounded-full bg-[#1fa34a]" />
              ONLINE
            </div>
          </div>

          <div className="text-[14px] text-[#444]">Gửi cho bạn một tin nhắn</div>
        </div>

        {/* KHUNG HỒNG */}
        <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-[#ef1a9a] to-[#b3126d] px-4 py-5 shadow-xl">
          {/* ICON CHAT */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center"
          >
            <img
              src="/trangchu/alo.png"
              alt="chat"
              className="h-10 w-10 object-contain"
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b3b] text-[10px] font-bold text-white">
              24
            </span>
          </button>

          {/* ZALO */}
          <a
            href="https://zalo.me/2849615761982580160"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-110"
          >
            <img
              src="/trangchu/zalo.png"
              alt="zalo"
              className="h-10 w-10 object-contain"
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