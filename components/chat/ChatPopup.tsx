"use client";

import { useEffect, useRef, useState } from "react";
import {
  getMessages,
  sendTextMessage,
  sendBotMessage,
  type ChatMessage,
} from "@/lib/chat-service";
import { Paperclip } from "lucide-react";

type ChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
};

const emojiList = [
  "👍",
  "👎",
  "😡",
  "😐",
  "😢",
  "😀",
  "😍",
  "😮",
  "😩",
  "😴",
  "😂",
  "😲",
  "😝",
  "🙂",
  "😭",
];

export default function ChatPopup({
  isOpen,
  onClose,
  sessionId,
}: ChatPopupProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    if (!sessionId) return;

    try {
      setLoadingMessages(true);
      const data = await getMessages(sessionId);
      setMessages(data);
    } catch (error) {
      console.error("Lỗi tải tin nhắn:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setShowEmojiPicker(false);
      return;
    }

    loadMessages();
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (!isOpen) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!sessionId || !message.trim() || sending) return;

    try {
      setSending(true);

      await sendTextMessage(sessionId, message.trim());
      setMessage("");
      await loadMessages();

      setTimeout(async () => {
        await sendBotMessage(
          sessionId,
          "Hiện tại hệ thống chưa có nhân viên trực. Ngay khi có nhân viên, bên em sẽ chủ động liên hệ và hỗ trợ Quý Khách sớm nhất ạ."
        );

        await loadMessages();
      }, 1200);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        aria-label="Đóng popup"
        onClick={onClose}
        className="absolute inset-0 bg-black/10"
      />

      <div
        className="fixed bottom-[96px] right-4 z-[1000]
        flex h-[600px] w-[380px] flex-col
        overflow-hidden rounded-[22px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
      >
        {/* HEADER */}
        <div className="relative shrink-0 bg-[linear-gradient(180deg,#cf2c97_0%,#c43ca1_100%)] px-4 py-3 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-3 text-[22px] leading-none text-white/80 transition hover:text-white"
          >
            ×
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
              <img
                src="/trangchu/điii.png"
                alt="Du Lịch Việt"
                className="h-[40px] w-[40px] object-contain"
              />
            </div>

            <div className="pr-8">
              <div className="text-[16px] font-bold leading-tight">
                Du Lịch Việt
              </div>
              <div className="mt-[2px] text-[13px] leading-tight text-white/85">
                Phục Vụ Bằng Cả Trái Tim
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex min-h-0 flex-1 flex-col bg-[#f5f5f5]">
          {/* CHAT AREA */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            {loadingMessages ? (
              <div className="text-[14px] text-[#777]">Đang tải hội thoại...</div>
            ) : messages.length === 0 ? (
              <div className="text-[14px] text-[#777]">
                Chưa có tin nhắn nào.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((item, index) => {
                  const isBot = item.role === "bot";

                  return (
                    <div
                      key={item.id ?? index}
                      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className="max-w-[290px]">
                        {isBot && (
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f59dc9] bg-white">
                              <img
                                src="/trangchu/điii.png"
                                alt="Du Lịch Việt"
                                className="h-4 w-4 object-contain"
                              />
                            </div>
                            <div className="text-[14px] text-[#555]">
                              Du Lịch Việt
                            </div>
                          </div>
                        )}

                        <div
                          className={`rounded-[20px] px-5 py-4 text-[13px] leading-[1.5] shadow-sm ${
                            isBot
                              ? "bg-[#efe8ed] text-[#111]"
                              : "bg-[#d61b93] text-white"
                          }`}
                        >
                          {item.text || ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="relative shrink-0 border-t border-[#dddddd] bg-white px-3 py-3">
            {showEmojiPicker && (
              <div className="absolute bottom-[62px] right-12 z-20 grid grid-cols-5 gap-3 rounded-[18px] bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
                {emojiList.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setMessage((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-[22px] leading-none transition hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border-none bg-transparent text-[13px] text-[#444] outline-none placeholder:text-[#9c9c9c]"
              />

              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-[22px] leading-none text-[#7d7d7d] transition hover:opacity-80"
                aria-label="Mở emoji"
              >
                ☺
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center text-[#7d7d7d] transition hover:opacity-80"
                aria-label="Tải file"
              >
                <Paperclip size={20} />
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !message.trim()}
                className="rounded-full bg-[#d61b93] px-3 py-1 text-[14px] font-semibold text-white disabled:opacity-50"
              >
                Gửi
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}