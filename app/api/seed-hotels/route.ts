import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const hotels = [
      {
        id: "centara-mirage-mui-ne",
        slug: "centara-mirage-mui-ne",
        name: "Centara Mirage Resort Mũi Né",
        city: "Phan Thiết",
        area: "Mũi Né",
        addressText: "Huỳnh Thúc Kháng, Mũi Né, Phan Thiết, Bình Thuận",
        thumbnail:
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 2366672,
        ratingScore: 8.7,
        ratingText: "Xuất sắc",
        reviewCount: 5247,
        contactText: "",
        amenities: [
          "Nhận phòng trễ",
          "Bữa sáng",
          "Nước uống chào đón",
          "Wifi miễn phí",
          "Hồ bơi",
        ],
        shortDescription:
          "Centara Mirage Resort Mũi Né là khu nghỉ dưỡng nổi bật tại Phan Thiết với phong cách kiến trúc Địa Trung Hải, không gian rộng thoáng, phù hợp cho gia đình và khách yêu thích nghỉ dưỡng ven biển.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<h3>VỊ TRÍ</h3>
<p>Centara Mirage Resort Mũi Né tọa lạc tại khu vực Mũi Né, một trong những điểm đến du lịch biển nổi tiếng nhất của Phan Thiết. Từ khách sạn, du khách có thể dễ dàng kết nối đến các địa điểm tham quan quen thuộc như đồi cát bay, làng chài Mũi Né, suối Tiên và nhiều nhà hàng hải sản địa phương. Vị trí này đặc biệt phù hợp cho khách muốn kết hợp giữa nghỉ dưỡng và khám phá văn hóa, ẩm thực của khu vực biển Bình Thuận.</p>
<p>Khu nghỉ dưỡng được thiết kế theo phong cách hiện đại pha chút màu sắc Địa Trung Hải, tạo nên không gian vừa sang trọng vừa tươi sáng. Với lợi thế nằm gần biển và có khuôn viên rộng, nơi đây mang đến cảm giác thư giãn, thoải mái cho khách đi gia đình, cặp đôi hoặc nhóm bạn. Không gian chung được đầu tư bài bản với hồ bơi lớn, khu vui chơi trẻ em, khu ẩm thực và nhiều góc check-in ấn tượng.</p>
<p>Centara Mirage Resort Mũi Né là lựa chọn phù hợp cho những chuyến đi cần sự cân bằng giữa tiện nghi, nghỉ ngơi và trải nghiệm. Du khách có thể vừa tận hưởng dịch vụ lưu trú chất lượng cao vừa dễ dàng di chuyển đến các khu vui chơi, địa điểm chụp ảnh và khu vực trung tâm của thành phố Phan Thiết.</p>
`,
        hotelDetailHtml: `
<p>Hệ thống phòng nghỉ tại Centara Mirage Resort Mũi Né được thiết kế đồng bộ, hiện đại và tập trung vào sự tiện nghi cho khách lưu trú. Các hạng phòng có diện tích hợp lý, màu sắc trẻ trung, nhiều phòng có hướng nhìn đẹp ra khuôn viên hoặc khu vực hồ bơi, mang đến cảm giác thư giãn trong suốt kỳ nghỉ.</p>
<p>Phòng nghỉ được trang bị đầy đủ các tiện ích cơ bản như giường ngủ chất lượng tốt, máy lạnh, TV, minibar, phòng tắm riêng, bàn làm việc và một số tiện ích hỗ trợ khác tùy theo hạng phòng. Một số hạng phòng phù hợp với gia đình nhỏ hoặc nhóm khách cần không gian rộng hơn trong thời gian lưu trú.</p>
<p>Ngoài khu phòng, khách sạn còn có hệ thống hồ bơi, khu vui chơi trẻ em, nhà hàng phục vụ ẩm thực đa dạng, dịch vụ hỗ trợ khách và nhiều hoạt động thư giãn phù hợp cho khách nghỉ dưỡng. Đây là điểm cộng lớn cho những ai muốn chọn một nơi ở vừa đẹp vừa có nhiều tiện ích trong nội khu.</p>
`,
        policyNotesHtml: `
<p><strong>CHÍNH SÁCH LƯU TRÚ</strong></p>
<ul>
  <li>Giờ nhận phòng áp dụng từ 14:00 và giờ trả phòng trước 12:00 theo quy định chung của khách sạn.</li>
  <li>Nhận phòng sớm hoặc trả phòng muộn sẽ được hỗ trợ tùy theo tình trạng phòng thực tế và có thể áp dụng phụ phí.</li>
  <li>Giá phòng có thể thay đổi vào cuối tuần, lễ tết hoặc các giai đoạn cao điểm du lịch.</li>
  <li>Phụ thu trẻ em, người lớn ở thêm hoặc giường phụ được áp dụng theo chính sách của từng hạng phòng.</li>
</ul>
<p><strong>CHÍNH SÁCH ĐỔI / HỦY</strong></p>
<ul>
  <li>Miễn phí hủy nếu báo trước theo đúng điều kiện của gói giá.</li>
  <li>Các booking ưu đãi có thể không hoàn hủy hoặc hạn chế thay đổi thông tin.</li>
  <li>Khách nên kiểm tra kỹ điều kiện booking trước khi thanh toán.</li>
</ul>
`,
        noteHtml: `
<p>Thông tin phòng nghỉ, tiện ích và chính sách tại Centara Mirage Resort Mũi Né có thể được điều chỉnh theo tình hình vận hành thực tế của khách sạn trong từng thời điểm.</p>
<p>Một số hình ảnh chỉ mang tính chất minh họa cho hạng phòng hoặc không gian tổng thể. Để đảm bảo trải nghiệm phù hợp nhất, khách nên kiểm tra kỹ thông tin trước khi xác nhận đặt dịch vụ.</p>
`,
        rooms: [
          {
            id: "cmmn-room-1",
            name: "Phòng Deluxe 2 Giường",
            image:
              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
            shortName: "Phòng tiêu chuẩn phù hợp cho 2 khách.",
            areaText: "Diện tích khoảng 42m2.",
            bedText: "02 giường đơn.",
            guestText: "Tối đa 02 người lớn.",
            childPolicyText: "Trẻ em phụ thu theo chính sách khách sạn.",
            priceLabel: "Giá phòng",
            prices: {
              bb: "2,366,672 VND",
              bbvs: "2,950,000 VND",
              fb: "3,650,000 VND",
              fbvs: "4,250,000 VND",
            },
          },
        ],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [
            {
              label: "Người lớn có giường phụ",
              bb: "850,000",
              bbvs: "1,050,000",
              fb: "1,250,000",
              fbvs: "1,450,000",
            },
            {
              label: "Trẻ em có giường phụ",
              bb: "550,000",
              bbvs: "750,000",
              fb: "950,000",
              fbvs: "1,150,000",
            },
          ],
        },
        checkInOutPolicy: [
          "Nhận phòng từ 14:00, trả phòng trước 12:00.",
          "Nhận sớm hoặc trả muộn tùy tình trạng phòng thực tế.",
        ],
        cancelPolicy: [
          "Hủy trước 07 ngày: miễn phí.",
          "Hủy trước 03 ngày: tính 50% đêm đầu tiên.",
          "Hủy trong ngày hoặc không đến: tính 100% booking.",
        ],
        otherPolicy: [
          "Khách vui lòng mang theo giấy tờ tùy thân hợp lệ khi nhận phòng.",
          "Một số dịch vụ có thể thay đổi theo thời điểm vận hành thực tế.",
        ],
        relatedHotels: [
          {
            id: "the-anam-mui-ne",
            name: "The Anam Mũi Né",
            image:
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
            priceFrom: 6744935,
            stars: 5,
          },
          {
            id: "resort-lang-tre-mui-ne",
            name: "Resort Làng Tre Mũi Né",
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
            priceFrom: 2470992,
            stars: 4,
          },
        ],
        isPromotion: true,
        isFeatured: true,
      },

      {
        id: "the-anam-mui-ne",
        slug: "the-anam-mui-ne",
        name: "The Anam Mũi Né",
        city: "Phan Thiết",
        area: "Mũi Né",
        addressText: "Nguyễn Đình Chiểu, Mũi Né, Phan Thiết, Bình Thuận",
        thumbnail:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 6744935,
        ratingScore: 9.4,
        ratingText: "Trên cả tuyệt vời",
        reviewCount: 1196,
        contactText: "",
        amenities: ["Bữa sáng", "Bãi đậu xe", "Giỏ trái cây", "Nước uống chào đón"],
        shortDescription:
          "The Anam Mũi Né là lựa chọn nghỉ dưỡng cao cấp dành cho khách yêu thích sự sang trọng, yên tĩnh và không gian riêng tư ven biển.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<h3>TỔNG QUAN</h3>
<p>The Anam Mũi Né sở hữu vị trí ven biển thuận lợi, kiến trúc thanh lịch và không gian nghỉ dưỡng đậm chất sang trọng. Khách sạn phù hợp với khách đi nghỉ cặp đôi, honeymoon, khách gia đình nhỏ hoặc khách muốn trải nghiệm dịch vụ cao cấp tại Phan Thiết.</p>
<p>Không gian nơi đây được thiết kế tinh tế, nhiều mảng xanh, hồ bơi đẹp và khu vực thư giãn riêng tư. Du khách có thể vừa tận hưởng không khí biển vừa dễ dàng di chuyển đến các điểm vui chơi lân cận.</p>
`,
        hotelDetailHtml: `
<p>Khách sạn có hệ thống phòng nghỉ được đầu tư chỉn chu, nội thất đẹp, nhiều hạng phòng có hướng nhìn thoáng. Ngoài ra còn có nhà hàng, quầy bar, dịch vụ thư giãn và các tiện ích hỗ trợ khách trong suốt thời gian lưu trú.</p>
`,
        policyNotesHtml: `
<p><strong>Chính sách chung:</strong> Nhận phòng từ 14:00, trả phòng trước 12:00. Giá phòng thay đổi theo thời điểm đặt, cuối tuần và lễ tết.</p>
<ul>
  <li>Phụ thu trẻ em áp dụng theo từng hạng phòng.</li>
  <li>Booking ưu đãi có thể không hoàn hủy.</li>
</ul>
`,
        noteHtml: `
<p>Khách nên kiểm tra kỹ hạng phòng, quyền lợi bữa sáng và các dịch vụ đi kèm trước khi xác nhận đặt chỗ.</p>
`,
        rooms: [
          {
            id: "anam-room-1",
            name: "Phòng Hai Giường Đơn",
            image:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
            shortName: "Phòng nghỉ hiện đại, ấm cúng.",
            areaText: "Diện tích khoảng 40m2.",
            bedText: "02 giường đơn.",
            guestText: "Tối đa 02 người lớn.",
            childPolicyText: "Trẻ em phụ thu theo quy định.",
            priceLabel: "Giá phòng",
            prices: {
              bb: "6,744,935 VND",
              bbvs: "7,250,000 VND",
              fb: "8,150,000 VND",
              fbvs: "8,850,000 VND",
            },
          },
        ],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: ["Nhận phòng 14:00 - Trả phòng 12:00."],
        cancelPolicy: ["Áp dụng theo từng gói đặt phòng."],
        otherPolicy: ["Một số dịch vụ có thể thay đổi theo thời điểm."],
        relatedHotels: [],
        isPromotion: true,
        isFeatured: true,
      },

      {
        id: "dalat-wonder-resort",
        slug: "dalat-wonder-resort",
        name: "Dalat Wonder Resort",
        city: "Đà Lạt",
        area: "Hồ Tuyền Lâm",
        addressText: "Hồ Tuyền Lâm, Đà Lạt, Lâm Đồng",
        thumbnail:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 4,
        priceFrom: 1850000,
        ratingScore: 8.5,
        ratingText: "Xuất sắc",
        reviewCount: 3200,
        contactText: "",
        amenities: ["Bữa sáng", "View hồ", "Wifi miễn phí", "Khuôn viên rộng"],
        shortDescription:
          "Dalat Wonder Resort là điểm nghỉ dưỡng phù hợp cho khách yêu thích không khí trong lành, view thiên nhiên và sự yên tĩnh của Đà Lạt.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<h3>VỊ TRÍ</h3>
<p>Dalat Wonder Resort nằm trong khu vực Hồ Tuyền Lâm, sở hữu không gian yên tĩnh, mát mẻ và cảnh quan đặc trưng của Đà Lạt. Đây là lựa chọn phù hợp cho khách nghỉ dưỡng, cặp đôi và gia đình muốn tìm nơi lưu trú gần thiên nhiên.</p>
<p>Khách sạn mang đến cảm giác nhẹ nhàng, thư giãn với khuôn viên xanh, lối đi thoáng và kiến trúc hài hòa với cảnh quan xung quanh. Từ đây, du khách có thể thuận tiện di chuyển đến một số điểm tham quan nổi tiếng của Đà Lạt.</p>
`,
        hotelDetailHtml: `
<p>Phòng nghỉ tại Dalat Wonder Resort được thiết kế ấm cúng, sử dụng tông màu nhẹ, có nhiều hạng phòng phù hợp cho khách cá nhân, cặp đôi hoặc gia đình nhỏ. Một số phòng có hướng nhìn ra hồ hoặc khuôn viên xanh, tạo cảm giác thoải mái trong suốt thời gian lưu trú.</p>
`,
        policyNotesHtml: `
<p><strong>Chính sách lưu trú:</strong> Nhận phòng từ 14:00, trả phòng trước 12:00. Hủy trước 05 ngày miễn phí, sau thời điểm này áp dụng phụ phí theo booking.</p>
`,
        noteHtml: `
<p>Thời tiết Đà Lạt có thể lạnh về đêm, khách nên chuẩn bị thêm áo ấm khi lưu trú dài ngày.</p>
`,
        rooms: [
          {
            id: "dalat-room-1",
            name: "Phòng Deluxe View Hồ",
            image:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
            shortName: "Phòng phù hợp cho kỳ nghỉ thư giãn.",
            areaText: "Diện tích khoảng 35m2.",
            bedText: "01 giường đôi lớn.",
            guestText: "Tối đa 02 người lớn.",
            childPolicyText: "Phụ thu trẻ em áp dụng theo chính sách.",
            priceLabel: "Giá phòng",
            prices: {
              bb: "1,850,000 VND",
              bbvs: "2,150,000 VND",
              fb: "2,650,000 VND",
              fbvs: "2,950,000 VND",
            },
          },
        ],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: ["Nhận phòng 14:00 - Trả phòng 12:00."],
        cancelPolicy: ["Hủy trước 05 ngày miễn phí."],
        otherPolicy: ["Khách vui lòng mang giấy tờ tùy thân khi nhận phòng."],
        relatedHotels: [],
        isPromotion: false,
        isFeatured: true,
      },

      {
        id: "vinpearl-resort-spa-phu-quoc",
        slug: "vinpearl-resort-spa-phu-quoc",
        name: "Vinpearl Resort & Spa Phú Quốc",
        city: "Phú Quốc",
        area: "Gành Dầu",
        addressText: "Gành Dầu, Phú Quốc, Kiên Giang",
        thumbnail:
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c3?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c3?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 4500000,
        ratingScore: 9.0,
        ratingText: "Trên cả tuyệt vời",
        reviewCount: 6100,
        contactText: "",
        amenities: ["Bữa sáng", "Bãi biển riêng", "Spa", "Golf", "Hồ bơi"],
        shortDescription:
          "Vinpearl Resort & Spa Phú Quốc là khu nghỉ dưỡng 5 sao phù hợp cho khách yêu thích không gian sang trọng, tiện nghi đồng bộ và trải nghiệm nghỉ dưỡng cao cấp.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<h3>VỊ TRÍ</h3>
<p>Vinpearl Resort &amp; Spa Phú Quốc tọa lạc tại khu vực Gành Dầu, một trong những điểm đến nổi bật ở phía Bắc đảo Phú Quốc. Khu nghỉ dưỡng có vị trí thuận tiện để kết hợp tham quan, vui chơi và nghỉ dưỡng trong quần thể dịch vụ lớn.</p>
<p>Không gian nơi đây mang phong cách cao cấp, rộng rãi và riêng tư, phù hợp với khách đi gia đình, khách đoàn hoặc cặp đôi muốn tận hưởng kỳ nghỉ trọn vẹn tại đảo ngọc.</p>
`,
        hotelDetailHtml: `
<p>Khách sạn có hệ thống phòng nghỉ, nhà hàng, hồ bơi, khu spa và nhiều dịch vụ hỗ trợ khách lưu trú. Các hạng phòng được bố trí tiện nghi, phù hợp với kỳ nghỉ ngắn ngày lẫn dài ngày.</p>
`,
        policyNotesHtml: `
<p><strong>Chính sách chung:</strong> Giá phòng thay đổi theo mùa, cuối tuần và các chương trình ưu đãi. Nhận phòng từ 14:00, trả phòng trước 12:00.</p>
`,
        noteHtml: `
<p>Khách nên kiểm tra kỹ quyền lợi đi kèm, dịch vụ đưa đón và các điều kiện áp dụng theo từng gói booking.</p>
`,
        rooms: [
          {
            id: "pq-room-1",
            name: "Phòng Deluxe Hướng Vườn",
            image:
              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
            shortName: "Phòng nghỉ sang trọng, thoáng mát.",
            areaText: "Diện tích khoảng 42m2.",
            bedText: "01 giường lớn hoặc 02 giường nhỏ.",
            guestText: "Tối đa 02 người lớn.",
            childPolicyText: "Trẻ em phụ thu theo chính sách khách sạn.",
            priceLabel: "Giá phòng",
            prices: {
              bb: "4,500,000 VND",
              bbvs: "5,200,000 VND",
              fb: "6,200,000 VND",
              fbvs: "7,100,000 VND",
            },
          },
        ],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: ["Nhận phòng 14:00 - Trả phòng 12:00."],
        cancelPolicy: ["Điều kiện hủy phụ thuộc vào gói giá."],
        otherPolicy: ["Một số dịch vụ vận hành theo khung giờ quy định."],
        relatedHotels: [],
        isPromotion: true,
        isFeatured: true,
      },

      {
        id: "vinpearl-resort-golf-phu-quoc",
        slug: "vinpearl-resort-golf-phu-quoc",
        name: "Vinpearl Resort & Golf Phú Quốc",
        city: "Phú Quốc",
        area: "Gành Dầu",
        addressText: "Khu Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang",
        thumbnail:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 4150000,
        ratingScore: 8.9,
        ratingText: "Xuất sắc",
        reviewCount: 4200,
        contactText: "",
        amenities: ["Bữa sáng", "Sân golf", "Wifi miễn phí", "Bãi biển riêng"],
        shortDescription:
          "Vinpearl Resort & Golf Phú Quốc là điểm nghỉ dưỡng phù hợp cho khách muốn kết hợp giữa nghỉ dưỡng và trải nghiệm sân golf đẳng cấp.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<p>Khách sạn sở hữu vị trí đẹp tại khu vực Bãi Dài, phù hợp cho những kỳ nghỉ cao cấp và các chuyến đi gia đình, nhóm bạn hoặc khách doanh nhân cần không gian thư giãn.</p>
`,
        hotelDetailHtml: `
<p>Không gian lưu trú rộng rãi, thiết kế sang trọng, nhiều tiện ích phục vụ nghỉ dưỡng dài ngày. Đây là lựa chọn phù hợp cho khách yêu thích sự riêng tư và dịch vụ đồng bộ.</p>
`,
        policyNotesHtml: `
<p>Giá phòng và chính sách thay đổi theo gói dịch vụ. Các booking ưu đãi có thể có điều kiện hạn chế hoàn hủy.</p>
`,
        noteHtml: `
<p>Khách nên đặt sớm vào giai đoạn cao điểm để giữ được giá tốt và hạng phòng phù hợp.</p>
`,
        rooms: [
          {
            id: "pq-golf-room-1",
            name: "Phòng Deluxe Hướng Vườn",
            image:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
            shortName: "Phòng 01 giường lớn hoặc 02 giường nhỏ.",
            areaText: "Diện tích khoảng 42m2.",
            bedText: "Hướng vườn.",
            guestText: "Tối đa 02 người lớn.",
            childPolicyText: "Trẻ em phụ thu theo quy định.",
            priceLabel: "Giá phòng",
            prices: {
              bb: "4,150,000 VND",
              bbvs: "4,850,000 VND",
              fb: "5,850,000 VND",
              fbvs: "6,750,000 VND",
            },
          },
        ],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: ["Nhận phòng 14:00 - Trả phòng 12:00."],
        cancelPolicy: ["Điều kiện hủy theo booking thực tế."],
        otherPolicy: ["Khách vui lòng kiểm tra quyền lợi đi kèm trước khi đặt."],
        relatedHotels: [],
        isPromotion: false,
        isFeatured: true,
      },

      {
        id: "furama-resort-da-nang",
        slug: "furama-resort-da-nang",
        name: "Furama Resort Đà Nẵng",
        city: "Đà Nẵng",
        area: "Ngũ Hành Sơn",
        addressText: "Ngũ Hành Sơn, Đà Nẵng",
        thumbnail:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 3200000,
        ratingScore: 8.8,
        ratingText: "Xuất sắc",
        reviewCount: 4800,
        contactText: "",
        amenities: ["Bãi biển", "Spa", "Gym", "Bữa sáng"],
        shortDescription:
          "Furama Resort Đà Nẵng là một trong những khu nghỉ dưỡng nổi bật ven biển, phù hợp cho cả kỳ nghỉ gia đình và chuyến đi thư giãn cao cấp.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<p>Furama Resort Đà Nẵng nằm ở vị trí thuận lợi gần biển, phù hợp với khách cần không gian nghỉ dưỡng cao cấp và dễ kết nối đến trung tâm thành phố cũng như các điểm tham quan nổi tiếng.</p>
`,
        hotelDetailHtml: `
<p>Khách sạn có phòng nghỉ rộng rãi, hồ bơi đẹp, nhà hàng và dịch vụ thư giãn đa dạng. Đây là lựa chọn phù hợp cho khách lưu trú ngắn ngày lẫn dài ngày.</p>
`,
        policyNotesHtml: `
<p>Giá phòng thay đổi theo từng thời điểm và chương trình ưu đãi. Nhận phòng 14:00, trả phòng 12:00.</p>
`,
        noteHtml: `
<p>Nên đặt sớm vào mùa du lịch và cuối tuần để giữ phòng đẹp hơn.</p>
`,
        rooms: [],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: [],
        cancelPolicy: [],
        otherPolicy: [],
        relatedHotels: [],
        isPromotion: false,
        isFeatured: true,
      },

      {
        id: "vinpearl-condotel-riverfront-da-nang",
        slug: "vinpearl-condotel-riverfront-da-nang",
        name: "Vinpearl Condotel Riverfront Đà Nẵng",
        city: "Đà Nẵng",
        area: "Hải Châu",
        addressText: "Sông Hàn, Đà Nẵng",
        thumbnail:
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 2400000,
        ratingScore: 8.6,
        ratingText: "Xuất sắc",
        reviewCount: 2750,
        contactText: "",
        amenities: ["Bữa sáng", "Wifi miễn phí", "Hồ bơi"],
        shortDescription:
          "Vinpearl Condotel Riverfront Đà Nẵng là lựa chọn phù hợp cho khách muốn ở gần trung tâm, thuận tiện di chuyển và vẫn đảm bảo chất lượng lưu trú.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `<p>Khách sạn nằm gần khu vực trung tâm Đà Nẵng, phù hợp với cả khách công tác lẫn khách du lịch.</p>`,
        hotelDetailHtml: `<p>Phòng nghỉ hiện đại, tiện nghi, phù hợp cho kỳ nghỉ ngắn ngày hoặc lưu trú kết hợp công việc.</p>`,
        policyNotesHtml: `<p>Giá và điều kiện đặt phòng thay đổi theo thời điểm.</p>`,
        noteHtml: `<p>Khách nên kiểm tra kỹ loại phòng và quyền lợi trước khi đặt.</p>`,
        rooms: [],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: [],
        cancelPolicy: [],
        otherPolicy: [],
        relatedHotels: [],
        isPromotion: true,
        isFeatured: true,
      },

      {
        id: "the-imperial-vung-tau",
        slug: "the-imperial-vung-tau",
        name: "The Imperial Vũng Tàu",
        city: "Vũng Tàu",
        area: "Bãi Sau",
        addressText: "Bãi Sau, Vũng Tàu, Bà Rịa - Vũng Tàu",
        thumbnail:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 5,
        priceFrom: 2500000,
        ratingScore: 8.6,
        ratingText: "Xuất sắc",
        reviewCount: 3900,
        contactText: "",
        amenities: ["Bãi biển riêng", "Buffet", "Gym", "Hồ bơi"],
        shortDescription:
          "The Imperial Vũng Tàu là khách sạn mang phong cách cổ điển châu Âu, phù hợp cho khách nghỉ cuối tuần hoặc kỳ nghỉ ngắn ngày gần biển.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `
<p>The Imperial Vũng Tàu nằm ngay khu vực Bãi Sau, thuận tiện cho khách muốn nghỉ gần biển và tận hưởng không gian lưu trú sang trọng. Đây là lựa chọn phù hợp cho khách gia đình, cặp đôi và nhóm bạn đi nghỉ cuối tuần.</p>
`,
        hotelDetailHtml: `
<p>Khách sạn có phòng nghỉ rộng rãi, view đẹp, nhiều tiện ích như hồ bơi, nhà hàng, phòng gym và khu vực thư giãn. Không gian thiết kế theo phong cách sang trọng, tạo cảm giác chỉn chu và thoải mái.</p>
`,
        policyNotesHtml: `
<p>Nhận phòng từ 14:00, trả phòng trước 12:00. Giá phòng có thể thay đổi theo cuối tuần, lễ tết hoặc các chương trình ưu đãi.</p>
`,
        noteHtml: `
<p>Đây là khách sạn phù hợp cho các chuyến nghỉ ngắn ngày từ TP.HCM hoặc các tỉnh lân cận.</p>
`,
        rooms: [],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: [],
        cancelPolicy: [],
        otherPolicy: [],
        relatedHotels: [],
        isPromotion: true,
        isFeatured: true,
      },

      {
        id: "marina-bay-vung-tau-resort",
        slug: "marina-bay-vung-tau-resort",
        name: "Marina Bay Vũng Tàu Resort",
        city: "Vũng Tàu",
        area: "Bãi Dâu",
        addressText: "Bãi Dâu, Vũng Tàu, Bà Rịa - Vũng Tàu",
        thumbnail:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop",
        heroImages: [
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop",
        ],
        stars: 4,
        priceFrom: 2100000,
        ratingScore: 8.4,
        ratingText: "Xuất sắc",
        reviewCount: 2100,
        contactText: "",
        amenities: ["Hồ bơi", "Bữa sáng", "Wifi miễn phí"],
        shortDescription:
          "Marina Bay Vũng Tàu Resort là lựa chọn phù hợp cho khách muốn nghỉ dưỡng gần biển, không gian thoáng và mức giá dễ tiếp cận hơn.",
        tabs: {
          overview: "Tổng quan",
          detail: "Chi tiết khách sạn",
          policy: "Chính sách",
          note: "Ghi chú",
        },
        overviewHtml: `<p>Marina Bay Vũng Tàu Resort phù hợp cho kỳ nghỉ thư giãn cuối tuần với không gian gần biển và dịch vụ lưu trú ổn định.</p>`,
        hotelDetailHtml: `<p>Khách sạn có hệ thống phòng nghỉ gọn gàng, thoáng sáng và đủ tiện nghi cơ bản cho kỳ nghỉ ngắn ngày.</p>`,
        policyNotesHtml: `<p>Giá thay đổi theo ngày trong tuần và thời điểm đặt phòng.</p>`,
        noteHtml: `<p>Phù hợp cho khách gia đình nhỏ hoặc nhóm bạn muốn nghỉ ngắn ngày.</p>`,
        rooms: [],
        extraGuestPolicy: {
          appliedFrom: "01/01/2026",
          appliedTo: "31/12/2026",
          rows: [],
        },
        checkInOutPolicy: [],
        cancelPolicy: [],
        otherPolicy: [],
        relatedHotels: [],
        isPromotion: false,
        isFeatured: true,
      },
    ];

    for (const hotel of hotels) {
      await setDoc(doc(db, "hotel_items", hotel.slug), hotel);
    }

    return NextResponse.json({
      ok: true,
      message: "Seed khách sạn thành công",
      total: hotels.length,
      ids: hotels.map((hotel) => hotel.slug),
    });
  } catch (error) {
    console.error("SEED HOTELS ERROR:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Seed khách sạn thất bại",
      },
      { status: 500 }
    );
  }
}