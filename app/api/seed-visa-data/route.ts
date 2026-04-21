import { NextResponse } from "next/server";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const batch = writeBatch(db);
    const colRef = collection(db, "visa_posts");
    const now = new Date().toISOString();

    const data = [
      {
        id: "visa-han-quoc",
        slug: "visa-han-quoc",
        title: "Visa Hàn Quốc",
        category: "Visa Châu Á",
        region: "asia",
        country: "Hàn Quốc",
        thumbnail:
          "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop",
        rating: 4.7,
        reviewCount: 74,
        viewCount: 23935,
        tagLabel: "Hot",
        excerpt: "Hồ sơ, thủ tục xin visa Hàn Quốc nhanh chóng, tỷ lệ đậu cao.",
        isHot: true,
        showOnHome: true,
        sortOrder: 1,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC CẦN THIẾT XIN VISA HÀN QUỐC</h2>
          <p><strong>Visa nhập cảnh 1 lần, thời gian lưu trú dưới 30 ngày, thời hạn sử dụng 3 tháng.</strong></p>

          <h3>I. GIẤY TỜ TÙY THÂN CÁ NHÂN</h3>
          <ul>
            <li>Hộ chiếu gốc còn hạn trên 6 tháng và còn trang trống.</li>
            <li>CMND/CCCD photo.</li>
            <li>02 ảnh 3.5x4.5 nền trắng, chụp không quá 6 tháng.</li>
            <li>Sổ hộ khẩu / xác nhận cư trú (nếu cần).</li>
            <li>Giấy đăng ký kết hôn hoặc giấy khai sinh của con nếu đi cùng gia đình.</li>
          </ul>

          <h3>II. HỒ SƠ CHỨNG MINH CÔNG VIỆC</h3>
          <ul>
            <li>Nhân viên: hợp đồng lao động, đơn xin nghỉ phép, sao kê lương 6 tháng.</li>
            <li>Chủ doanh nghiệp: giấy phép đăng ký kinh doanh, biên lai nộp thuế.</li>
            <li>Học sinh - sinh viên: thẻ học sinh/sinh viên, giấy xác nhận của trường.</li>
            <li>Người đã nghỉ hưu: thẻ hưu trí hoặc quyết định nghỉ hưu.</li>
          </ul>

          <h3>III. HỒ SƠ CHỨNG MINH TÀI CHÍNH</h3>
          <ul>
            <li>Sao kê tài khoản ngân hàng 6 tháng gần nhất.</li>
            <li>Sổ tiết kiệm hoặc giấy xác nhận số dư.</li>
            <li>Giấy tờ sở hữu nhà đất, ô tô, cổ phiếu... nếu có.</li>
          </ul>

          <h3>IV. LƯU Ý</h3>
          <ul>
            <li>Thời gian xét duyệt thông thường từ 9 ngày làm việc.</li>
            <li>Tùy hồ sơ, lãnh sự quán có thể yêu cầu bổ sung giấy tờ.</li>
            <li>Tất cả giấy tờ nên chuẩn bị rõ ràng, thống nhất thông tin cá nhân.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-trung-quoc",
        slug: "visa-trung-quoc",
        title: "Visa Trung Quốc",
        category: "Visa Châu Á",
        region: "asia",
        country: "Trung Quốc",
        thumbnail:
          "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop",
        rating: 4.5,
        reviewCount: 52,
        viewCount: 18000,
        tagLabel: "",
        excerpt: "Dịch vụ visa Trung Quốc nhanh, hỗ trợ hồ sơ rõ ràng, dễ theo dõi.",
        isHot: false,
        showOnHome: true,
        sortOrder: 2,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA TRUNG QUỐC</h2>
          <p>Visa Trung Quốc phù hợp cho nhu cầu du lịch, thăm thân và công tác ngắn hạn.</p>
          <ul>
            <li>Hộ chiếu còn hạn trên 6 tháng.</li>
            <li>Ảnh thẻ nền trắng đúng chuẩn.</li>
            <li>CMND/CCCD photo.</li>
            <li>Lịch trình chuyến đi hoặc xác nhận đặt vé máy bay, khách sạn.</li>
            <li>Chứng minh công việc và tài chính theo từng trường hợp.</li>
          </ul>
          <p>Thời gian xử lý thông thường từ 5 đến 7 ngày làm việc.</p>
        `,
        updatedAt: now,
      },
      {
        id: "visa-dai-loan",
        slug: "visa-dai-loan",
        title: "Visa Đài Loan",
        category: "Visa Châu Á",
        region: "asia",
        country: "Đài Loan",
        thumbnail:
          "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=1200&auto=format&fit=crop",
        rating: 4.6,
        reviewCount: 60,
        viewCount: 21000,
        tagLabel: "",
        excerpt: "Visa Đài Loan dễ đậu, hỗ trợ hồ sơ chi tiết cho du lịch và công tác.",
        isHot: false,
        showOnHome: true,
        sortOrder: 3,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA ĐÀI LOAN</h2>
          <p>Hồ sơ visa Đài Loan tương đối rõ ràng, phù hợp cho khách đi du lịch hoặc công tác ngắn ngày.</p>
          <ul>
            <li>Hộ chiếu gốc còn hạn.</li>
            <li>Ảnh 4x6 nền trắng.</li>
            <li>CMND/CCCD và hộ khẩu photo.</li>
            <li>Chứng minh công việc hiện tại.</li>
            <li>Chứng minh tài chính cơ bản nếu được yêu cầu.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-hong-kong",
        slug: "visa-hong-kong",
        title: "Visa Hong Kong",
        category: "Visa Châu Á",
        region: "asia",
        country: "Hong Kong",
        thumbnail:
          "https://images.unsplash.com/photo-1506970845246-18f21d533b20?q=80&w=1200&auto=format&fit=crop",
        rating: 4.4,
        reviewCount: 41,
        viewCount: 15500,
        tagLabel: "",
        excerpt: "Dịch vụ visa Hong Kong hỗ trợ chuẩn bị hồ sơ và theo dõi tiến độ.",
        isHot: false,
        showOnHome: true,
        sortOrder: 4,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA HONG KONG</h2>
          <p>Visa Hong Kong cần hồ sơ cá nhân, lịch trình và thông tin chuyến đi rõ ràng.</p>
          <ul>
            <li>Hộ chiếu còn hạn trên 6 tháng.</li>
            <li>Ảnh thẻ theo chuẩn hồ sơ.</li>
            <li>Thông tin công việc và tài chính.</li>
            <li>Xác nhận đặt vé máy bay, khách sạn nếu có.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-nhat-ban",
        slug: "visa-nhat-ban",
        title: "Visa Nhật Bản",
        category: "Visa Châu Á",
        region: "asia",
        country: "Nhật Bản",
        thumbnail:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
        rating: 4.8,
        reviewCount: 90,
        viewCount: 30000,
        tagLabel: "Hot",
        excerpt: "Visa Nhật Bản tỷ lệ đậu cao, hỗ trợ hồ sơ kỹ và theo dõi xuyên suốt.",
        isHot: true,
        showOnHome: true,
        sortOrder: 5,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA NHẬT BẢN</h2>
          <p>Visa Nhật Bản thường yêu cầu hồ sơ cá nhân, công việc và tài chính rõ ràng.</p>
          <ul>
            <li>Hộ chiếu gốc còn hạn.</li>
            <li>Ảnh thẻ đúng tiêu chuẩn.</li>
            <li>Giấy tờ chứng minh công việc.</li>
            <li>Sao kê tài khoản ngân hàng.</li>
            <li>Lịch trình tham quan tại Nhật Bản.</li>
          </ul>
          <p>Thời gian xử lý phổ biến khoảng 7 ngày làm việc.</p>
        `,
        updatedAt: now,
      },
      {
        id: "visa-my",
        slug: "visa-my",
        title: "Visa Mỹ",
        category: "Visa Âu - Úc - Mỹ",
        region: "america",
        country: "Mỹ",
        thumbnail:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
        rating: 4.9,
        reviewCount: 120,
        viewCount: 50000,
        tagLabel: "Hot",
        excerpt: "Visa Mỹ cần phỏng vấn, hỗ trợ chuẩn bị hồ sơ và luyện phỏng vấn kỹ.",
        isHot: true,
        showOnHome: true,
        sortOrder: 6,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA MỸ</h2>
          <p>Visa Mỹ yêu cầu hồ sơ chặt chẽ và bắt buộc phỏng vấn theo lịch hẹn.</p>
          <ul>
            <li>Hộ chiếu gốc còn hạn.</li>
            <li>Ảnh visa Mỹ đúng chuẩn.</li>
            <li>Xác nhận đơn DS-160.</li>
            <li>Giấy hẹn phỏng vấn.</li>
            <li>Chứng minh công việc, tài chính, ràng buộc tại Việt Nam.</li>
          </ul>
          <p>Khách nên chuẩn bị kỹ phần trả lời phỏng vấn để tăng tỷ lệ đậu.</p>
        `,
        updatedAt: now,
      },
      {
        id: "visa-uc",
        slug: "visa-uc",
        title: "Visa Úc",
        category: "Visa Âu - Úc - Mỹ",
        region: "australia",
        country: "Úc",
        thumbnail:
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1200&auto=format&fit=crop",
        rating: 4.7,
        reviewCount: 65,
        viewCount: 22000,
        tagLabel: "",
        excerpt: "Visa Úc xử lý online, cần chứng minh tài chính và mục đích chuyến đi rõ ràng.",
        isHot: false,
        showOnHome: true,
        sortOrder: 7,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA ÚC</h2>
          <p>Visa Úc thường nộp online, hồ sơ cần sự thống nhất và rõ ràng.</p>
          <ul>
            <li>Hộ chiếu.</li>
            <li>Ảnh thẻ.</li>
            <li>Chứng minh công việc hiện tại.</li>
            <li>Chứng minh tài chính và lịch sử giao dịch ngân hàng.</li>
            <li>Lịch trình và thông tin chuyến đi.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-new-zealand",
        slug: "visa-new-zealand",
        title: "Visa New Zealand",
        category: "Visa Âu - Úc - Mỹ",
        region: "australia",
        country: "New Zealand",
        thumbnail:
          "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=1200&auto=format&fit=crop",
        rating: 4.5,
        reviewCount: 39,
        viewCount: 14200,
        tagLabel: "",
        excerpt: "Visa New Zealand hỗ trợ khách du lịch, thăm thân và công tác ngắn hạn.",
        isHot: false,
        showOnHome: true,
        sortOrder: 8,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA NEW ZEALAND</h2>
          <p>Hồ sơ visa New Zealand cần chứng minh mục đích chuyến đi và khả năng tài chính phù hợp.</p>
          <ul>
            <li>Hộ chiếu còn hạn.</li>
            <li>Ảnh thẻ.</li>
            <li>Hồ sơ nghề nghiệp.</li>
            <li>Sao kê ngân hàng và tài sản nếu có.</li>
            <li>Thông tin lịch trình lưu trú.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-canada",
        slug: "visa-canada",
        title: "Visa Canada",
        category: "Visa Âu - Úc - Mỹ",
        region: "america",
        country: "Canada",
        thumbnail:
          "https://images.unsplash.com/photo-1505765050516-f72dcac9c60d?q=80&w=1200&auto=format&fit=crop",
        rating: 4.6,
        reviewCount: 70,
        viewCount: 25000,
        tagLabel: "",
        excerpt: "Visa Canada hồ sơ rõ ràng, phù hợp du lịch, thăm thân và công tác.",
        isHot: false,
        showOnHome: true,
        sortOrder: 9,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA CANADA</h2>
          <p>Visa Canada hiện chủ yếu xử lý qua hồ sơ trực tuyến kết hợp sinh trắc học nếu cần.</p>
          <ul>
            <li>Hộ chiếu còn hạn.</li>
            <li>Ảnh hồ sơ theo chuẩn.</li>
            <li>Chứng minh công việc và thu nhập.</li>
            <li>Sao kê tài khoản và giấy tờ tài sản.</li>
            <li>Lịch trình chuyến đi hoặc thư mời nếu có.</li>
          </ul>
        `,
        updatedAt: now,
      },
      {
        id: "visa-anh",
        slug: "visa-anh",
        title: "Visa Anh (UK)",
        category: "Visa Âu - Úc - Mỹ",
        region: "europe",
        country: "Anh",
        thumbnail:
          "https://images.unsplash.com/photo-1473959383415-c63f0e0e3f8d?q=80&w=1200&auto=format&fit=crop",
        rating: 4.6,
        reviewCount: 58,
        viewCount: 20000,
        tagLabel: "",
        excerpt: "Visa Anh cần chuẩn bị hồ sơ kỹ, chứng minh công việc và tài chính rõ ràng.",
        isHot: false,
        showOnHome: true,
        sortOrder: 10,
        active: true,
        contentHtml: `
          <h2 style="color:#1565c0;">THỦ TỤC XIN VISA ANH</h2>
          <p>Visa Anh thường xét duyệt trong khoảng 15 ngày làm việc tùy thời điểm.</p>
          <ul>
            <li>Hộ chiếu gốc còn hạn.</li>
            <li>Ảnh hồ sơ nếu được yêu cầu.</li>
            <li>Giấy tờ công việc hiện tại.</li>
            <li>Sao kê ngân hàng và hồ sơ tài chính.</li>
            <li>Lịch trình chuyến đi và xác nhận lưu trú.</li>
          </ul>
        `,
        updatedAt: now,
      },
    ];

    data.forEach((item) => {
      const ref = doc(colRef, item.id);
      batch.set(ref, item);
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Seed visa_posts thành công 🚀",
      total: data.length,
    });
  } catch (err) {
    console.error("Lỗi seed visa_posts:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi seed data",
      },
      { status: 500 }
    );
  }
}