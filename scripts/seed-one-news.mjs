import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const article = {
  title: "Giá vé VietJet Air đi Tân Sơn Nhất giá rẻ",
  slug: "gia-ve-vietjet-air-di-tan-son-nhat-gia-re",
  category: "tin-tuc",
  subCategory: "ve-may-bay",
  image:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
  excerpt:
    "Bài viết cung cấp thông tin chi tiết về các chuyến bay của VietJet Air từ Hà Nội đến TP. HCM, bao gồm giá vé, quy định hành lý và những kinh nghiệm du lịch hữu ích cho chuyến đi đáng nhớ vào năm 2026.",
  publishedAt: "2026-04-01T03:33:00.000Z",
  views: 2785,
  rating: 0,
  totalRatings: 0,
  active: true,
  featured: true,
  content: `
    <p><strong>Vé máy bay đi TP. HCM</strong> – Thành phố Hồ Chí Minh, hay còn được biết đến với tên gọi Sài Gòn, là một trong những trung tâm kinh tế, văn hóa và du lịch sôi động bậc nhất Việt Nam. Với sự pha trộn hài hòa giữa nét cổ kính của kiến trúc Pháp thuộc và sự hiện đại của một đô thị phát triển, TP. HCM luôn là điểm đến thu hút hàng triệu du khách mỗi năm.</p>

    <p>Đặc biệt, việc di chuyển bằng đường hàng không từ Hà Nội đến TP. HCM đã trở nên vô cùng thuận tiện và nhanh chóng, với nhiều lựa chọn từ các hãng hàng không. Trong số đó, VietJet Air nổi bật là lựa chọn ưu tiên cho những ai tìm kiếm các chuyến bay với chi phí hợp lý và dịch vụ chất lượng.</p>

    <figure>
      <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop" alt="Chuyến bay VietJet Air đến TP. HCM" />
      <figcaption>Chuyến bay VietJet Air đến TP. HCM đang hạ cánh tại sân bay Tân Sơn Nhất.</figcaption>
    </figure>

    <h2>Thông tin chi tiết về chuyến bay VietJet Air từ Hà Nội đi TP. HCM năm 2026</h2>
    <p>VietJet Air tiếp tục khai thác mạnh mẽ đường bay từ sân bay quốc tế Nội Bài (Hà Nội) đến sân bay quốc tế Tân Sơn Nhất (TP. HCM). Hiện tại, hãng cung cấp trung bình khoảng 7-10 chuyến bay mỗi ngày, tùy thuộc vào mùa và nhu cầu thực tế, mang lại sự linh hoạt tối đa cho hành khách.</p>

    <p>Thời gian bay thẳng giữa hai thành phố lớn này thường là khoảng 2 giờ 00 phút, giúp bạn tiết kiệm thời gian di chuyển và nhanh chóng bắt đầu hành trình khám phá. Giá vé một chiều hạng phổ thông của VietJet Air thường dao động từ 900.000 VND đến 1.500.000 VND, chưa bao gồm thuế và phí.</p>

    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <thead>
        <tr>
          <th>Chuyến bay</th>
          <th>Khởi hành</th>
          <th>Thời gian</th>
          <th>Đến</th>
          <th>Thời gian</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>VJ8661</td>
          <td>Hà Nội</td>
          <td>08:40</td>
          <td>Hồ Chí Minh</td>
          <td>10:40</td>
        </tr>
      </tbody>
    </table>

    <h2>Quy định về hành lý và các loại phí của VietJet Air</h2>
    <p>Để có một chuyến bay thuận lợi và tránh những rắc rối không mong muốn, hành khách cần nắm rõ các quy định về hành lý và các loại phí của VietJet Air.</p>

    <h3>1. Các loại phí hoàn, đổi</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <thead>
        <tr>
          <th>Loại thay đổi</th>
          <th>Mức phí</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Phí thay đổi ngày/giờ bay</td>
          <td>250,000 VND</td>
        </tr>
        <tr>
          <td>Phí đổi tên</td>
          <td>250,000 VND</td>
        </tr>
        <tr>
          <td>Phí hoàn vé (bảo lưu)</td>
          <td>250,000 VND</td>
        </tr>
      </tbody>
    </table>

    <h3>2. Hành lý xách tay</h3>
    <ul>
      <li>Trọng lượng không quá 7kg đối với hạng vé Eco và Flexi.</li>
      <li>Đối với hạng vé SkyBoss, hành khách được phép mang theo 10kg hành lý xách tay.</li>
      <li>Kích thước tối đa: 56cm x 36cm x 23cm.</li>
    </ul>

    <h3>3. Hành lý ký gửi</h3>
    <ul>
      <li>Trọng lượng không quá 32kg cho mỗi kiện hành lý.</li>
      <li>Kích thước không quá: 119cm x 119cm x 81cm.</li>
      <li>Hành khách có thể mua hành lý trả trước theo các gói cước ưu đãi tại website, phòng vé, đại lý hoặc trung tâm phục vụ khách hàng.</li>
    </ul>

    <h2>Về VietJet Air – Hãng hàng không thế hệ mới và những đổi mới</h2>
    <p>VietJet Air là hãng hàng không tư nhân đầu tiên của Việt Nam được cấp phép bay trong nước và quốc tế. Hãng khai thác đội tàu bay mới và tân tiến nhất của Airbus, chủ yếu là các dòng A320 và A321, nổi tiếng về độ tin cậy, hiệu quả nhiên liệu và chi phí khai thác thấp.</p>

    <h3>Thông số kĩ thuật tàu bay A320</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <tbody>
        <tr><td>Trọng lượng cất cánh tối đa</td><td>77,000 kg / 171,700 lb</td></tr>
        <tr><td>Sải cánh</td><td>34,156m / 112,060 ft</td></tr>
        <tr><td>Tổng chiều dài</td><td>37,537 m / 123,271 ft</td></tr>
        <tr><td>Chiều cao</td><td>11m / 38,6 ft</td></tr>
        <tr><td>Chiều rộng khoang hành khách</td><td>3,950m / 12,9 ft</td></tr>
        <tr><td>Diện tích cánh</td><td>122,4 m2</td></tr>
        <tr><td>Tốc độ bay trung bình</td><td>0.84 Mach (905km/h)</td></tr>
        <tr><td>Sức chứa nhiên liệu tối đa</td><td>24,210 litres / 6,300 US gallons</td></tr>
        <tr><td>Tầm bay khi đầy tải</td><td>4,800 km / 2,600 nautical miles</td></tr>
        <tr><td>Công suất đẩy tối đa</td><td>27,000 lbs</td></tr>
        <tr><td>Động cơ</td><td>CFM 56-5B4</td></tr>
      </tbody>
    </table>

    <h2>Kinh nghiệm đặt vé và du lịch TP. HCM hiệu quả</h2>
    <p>Để có chuyến du lịch TP.HCM tiết kiệm và thoải mái nhất, việc đặt vé máy bay và lên kế hoạch chi tiết là vô cùng quan trọng. Bạn nên đặt vé trước ít nhất 1-3 tháng để có được mức giá tốt nhất, đặc biệt nếu bạn có ý định đi vào mùa cao điểm hoặc các dịp lễ lớn.</p>

    <p>Tóm lại, việc đặt vé máy bay VietJet Air đến TP. HCM là một lựa chọn tuyệt vời cho những ai muốn khám phá thành phố sôi động này. Với thông tin chi tiết về chuyến bay, quy định hành lý và những kinh nghiệm du lịch hữu ích được chia sẻ, hy vọng bạn sẽ có một hành trình đáng nhớ và đầy trải nghiệm tại Sài Gòn hoa lệ.</p>
  `,
  relatedNews: [
    "turkish-airlines-hang-hang-khong-hang-dau-chau-au",
    "co-nen-mua-ve-may-bay-truoc-khi-xin-visa",
    "luu-y-khi-dat-ve-may-bay-online",
    "cac-cach-thanh-toan-ve-may-bay-nhanh-chong"
  ],
  contact: {
    facebook: "facebook.com/vemaybaygiare.dulichviet",
    email: "phongve@dulichviet.com.vn",
  },
};

async function seedOneNews() {
  try {
    await db.collection("news_posts").doc(article.slug).set(article, { merge: true });
    console.log(`✅ Seeded: ${article.title}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi seed bài viết:", error);
    process.exit(1);
  }
}

seedOneNews();