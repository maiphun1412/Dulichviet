import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ChatWidget from "@/components/chat/ChatWidget";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Du Lịch Việt",
  description: "Mạng bán tour du lịch trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}
        <ChatWidget />
      </body>
    </html>
  );
}