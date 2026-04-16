export type ItineraryDay = {
  day: string;
  title: string;
  meals: string;
  content: string;
};

export type DepartureItem = {
  id: number;
  date: string;
  airline: string;
  price: string;
  seats: string;
  status: "Liên hệ" | "Book";
};

export type RelatedTour = {
  id: number;
  title: string;
  image: string;
  departure: string;
};

export type TourDetail = {
  slug: string;
  title: string;
  breadcrumb: string[];
  image: string;
  code: string;
  duration: string;
  departureDates: string;
  transport: string;
  startFrom: string;
  price: string;
  overviewTitle: string;
  overviewText: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  notes: string[];
  departures: DepartureItem[];
  relatedTours: RelatedTour[];
};

export const tourDetailMock: TourDetail[] = [
  {
    slug: "tour-lao-mua-he-5n4d-vieng-chan-luang-prabang-vang-vieng",
    title: "TOUR LÀO MÙA HÈ 5N4Đ | VIÊNG CHĂN - LUANG PRABANG - VANG VIÊNG",
    breadcrumb: [
      "Trang Chủ",
      "Loại Hình Du Lịch",
      "TOUR LÀO MÙA HÈ 5N4Đ | VIÊNG CHĂN - LUANG PRABANG - VANG VIÊNG",
    ],
    image: "/trangchu/ct-lao-main.jpg",
    code: "19198",
    duration: "5 ngày 4 đêm",
    departureDates:
      "01,13,22,27/05; 05,10,19,24/06; 03,08,17,22,31/07; 12,24/08; 09,11,23,25/09; 07,09,21,23,28/10; 04,06,18,20/11; 04,16,18,25/12/2026",
    transport: "Xe du lịch, Máy bay",
    startFrom: "Từ Hồ Chí Minh",
    price: "12,990,000 đ",
    overviewTitle: "Điểm nhấn hành trình",
    overviewText:
      "Khám phá vẻ đẹp hiền hòa của đất nước Triệu Voi trong hành trình Tour Lào mùa hè 5N4Đ, đưa du khách ghé thăm những điểm đến nổi bật nhất như Viêng Chăn thanh bình, Luang Prabang cổ kính - di sản văn hóa thế giới, và Vang Viêng thơ mộng với núi non, sông suối hữu tình. Chuyến đi mang đến trải nghiệm trọn vẹn từ văn hóa, tâm linh đến thiên nhiên trong lành, là lựa chọn lý tưởng cho kỳ nghỉ hè thư giãn và đầy cảm xúc.",
    highlights: [
      "Thưởng thức các món ăn đặc trưng của Đất nước Lào",
      "Tham quan Thác Kuang Si – Được đánh giá là thác đẹp nhất nước Lào",
      "Đi thuyền trên sông Mekong",
      "Viếng thăm Chùa Mẹ Si Mương – ngôi chùa linh thiêng nhất tại Thủ đô Viêng Chăn",
      "Trải nghiệm tàu cao tốc",
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM – VIÊNG CHĂN",
        meals: "Ăn Tối",
        content:
          "HDV đón Quý khách tại sân bay quốc tế Tân Sơn Nhất làm thủ tục đáp chuyến bay đi Viêng Chăn. Xe và HDV địa phương đón đoàn tại sân bay Wattay, về khách sạn nhận phòng. Quý khách ăn tối tại nhà hàng, nhận phòng khách sạn nghỉ ngơi. Đoàn tự do khám phá khu phố Tây hoặc Chợ đêm tại thủ đô Viêng Chăn. Nghỉ đêm tại Viêng Chăn.",
      },
      {
        day: "NGÀY 2",
        title: "VIÊNG CHĂN – VĂNG VIÊNG",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn dùng bữa sáng, khởi hành đi Văng Viêng. Trên đường ngắm cảnh thiên nhiên thanh bình của đất nước Lào. Đến nơi, tham quan và nghỉ ngơi, dùng bữa trưa và tiếp tục khám phá những điểm đến nổi bật trong khu vực.",
      },
      {
        day: "NGÀY 3",
        title: "VĂNG VIÊNG – LUANG PRABANG",
        meals: "Sáng/Trưa/Tối",
        content:
          "Quý khách dùng bữa sáng, trả phòng và tiếp tục hành trình đến Luang Prabang. Tham quan thành phố cổ, chùa chiền nổi tiếng và các điểm văn hóa đặc sắc. Dùng bữa tối và nghỉ đêm.",
      },
      {
        day: "NGÀY 4",
        title: "LUANG PRABANG – VIÊNG CHĂN",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn tham quan các địa danh nổi bật tại Luang Prabang như thác Kuang Si, chùa cổ và khu phố di sản. Sau đó quay lại Viêng Chăn bằng phương tiện phù hợp theo lịch trình.",
      },
      {
        day: "NGÀY 5",
        title: "VIÊNG CHĂN – TP.HCM",
        meals: "Sáng/Trưa",
        content:
          "Dùng bữa sáng, làm thủ tục trả phòng. Xe đưa đoàn ra sân bay đáp chuyến bay về TP.HCM. Kết thúc chương trình, HDV chia tay và hẹn gặp lại Quý khách.",
      },
    ],
    includes: [
      "Vé máy bay khứ hồi theo đoàn",
      "Khách sạn tiêu chuẩn theo chương trình",
      "Các bữa ăn theo lịch trình",
      "Xe tham quan máy lạnh suốt tuyến",
      "Vé tham quan các điểm có trong chương trình",
      "HDV tiếng Việt theo đoàn",
      "Bảo hiểm du lịch",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Điện thoại, giặt ủi, nước uống ngoài chương trình",
      "Tiền tip cho HDV và tài xế",
      "Phụ thu phòng đơn",
      "Các chi phí không có trong mục bao gồm",
    ],
    notes: [
      "Lịch trình có thể thay đổi tùy điều kiện thực tế nhưng vẫn đảm bảo đủ điểm tham quan chính.",
      "Quý khách cần hộ chiếu còn hạn tối thiểu 6 tháng tính đến ngày về.",
      "Giá tour có thể thay đổi theo thời điểm đặt chỗ và tình trạng vé.",
    ],
    departures: [
      { id: 1, date: "13/05/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Hết chỗ", status: "Liên hệ" },
      { id: 2, date: "20/05/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Còn 2 chỗ", status: "Book" },
      { id: 3, date: "27/05/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Còn 5 chỗ", status: "Book" },
      { id: 4, date: "05/06/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Còn 5 chỗ", status: "Book" },
      { id: 5, date: "10/06/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Còn 5 chỗ", status: "Book" },
      { id: 6, date: "19/06/2026", airline: "Bay Vietjet Air", price: "12,990,000đ", seats: "Còn 5 chỗ", status: "Book" },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR LÀO MÙA XUÂN 5N4Đ | VIÊNG CHĂN - LUANG PRABANG",
        image: "/trangchu/related-lao-1.jpg",
        departure: "Từ Hồ Chí Minh",
      },
      {
        id: 2,
        title: "TOUR LÀO MÙA HÈ 5N4Đ | VIÊNG CHĂN - LUANG PRABANG",
        image: "/trangchu/related-lao-2.jpg",
        departure: "Từ Hồ Chí Minh",
      },
      {
        id: 3,
        title: "Du lịch liên tuyến Lào - Thái Lan - Campuchia từ Sài Gòn 2025",
        image: "/trangchu/related-lao-3.jpg",
        departure: "Từ Hồ Chí Minh",
      },
      {
        id: 4,
        title: "Du lịch Lễ 30/4 - Tour liên tuyến Lào - Thái Lan - Campuchia từ Sài Gòn",
        image: "/trangchu/related-lao-4.jpg",
        departure: "Từ Hồ Chí Minh",
      },
    ],
  },
];