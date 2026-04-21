import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    // fake user
    const userId = "test_user_123";

    // tạo user
    await setDoc(doc(db, "users", userId), {
      email: "test@gmail.com",
      phone: "0909123456",
      createdAt: Date.now(),
    });

    // tạo cart
    await setDoc(doc(db, "carts", userId), {
      userId,
      items: [
        {
          tourId: "tour-da-nang-3n2d",
          title: "Tour Đà Nẵng 3N2Đ",
          price: "7,999,000 đ",
          quantity: 1,
          image: "/images/tour1.jpg",
        },
      ],
      updatedAt: Date.now(),
    });

    return NextResponse.json({ message: "Seed user + cart OK" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fail" }, { status: 500 });
  }
}