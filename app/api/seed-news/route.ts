import { NextResponse } from "next/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function GET() {
  try {
    const article = {
      title: "Tổng hợp kinh nghiệm du lịch Đà Nẵng mùa thu hữu ích dành cho du khách",
      slug: "tong-hop-kinh-nghiem-du-lich-da-nang-mua-thu",
      category: "tin-tuc",
      subCategory: "du-lich",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop",
      excerpt:
        "Bài viết tổng hợp những kinh nghiệm thực tế khi du lịch Đà Nẵng vào mùa thu, từ thời tiết, lịch trình, ăn uống đến các điểm check-in nổi bật.",
      publishedAt: "2026-04-16T14:36:00.000Z",
      views: 1591,
      rating: 4.93,
      totalRatings: 1597,
      active: true,
      featured: true,
      content: `
        <p><strong>Đà Nẵng mùa thu</strong> là một trong những thời điểm đẹp nhất trong năm để du lịch. Không quá đông đúc như mùa hè, cũng chưa bước vào mùa mưa nhiều, thành phố biển này mang đến một vẻ đẹp nhẹ nhàng, dễ chịu và cực kỳ thư giãn cho du khách.</p>

        <figure>
          <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop" alt="Cầu Rồng Đà Nẵng">
          <figcaption>Cầu Rồng – biểu tượng nổi bật của thành phố Đà Nẵng</figcaption>
        </figure>

        <h2>1. Thời tiết Đà Nẵng mùa thu có gì đặc biệt?</h2>
        <p>Từ khoảng tháng 8 đến tháng 10, Đà Nẵng bước vào mùa thu với nền nhiệt dao động từ 25–30°C. Thời tiết mát mẻ hơn so với mùa hè, ít nắng gắt và rất thích hợp cho các hoạt động tham quan ngoài trời.</p>

        <ul>
          <li>Ban ngày: trời nắng nhẹ, dễ chịu</li>
          <li>Chiều tối: có thể có mưa nhẹ, không kéo dài</li>
          <li>Không khí: trong lành, ít khói bụi</li>
        </ul>

        <h2>2. Những địa điểm không thể bỏ qua</h2>

        <figure>
          <img src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200&auto=format&fit=crop" alt="Biển Mỹ Khê">
          <figcaption>Bãi biển Mỹ Khê – một trong những bãi biển đẹp nhất hành tinh</figcaption>
        </figure>

        <p>Khi đến Đà Nẵng, bạn không nên bỏ lỡ những địa điểm sau:</p>

        <ul>
          <li><strong>Biển Mỹ Khê:</strong> nước trong xanh, sóng nhẹ, cực kỳ phù hợp để tắm biển</li>
          <li><strong>Bà Nà Hills:</strong> nơi có Cầu Vàng nổi tiếng thế giới</li>
          <li><strong>Ngũ Hành Sơn:</strong> địa điểm tâm linh kết hợp khám phá thiên nhiên</li>
          <li><strong>Bán đảo Sơn Trà:</strong> ngắm toàn cảnh thành phố từ trên cao</li>
        </ul>

        <h2>3. Ăn gì ở Đà Nẵng?</h2>

        <p>Ẩm thực Đà Nẵng rất phong phú và giá cả hợp lý. Một số món bạn nhất định phải thử:</p>

        <ul>
          <li>Mì Quảng</li>
          <li>Bún chả cá</li>
          <li>Bánh tráng cuốn thịt heo</li>
          <li>Hải sản tươi sống ven biển</li>
        </ul>

        <figure>
          <img src="https://images.unsplash.com/photo-1604908177522-432e7c7e9e5c?q=80&w=1200&auto=format&fit=crop" alt="Ẩm thực Đà Nẵng">
          <figcaption>Ẩm thực Đà Nẵng đa dạng và hấp dẫn</figcaption>
        </figure>

        <h2>4. Kinh nghiệm du lịch hữu ích</h2>

        <p>Để chuyến đi thuận lợi hơn, bạn nên lưu ý:</p>

        <ul>
          <li>Đặt vé máy bay và khách sạn trước 1–2 tuần</li>
          <li>Thuê xe máy để di chuyển dễ dàng</li>
          <li>Chuẩn bị áo khoác mỏng cho buổi tối</li>
          <li>Luôn mang theo ô hoặc áo mưa nhẹ</li>
        </ul>

        <h2>5. Gợi ý lịch trình 3 ngày 2 đêm</h2>

        <p><strong>Ngày 1:</strong> Check-in khách sạn → tham quan biển Mỹ Khê → cầu Rồng</p>
        <p><strong>Ngày 2:</strong> Bà Nà Hills → Cầu Vàng → vui chơi trong khu giải trí</p>
        <p><strong>Ngày 3:</strong> Ngũ Hành Sơn → mua đặc sản → về</p>

        <h2>6. Kết luận</h2>

        <p>Du lịch Đà Nẵng mùa thu là lựa chọn cực kỳ lý tưởng nếu bạn muốn tìm một nơi vừa đẹp, vừa dễ đi, lại không quá đông đúc. Với cảnh quan thiên nhiên đa dạng, ẩm thực hấp dẫn và con người thân thiện, Đà Nẵng chắc chắn sẽ mang đến cho bạn một chuyến đi đáng nhớ.</p>
      `,
      relatedNews: [],
      contact: {
        facebook: "facebook.com/dulichvietnews",
        email: "cskh@dulichviet.com.vn",
      },
    };

    await setDoc(
      doc(db, "news_posts", article.slug),
      {
        ...article,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({
      ok: true,
      message: "Update bài Đà Nẵng thành công",
      slug: article.slug,
    });
  } catch (error) {
    console.error("Update news error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Update bài viết thất bại",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}