import { NextResponse } from "next/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function GET() {
  try {
    const posts = [
      {
        title: "Eva Air khuyến mãi vé máy bay giá rẻ đi Đài Loan và Mỹ",
        slug: "eva-air-khuyen-mai-ve-may-bay-gia-re-di-dai-loan-va-my",
        category: "ve-may-bay",
        subCategory: "khuyen-mai",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "EVA Air đang triển khai chương trình ưu đãi vé máy bay đi Đài Loan và Mỹ với mức giá hấp dẫn cho năm 2025, phù hợp cho cả nhu cầu du lịch lẫn công tác.",
        publishedAt: "2025-10-05T21:08:00.000Z",
        views: 1696,
        rating: 4.82,
        totalRatings: 312,
        active: true,
        featured: true,
        content: `
          <p>EVA Air hiện đang có nhiều chương trình ưu đãi hấp dẫn cho hành khách bay từ Việt Nam đi Đài Loan và Mỹ. Đây là cơ hội tốt để khách hàng săn vé máy bay giá tốt, đặc biệt vào các giai đoạn khuyến mãi theo mùa.</p>
          <h2>Điểm nổi bật của ưu đãi</h2>
          <ul>
            <li>Giá vé cạnh tranh trên nhiều chặng bay quốc tế.</li>
            <li>Dịch vụ ổn định, hành trình thuận tiện.</li>
            <li>Phù hợp cho cả du lịch cá nhân lẫn đi công tác.</li>
          </ul>
          <p>Khi đặt vé, quý khách nên theo dõi lịch mở bán, lựa chọn khung giờ linh hoạt và ưu tiên đặt sớm để có mức giá tối ưu.</p>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Đặt vé Vietnam Airlines đi Buôn Ma Thuột tiết kiệm",
        slug: "dat-ve-vietnam-airlines-di-buon-ma-thuot-tiet-kiem",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Hướng dẫn đặt vé Vietnam Airlines đi Buôn Ma Thuột với chi phí hợp lý, thuận tiện cho chuyến công tác hoặc khám phá Tây Nguyên.",
        publishedAt: "2025-10-02T15:58:00.000Z",
        views: 1147,
        rating: 4.7,
        totalRatings: 204,
        active: true,
        featured: true,
        content: `
          <p>Buôn Ma Thuột là điểm đến nổi bật của khu vực Tây Nguyên, phù hợp với du khách yêu thiên nhiên, cà phê và văn hóa bản địa. Vietnam Airlines hiện khai thác nhiều chuyến bay thuận tiện đến điểm đến này.</p>
          <h2>Kinh nghiệm đặt vé tiết kiệm</h2>
          <ul>
            <li>Đặt vé sớm từ 2 đến 6 tuần.</li>
            <li>Ưu tiên bay giữa tuần để có giá tốt hơn.</li>
            <li>Theo dõi các chương trình ưu đãi định kỳ của hãng.</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Đặt vé máy bay Vietnam Airlines đi Đà Nẵng",
        slug: "dat-ve-may-bay-vietnam-airlines-di-da-nang",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Cẩm nang đặt vé Vietnam Airlines đi Đà Nẵng dành cho du khách muốn kết hợp nghỉ dưỡng, công tác và khám phá thành phố biển hiện đại.",
        publishedAt: "2025-10-02T15:39:00.000Z",
        views: 1055,
        rating: 4.76,
        totalRatings: 187,
        active: true,
        featured: true,
        content: `
          <p>Đà Nẵng là một trong những điểm đến du lịch được yêu thích nhất tại Việt Nam. Với đường bay đa dạng, Vietnam Airlines mang lại nhiều lựa chọn phù hợp cho khách công tác lẫn du lịch nghỉ dưỡng.</p>
          <h2>Lưu ý khi đặt vé</h2>
          <ul>
            <li>Đặt vé sớm nếu đi mùa hè hoặc dịp lễ.</li>
            <li>So sánh khung giờ bay để tối ưu lịch trình.</li>
            <li>Kiểm tra hành lý và điều kiện đổi vé trước khi thanh toán.</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Mua vé Vietnam Airlines đi Rạch Giá",
        slug: "mua-ve-vietnam-airlines-di-rach-gia",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Rạch Giá là cửa ngõ khám phá Kiên Giang và các vùng biển đảo lân cận, phù hợp cho hành trình nghỉ dưỡng ngắn ngày.",
        publishedAt: "2025-10-08T23:38:00.000Z",
        views: 990,
        rating: 4.64,
        totalRatings: 143,
        active: true,
        featured: false,
        content: `
          <p>Rạch Giá là cửa ngõ quan trọng để khám phá Kiên Giang và các vùng biển đảo lân cận. Việc mua vé máy bay đến đây giúp tiết kiệm nhiều thời gian so với di chuyển đường bộ.</p>
          <p>Vietnam Airlines mang lại sự ổn định về giờ bay và chất lượng dịch vụ, phù hợp với khách có nhu cầu công tác hoặc nghỉ dưỡng ngắn ngày.</p>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Mở bán đường bay mới Đà Nẵng đi Seoul",
        slug: "mo-ban-duong-bay-moi-da-nang-di-seoul",
        category: "ve-may-bay",
        subCategory: "tin-moi",
        image:
          "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Đường bay mới Đà Nẵng - Seoul mở ra thêm lựa chọn thuận tiện cho cả khách du lịch và khách công tác trong năm 2025.",
        publishedAt: "2025-10-08T18:08:00.000Z",
        views: 1310,
        rating: 4.79,
        totalRatings: 226,
        active: true,
        featured: false,
        content: `
          <p>Đường bay Đà Nẵng - Seoul mở ra cơ hội thuận tiện hơn cho cả khách du lịch lẫn khách công tác. Đây là tuyến bay tiềm năng với nhu cầu tăng mạnh trong các năm gần đây.</p>
          <h2>Vì sao tuyến bay này đáng chú ý?</h2>
          <ul>
            <li>Tiết kiệm thời gian so với các hành trình transit.</li>
            <li>Phù hợp cho nhóm khách du lịch Hàn Quốc và Việt Nam.</li>
            <li>Mang lại thêm lựa chọn giờ bay linh hoạt.</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Malindo Air khuyến mãi vé máy bay đi Kuala Lumpur giá siêu hấp dẫn",
        slug: "malindo-air-khuyen-mai-ve-may-bay-di-kuala-lumpur-gia-sieu-hap-dan",
        category: "ve-may-bay",
        subCategory: "khuyen-mai",
        image:
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Chương trình giá tốt trên chặng đi Kuala Lumpur giúp khách hàng dễ dàng lên kế hoạch khám phá Malaysia với chi phí hợp lý.",
        publishedAt: "2025-10-08T16:48:00.000Z",
        views: 1481,
        rating: 4.73,
        totalRatings: 196,
        active: true,
        featured: false,
        content: `
          <p>Kuala Lumpur là điểm đến hấp dẫn nhờ sự pha trộn giữa hiện đại, văn hóa đa sắc tộc và ẩm thực phong phú. Các chương trình khuyến mãi giúp hành khách dễ dàng tiếp cận điểm đến này với chi phí hợp lý hơn.</p>
          <p>Khi săn vé, nên linh hoạt ngày đi và kết hợp so sánh giờ bay để chọn phương án phù hợp nhất với lịch trình cá nhân.</p>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Kinh nghiệm săn vé máy bay giá rẻ khi đi du lịch Hàn Quốc",
        slug: "kinh-nghiem-san-ve-may-bay-gia-re-khi-di-du-lich-han-quoc",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Hàn Quốc là điểm đến được nhiều du khách yêu thích, và việc săn vé máy bay giá tốt sẽ giúp tiết kiệm đáng kể ngân sách chuyến đi.",
        publishedAt: "2026-03-19T10:52:00.000Z",
        views: 81403,
        rating: 4.81,
        totalRatings: 1250,
        active: true,
        featured: true,
        content: `
          <p>Du lịch Hàn Quốc năm 2026 sẽ trở nên dễ dàng và tiết kiệm hơn với những bí quyết săn vé máy bay giá rẻ, lên kế hoạch thông minh và tối ưu chi phí.</p>
          <h2>Một số mẹo hữu ích</h2>
          <ul>
            <li>Canh vé trong các khung giờ khuyến mãi.</li>
            <li>Ưu tiên đi mùa thấp điểm nếu linh hoạt lịch trình.</li>
            <li>So sánh giá trên nhiều nền tảng trước khi chốt vé.</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Các cách thanh toán vé máy bay nhanh chóng",
        slug: "cac-cach-thanh-toan-ve-may-bay-nhanh-chong",
        category: "ve-may-bay",
        subCategory: "huong-dan",
        image:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Bài viết cung cấp thông tin chi tiết về các lựa chọn thanh toán phổ biến nhất khi đặt vé máy bay trực tuyến trong năm 2026.",
        publishedAt: "2026-01-19T09:02:00.000Z",
        views: 52657,
        rating: 4.81,
        totalRatings: 1,
        active: true,
        featured: true,
        content: `
          <p>Việc đặt mua vé máy bay trực tuyến ngày càng trở nên phổ biến với đa dạng phương thức thanh toán. Bài viết này sẽ cung cấp thông tin chi tiết về các lựa chọn thanh toán phổ biến nhất, từ thẻ quốc tế, thẻ nội địa đến ví điện tử.</p>
          <h2>Những cách thanh toán phổ biến</h2>
          <ul>
            <li>Thẻ Visa/MasterCard/JCB</li>
            <li>Internet Banking</li>
            <li>Ví điện tử</li>
            <li>Thanh toán tại phòng vé hoặc đại lý</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Đặt vé máy bay đi Huế 2025: Kinh nghiệm và mẹo tiết kiệm",
        slug: "dat-ve-may-bay-di-hue-2025-kinh-nghiem-va-meo-tiet-kiem",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Cẩm nang toàn diện về các chuyến bay từ Hà Nội đến Huế, bí quyết săn vé giá rẻ và kinh nghiệm khám phá cố đô thuận tiện hơn.",
        publishedAt: "2026-03-17T14:10:00.000Z",
        views: 5642,
        rating: 4.75,
        totalRatings: 404,
        active: true,
        featured: false,
        content: `
          <p>Huế luôn là điểm đến hấp dẫn với vẻ đẹp trầm mặc, kiến trúc cung đình và ẩm thực đặc sắc. Việc chuẩn bị trước thông tin vé máy bay sẽ giúp bạn chủ động hơn trong lịch trình.</p>
          <p>Nếu đi vào mùa cao điểm du lịch, nên đặt sớm để có mức giá tốt và lựa chọn được giờ bay phù hợp.</p>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
      {
        title: "Du lịch Mỹ năm 2025 mùa nào đẹp nhất",
        slug: "du-lich-my-nam-2025-mua-nao-dep-nhat",
        category: "ve-may-bay",
        subCategory: "kinh-nghiem",
        image:
          "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200&auto=format&fit=crop",
        excerpt:
          "Gợi ý thời điểm đẹp để đi Mỹ trong năm 2025, kết hợp lựa chọn hành trình bay phù hợp và tối ưu ngân sách.",
        publishedAt: "2026-03-15T19:20:00.000Z",
        views: 7381,
        rating: 4.77,
        totalRatings: 522,
        active: true,
        featured: false,
        content: `
          <p>Mỹ là điểm đến rộng lớn với cảnh sắc thay đổi rõ rệt theo mùa. Tùy nhu cầu mua sắm, tham quan hay nghỉ dưỡng, bạn có thể chọn thời điểm phù hợp nhất cho chuyến đi.</p>
          <h2>Một số gợi ý</h2>
          <ul>
            <li>Mùa xuân: khí hậu dễ chịu, cảnh đẹp.</li>
            <li>Mùa thu: lá vàng lá đỏ rất ấn tượng.</li>
            <li>Mùa đông: phù hợp du lịch kết hợp mua sắm và lễ hội.</li>
          </ul>
        `,
        relatedPosts: [],
        contact: {
          facebook: "facebook.com/vemaybaygiare.dulichviet",
          email: "phongve@dulichviet.com.vn",
        },
      },
    ];

    for (const post of posts) {
      await setDoc(
        doc(db, "flight_posts", post.slug),
        {
          ...post,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Seed thành công ${posts.length} bài vé máy bay`,
      total: posts.length,
    });
  } catch (error) {
    console.error("Seed flight posts error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Seed bài vé máy bay thất bại",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}