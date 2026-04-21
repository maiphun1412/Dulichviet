import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const servicePage = {
      id: "main",
      slug: "xe-du-lich",
      title: "Xe du lịch",
      heroTitle: "Xe du lịch",
      heroSubtitle:
        "Dịch vụ thuê xe du lịch, thuê xe dịch vụ, thuê xe cưới, thuê xe 4 chỗ đến 47 chỗ.",
      heroImage:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop",
      introHtml: `
        <p><strong>Xe du lịch</strong> – Phòng vận chuyển công ty Du Lịch Việt cung cấp và mang đến cho quý khách dịch vụ <strong>thuê xe du lịch</strong>, <strong>thuê xe dịch vụ</strong> với giá cực tốt. Chúng tôi cho thuê xe đời mới, thuê xe hoa, thuê xe Land Cruiser, thuê xe Audi A4, thuê xe Audi A6, cho thuê xe Audi R8, thuê xe A8, thuê xe Q5.</p>
      `,
      bookingTitle: "THUÊ XE TRỰC TUYẾN",
      bookingNote: 'Dấu <span style="color:#ec008c">*</span> là thông tin bắt buộc',
      vehicleCollectionHtml: `
        <p>Để có thể lựa chọn cho mình dịch vụ <strong>thuê xe giá rẻ</strong>, <strong>thuê xe 20 chỗ</strong>, <strong>thuê xe 24 chỗ</strong>, <strong>thuê xe 29 chỗ</strong>, <strong>thuê xe 35 chỗ</strong>, <strong>thuê xe 39 chỗ</strong>, <strong>thuê xe 45 chỗ</strong>; quý khách có thể tham khảo thêm thông tin các loại xe du lịch, thuê xe dịch vụ cùng bảng giá thuê xe ngay tại Website và đặt thuê xe trực tuyến để nhận được nhiều ưu đãi hấp dẫn.</p>
      `,
      active: true,
      updatedAt: new Date().toISOString(),
    };

    const carPosts = [
      {
        id: "mercedes-e250-cao-cap-tai-tphcm",
        slug: "dia-chi-thue-xe-mercedes-e250-cao-cap-tai-tphcm",
        title: "Địa Chỉ Thuê Xe Mercedes E250 Cao Cấp Tại TPHCM",
        category: "Xe du lịch",
        brand: "Mercedes-Benz",
        seats: 4,
        year: "2016",
        thumbnail:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600&auto=format&fit=crop"
        ],
        rating: 2.43,
        reviewCount: 1,
        viewCount: 1021,
        excerpt:
          "Quý vị đang cần thuê xe Mercedes E250 và cần tìm tài xế riêng có thể đưa đón bạn mỗi khi có nhu cầu.",
        shortDescription:
          "Dịch vụ thuê xe Mercedes E250 cao cấp, phù hợp cho doanh nhân, cưới hỏi, tiếp khách và đưa đón sân bay.",
        specs: {
          brand: "Mercedes-Benz",
          model: "E250",
          seats: 4,
          year: "2016",
          colors: ["Xanh", "Trắng", "Đen"],
          priceFrom: "Liên hệ",
        },
        detailHtml: `
          <div style="max-width:980px;margin:0 auto;">
            <div style="text-align:center;margin:30px 0;">
              <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop" alt="Mercedes E250" style="max-width:100%;height:auto;" />
              <p style="margin-top:12px;font-style:italic;">Thuê xe Mercedes E250 ở TPHCM tại Du Lịch Việt</p>
            </div>

            <h2 style="color:#2b78c2;">Cho Thuê Xe Mercedes E250 Cao Cấp Tại TPHCM</h2>
            <p>Xe Mercedes E250 - <strong>Thuê xe Mercedes E250</strong> được coi là một trong số dòng xe bán chạy nhất và được nhiều khách hàng yêu thích nhất thị trường Việt Nam, với những thiết kế từ ngoại thất đến nội thất đều đáp ứng nhu cầu mong đợi của khách hàng.</p>
            <p>Xe Mercedes E250 được trang bị tay lái thể thao 3 chấu bọc da nappa, ốp xe thiết kế thể thao, được trang bị AMG cản trước, cản sau, cùng những thiết kế logo Mercedes-Benz đầy hấp dẫn.</p>

            <h2 style="color:#2b78c2;margin-top:32px;">Ưu điểm của dịch vụ cho thuê xe Mercedes E250 tại Du Lịch Việt</h2>
            <p>Khi sử dụng dịch vụ cho thuê xe 4 chỗ Mercedes E250 giá rẻ tại TPHCM hay Hà Nội của công ty Du Lịch Việt, khách hàng sẽ hoàn toàn yên tâm về chất lượng phục vụ từ đội ngũ nhân viên đến tài xế lái xe chuyên nghiệp. Ngoài ra chúng tôi luôn có mức giá cạnh tranh và có nhiều ưu đãi.</p>

            <div style="text-align:center;margin:24px 0;">
              <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400&auto=format&fit=crop" alt="Mercedes E250 đẹp" style="max-width:100%;height:auto;" />
              <p style="margin-top:12px;font-style:italic;">Vẻ đẹp lịch lãm của dòng xe Mercedes E250 thu hút rất nhiều hành khách</p>
            </div>

            <p>Trong suốt những năm qua công ty chúng tôi luôn nỗ lực để hoàn thiện hơn dịch vụ thuê xe dịch vụ, thuê xe du lịch, thuê xe hành hương hoặc những hành trình cho thuê xe giá rẻ TPHCM, thuê xe giá rẻ Hà Nội.</p>
            <ul>
              <li>Nhân viên điều hành sẵn sàng tư vấn, hỗ trợ 24/7, báo giá nhanh chóng.</li>
              <li>Tài xế chuyên nghiệp, lịch sự, thông thạo đường đi.</li>
              <li>Xe đời mới, nội thất sạch sẽ, vận hành êm ái.</li>
              <li>Dịch vụ linh hoạt theo nhu cầu cưới hỏi, tiếp khách, công tác, sân bay.</li>
            </ul>

            <div style="text-align:center;margin:24px 0;">
              <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1400&auto=format&fit=crop" alt="Mercedes E250 dịch vụ" style="max-width:100%;height:auto;" />
              <p style="margin-top:12px;font-style:italic;">Du Lịch Việt địa chỉ cung cấp thuê xe Mercedes, thuê xe dịch vụ uy tín</p>
            </div>

            <h2 style="color:#2b78c2;margin-top:32px;">Dịch vụ thuê xe với đa dạng dòng xe tại Du Lịch Việt</h2>
            <p>Tại Du Lịch Việt chúng tôi chuyên cung cấp dịch vụ <strong>thuê xe hoa</strong>, <strong>thuê xe đám cưới</strong>, cùng nhiều dòng xe như: Thuê xe Land Cruiser, Thuê xe Sienna, Thuê xe Sedona, Thuê xe Limousine.</p>
            <p>Với nhiều năm kinh nghiệm trong <strong>thuê xe dịch vụ</strong>, cho thuê xe 4 chỗ Mercedes E250 giá rẻ, công ty Du Lịch Việt là một trong những đơn vị đi đầu cung cấp các dịch vụ thuê xe du lịch chất lượng tại TPHCM và Hà Nội.</p>
          </div>
        `,
        priceTableHtml: `
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr>
                <th style="border:1px solid #ccc;padding:10px;text-align:left;">Gói dịch vụ</th>
                <th style="border:1px solid #ccc;padding:10px;text-align:left;">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Đưa đón nội thành 4 giờ</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Đưa đón sân bay 1 chiều</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Thuê theo ngày</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
            </tbody>
          </table>
        `,
        isHot: true,
        showOnHome: true,
        sortOrder: 1,
        active: true,
      },

      {
        id: "dich-vu-thue-xe-mercedes-s500-vip",
        slug: "dich-vu-thue-xe-mercedes-s500-vip-tai-tphcm",
        title: "Dịch Vụ Thuê Xe Mercedes S500 VIP Tại TPHCM",
        category: "Xe du lịch",
        brand: "Mercedes-Benz",
        seats: 4,
        year: "2018",
        thumbnail:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop"
        ],
        rating: 4.93,
        reviewCount: 715,
        viewCount: 54575,
        excerpt: "Dịch vụ thuê xe Mercedes S500 sang trọng, phù hợp tiếp khách VIP.",
        shortDescription:
          "Xe sang cho doanh nhân, đám cưới, sự kiện và đưa đón đối tác.",
        specs: {
          brand: "Mercedes-Benz",
          model: "S500",
          seats: 4,
          year: "2018",
          colors: ["Đen", "Trắng"],
          priceFrom: "Liên hệ",
        },
        detailHtml: `
          <div style="max-width:980px;margin:0 auto;">
            <h2 style="color:#2b78c2;">Dịch Vụ Thuê Xe Mercedes S500 VIP Tại TPHCM</h2>
            <p>Mercedes S500 là mẫu sedan hạng sang phù hợp cho các chuyến công tác, đón khách VIP và sự kiện quan trọng.</p>
            <div style="text-align:center;margin:24px 0;">
              <img src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1400&auto=format&fit=crop" alt="Mercedes S500" style="max-width:100%;height:auto;" />
            </div>
            <p>Dịch vụ tại Du Lịch Việt bảo đảm xe sạch đẹp, tài xế chuyên nghiệp, hỗ trợ nhanh và linh hoạt theo lịch trình của khách hàng.</p>
          </div>
        `,
        priceTableHtml: `
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Thuê theo giờ</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Thuê theo ngày</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
            </tbody>
          </table>
        `,
        isHot: true,
        showOnHome: true,
        sortOrder: 2,
        active: true,
      },

      {
        id: "bang-gia-thue-xe-29-cho",
        slug: "bang-gia-thue-xe-29-cho-uy-tin-chat-luong-thi-truong-tphcm",
        title: "Bảng Giá Thuê Xe 29 Chỗ Uy Tín Chất Lượng Thị Trường TPHCM",
        category: "Xe du lịch",
        brand: "Toyota",
        seats: 29,
        year: "2020",
        thumbnail:
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop"
        ],
        rating: 4.7,
        reviewCount: 122,
        viewCount: 8500,
        excerpt: "Bảng giá thuê xe 29 chỗ phục vụ du lịch, đưa đón đoàn, hội nghị.",
        shortDescription: "Dòng xe 29 chỗ rộng rãi, phù hợp cho đoàn khách vừa.",
        specs: {
          brand: "Toyota",
          model: "Coaster 29 chỗ",
          seats: 29,
          year: "2020",
          colors: ["Trắng"],
          priceFrom: "Liên hệ",
        },
        detailHtml: `
          <div style="max-width:980px;margin:0 auto;">
            <h2 style="color:#2b78c2;">Bảng Giá Thuê Xe 29 Chỗ Tại TPHCM</h2>
            <p>Dịch vụ thuê xe 29 chỗ phục vụ tham quan, hội nghị, lễ hội, team building và đưa đón sân bay.</p>
            <ul>
              <li>Xe sạch sẽ, nội thất thoáng mát.</li>
              <li>Tài xế có kinh nghiệm chạy tour.</li>
              <li>Hỗ trợ lịch trình ngắn ngày và dài ngày.</li>
            </ul>
          </div>
        `,
        priceTableHtml: `
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Nội thành</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Ngoại thành</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Tour 2 ngày 1 đêm</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
            </tbody>
          </table>
        `,
        isHot: false,
        showOnHome: true,
        sortOrder: 3,
        active: true,
      },

      {
        id: "dich-vu-thue-xe-24-cho-gia-re",
        slug: "dich-vu-thue-xe-24-cho-gia-re",
        title: "Dịch Vụ Thuê Xe 24 Chỗ Giá Rẻ",
        category: "Xe du lịch",
        brand: "Toyota",
        seats: 24,
        year: "2019",
        thumbnail:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop"
        ],
        rating: 4.5,
        reviewCount: 89,
        viewCount: 6200,
        excerpt: "Thuê xe 24 chỗ phù hợp đoàn du lịch nhỏ, tiện nghi và tiết kiệm.",
        shortDescription: "Xe 24 chỗ giá tốt, máy lạnh mạnh, ghế ngồi thoải mái.",
        specs: {
          brand: "Toyota",
          model: "24 chỗ",
          seats: 24,
          year: "2019",
          colors: ["Trắng", "Đỏ"],
          priceFrom: "Liên hệ",
        },
        detailHtml: `
          <div style="max-width:980px;margin:0 auto;">
            <h2 style="color:#2b78c2;">Dịch Vụ Thuê Xe 24 Chỗ Giá Rẻ</h2>
            <p>Dòng xe 24 chỗ thích hợp cho gia đình lớn, công ty nhỏ hoặc nhóm khách du lịch cần không gian rộng rãi nhưng vẫn tiết kiệm.</p>
          </div>
        `,
        priceTableHtml: `
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="border:1px solid #ccc;padding:10px;">Thuê theo ngày</td>
                <td style="border:1px solid #ccc;padding:10px;">Liên hệ</td>
              </tr>
            </tbody>
          </table>
        `,
        isHot: false,
        showOnHome: true,
        sortOrder: 4,
        active: true,
      },
    ];

    await setDoc(doc(db, "car_service_pages", "main"), servicePage);

    for (const item of carPosts) {
      await setDoc(doc(db, "car_posts", item.id), item);
    }

    return NextResponse.json({
      success: true,
      message: "Đã seed dữ liệu xe du lịch thành công.",
      totalPosts: carPosts.length,
    });
  } catch (error: any) {
    console.error("seed-xe-data error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Seed dữ liệu thất bại",
      },
      { status: 500 }
    );
  }
}