"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { loginWithEmail, registerWithEmail } from "../lib/auth";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type Mode = "login" | "register";

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  if (!isOpen) return null;

const handleLogin = async () => {
  try {
    if (!email.trim()) {
      setErrorText("Vui lòng nhập email.");
      return;
    }

    if (!password.trim()) {
      setErrorText("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);
    setErrorText("");
    await loginWithEmail(email.trim(), password);
    onSuccess?.();
    onClose();
  } catch (error: any) {
    console.error("Login error:", error);
    console.error("Login error code:", error?.code);

    switch (error?.code) {
      case "auth/invalid-email":
        setErrorText("Email không hợp lệ.");
        break;
      case "auth/user-not-found":
        setErrorText("Tài khoản không tồn tại.");
        break;
      case "auth/wrong-password":
      case "auth/invalid-credential":
        setErrorText("Sai email hoặc mật khẩu.");
        break;
      case "auth/too-many-requests":
        setErrorText("Bạn thử quá nhiều lần. Vui lòng đợi một chút.");
        break;
      default:
        setErrorText("Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.");
        break;
    }
  } finally {
    setLoading(false);
  }
};

const handleRegister = async () => {
  try {
    if (!email.trim()) {
      setErrorText("Vui lòng nhập email.");
      return;
    }

    if (!phone.trim()) {
      setErrorText("Vui lòng nhập số điện thoại.");
      return;
    }

    if (password.length < 6) {
      setErrorText("Mật khẩu phải từ 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorText("Xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    setErrorText("");

    await registerWithEmail(email.trim(), password, phone.trim());

    onSuccess?.();
    onClose();
  } catch (error: any) {
    console.error("Register error:", error);
    console.error("Register error code:", error?.code);

    switch (error?.code) {
      case "auth/email-already-in-use":
        setErrorText("Email này đã được đăng ký.");
        break;
      case "auth/invalid-email":
        setErrorText("Email không hợp lệ.");
        break;
      case "auth/weak-password":
        setErrorText("Mật khẩu quá yếu, phải từ 6 ký tự trở lên.");
        break;
      case "auth/operation-not-allowed":
        setErrorText("Chức năng Email/Password chưa được bật trong Firebase.");
        break;
      case "auth/network-request-failed":
        setErrorText("Lỗi kết nối mạng. Vui lòng thử lại.");
        break;
      default:
        setErrorText(error?.message || "Đăng ký thất bại.");
        break;
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-[520px] rounded-[6px] bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#666] hover:text-black"
        >
          <X size={22} />
        </button>

        {mode === "login" ? (
          <>
            <h2 className="mb-3 text-[28px] font-bold text-[#111]">Đăng nhập</h2>
            <p className="mb-5 text-[15px] leading-[1.6] text-[#888]">
              Đăng nhập tài khoản Du Lịch Việt và khám phá niềm vui của bạn ở bất cứ đâu
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Email (*)</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Mật khẩu (*)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>
            </div>

            {errorText ? (
              <p className="mt-4 text-[14px] text-red-600">{errorText}</p>
            ) : null}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-5 flex h-[52px] w-full items-center justify-center rounded-full bg-[#f4008f] text-[24px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
            </button>

            <div className="mt-4 flex items-center justify-between text-[15px]">
              <button type="button" className="text-[#333] hover:underline">
                Quên mật khẩu?
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorText("");
                  setMode("register");
                }}
                className="text-[#333] underline"
              >
                Đăng ký
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-3 text-[28px] font-bold text-[#111]">Đăng ký</h2>
            <p className="mb-5 text-[15px] leading-[1.6] text-[#888]">
              Nhận tài khoản Du Lịch Việt và khám phá niềm vui của bạn ở bất cứ đâu
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Email (*)</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Số điện thoại (*)</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Mật khẩu (*)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] text-[#333]">Xác nhận mật khẩu (*)</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập xác nhận mật khẩu..."
                  className="h-[44px] w-full rounded-[4px] border border-[#d7d7d7] px-4 outline-none"
                />
              </div>
            </div>

            {errorText ? (
              <p className="mt-4 text-[14px] text-red-600">{errorText}</p>
            ) : null}

            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="mt-5 flex h-[52px] w-full items-center justify-center rounded-full bg-[#f4008f] text-[24px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "ĐĂNG KÝ"}
            </button>

            <div className="mt-4 text-right text-[15px]">
              <button
                type="button"
                onClick={() => {
                  setErrorText("");
                  setMode("login");
                }}
                className="underline"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}