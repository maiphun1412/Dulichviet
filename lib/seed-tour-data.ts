export type SeedItineraryDay = {
  day: string;
  title: string;
  meals: string;
  content: string;
};

export type SeedDeparture = {
  id: number;
  date: string;
  airline: string;
  price: string;
  seats: string;
  status: "Liên hệ" | "Book";
};

export type SeedRelatedTour = {
  id: number;
  title: string;
  image: string;
  departure: string;
  slug: string;
};

export type SeedTour = {
  slug: string;
  title: string;
  image: string;
  picture?: string;
  departure: string;
  duration: string;
  date: string;
  seats: number;
  price: string;
  countdown: string;
  section: string;
  active: boolean;
  category: string;
  featured?: boolean;
  order?: number;

  code: string;
  departureDates: string;
  transport: string;
  startFrom: string;
  overviewText: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  departures: SeedDeparture[];
  relatedTours: SeedRelatedTour[];
  itinerary: SeedItineraryDay[];
};

export const seedTours: SeedTour[] = [
  {
    slug: "chau-au-mua-xuan-10n9d-phap-thuy-si-y",
    title: "CHÂU ÂU MÙA XUÂN 10N9Đ TOWER | PHÁP - THỤY SĨ - Ý",
    picture: "/trangchu/tour/tour-du-lich-phap-mua-xuan-du-lich-viet.webp",
    image: "/trangchu/tour/tour-du-lich-phap-mua-xuan-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "10 ngày 9 đêm",
    date: "27/04/2026",
    seats: 5,
    price: "74,990,000 đ",
    countdown: "Còn 11 ngày 12:27:48",
    section: "tour-gio-chot",
    active: true,
    category: "international",
    featured: true,
    order: 1,

    code: "EU109D01",
    departureDates: "27/04/2026; 15/05/2026; 02/06/2026; 18/06/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Hành trình Châu Âu mùa xuân 10 ngày 9 đêm đưa du khách khám phá những thành phố nổi tiếng và cảnh quan lãng mạn bậc nhất châu Âu qua ba quốc gia Pháp, Thụy Sĩ và Ý. Chuyến đi kết hợp giữa vẻ đẹp hiện đại, cổ kính, văn hóa, ẩm thực và thiên nhiên hùng vĩ, phù hợp với những ai muốn trải nghiệm một hành trình châu Âu trọn vẹn và đáng nhớ.",
    highlights: [
      "Check-in Paris hoa lệ với các biểu tượng nổi tiếng",
      "Khám phá Thụy Sĩ với phong cảnh núi non và hồ nước tuyệt đẹp",
      "Trải nghiệm không gian cổ kính, lãng mạn tại Ý",
      "Thưởng thức ẩm thực đặc trưng của châu Âu",
      "Hành trình dài ngày với lịch trình tối ưu và nhiều điểm đến nổi bật",
    ],
    includes: [
      "Vé máy bay khứ hồi theo đoàn",
      "Khách sạn tiêu chuẩn quốc tế",
      "Ăn uống theo chương trình",
      "Xe đưa đón tham quan suốt tuyến",
      "Vé vào cổng các điểm theo lịch trình",
      "Hướng dẫn viên tiếng Việt theo đoàn",
      "Bảo hiểm du lịch",
    ],
    excludes: [
      "Chi phí cá nhân ngoài chương trình",
      "Tiền tip cho HDV và tài xế",
      "Phí hộ chiếu, visa cá nhân",
      "Phụ thu phòng đơn",
      "Các chi phí không nêu trong mục bao gồm",
    ],
    notes: [
      "Quý khách cần hộ chiếu còn hạn tối thiểu 6 tháng.",
      "Lịch trình có thể thay đổi tùy điều kiện thời tiết, giao thông hoặc hãng bay.",
      "Giá tour có thể thay đổi theo thời điểm xuất vé.",
    ],
    departures: [
      {
        id: 1,
        date: "27/04/2026",
        airline: "Bay Turkish Airlines",
        price: "74,990,000đ",
        seats: "Còn 5 chỗ",
        status: "Book",
      },
      {
        id: 2,
        date: "15/05/2026",
        airline: "Bay Turkish Airlines",
        price: "74,990,000đ",
        seats: "Còn 4 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR CHÂU ÂU 9N8Đ | PHÁP - BỈ - HÀ LAN",
        image: "/trangchu/tour/tour-du-lich-phap-mua-xuan-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "chau-au-9n8d-phap-bi-ha-lan",
      },
      {
        id: 2,
        title: "TOUR THỤY SĨ - Ý 8N7Đ",
        image: "/trangchu/tour/tour-du-lich-phap-mua-xuan-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "thuy-si-y-8n7d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - PARIS",
        meals: "Ăn trên máy bay",
        content:
          "Quý khách tập trung tại sân bay quốc tế Tân Sơn Nhất, làm thủ tục đáp chuyến bay đi Paris. Nghỉ đêm trên máy bay.",
      },
      {
        day: "NGÀY 2",
        title: "PARIS",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đến Paris, đoàn tham quan các công trình nổi tiếng, trải nghiệm không khí lãng mạn của thủ đô nước Pháp.",
      },
      {
        day: "NGÀY 3",
        title: "PARIS - THỤY SĨ",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn rời Paris, tiếp tục hành trình sang Thụy Sĩ, ngắm nhìn phong cảnh tuyệt đẹp trên đường đi.",
      },
    ],
  },

  {
    slug: "dai-loan-le-30-4-dai-dong-cao-hung-dai-nam-5n4d",
    title: "ĐÀI LOAN TOUR LỄ 30/4 | ĐÀI ĐÔNG - CAO HÙNG - ĐÀI NAM (5N4Đ)",
    picture: "/trangchu/tour/tour-dai-loan-dai-dong-du-lich-viet.webp",
    image: "/trangchu/tour/tour-dai-loan-dai-dong-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "5 ngày 4 đêm",
    date: "29/04/2026",
    seats: 0,
    price: "12,999,000 đ",
    countdown: "Còn 13 ngày 12:27:48",
    section: "tour-gio-chot",
    active: true,
    category: "international",
    featured: true,
    order: 2,

    code: "TW304",
    departureDates: "29/04/2026; 15/05/2026; 05/06/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Hành trình Đài Loan đưa du khách khám phá vẻ đẹp đa dạng của Đài Đông, Cao Hùng và Đài Nam với sự kết hợp giữa cảnh đẹp thiên nhiên, công trình hiện đại và nét văn hóa truyền thống đặc sắc. Đây là lựa chọn phù hợp cho chuyến đi nghỉ lễ với chi phí hợp lý và nhiều trải nghiệm đáng giá.",
    highlights: [
      "Tham quan các thành phố nổi bật của Đài Loan",
      "Khám phá ẩm thực đường phố đặc sắc",
      "Check-in nhiều địa điểm nổi tiếng tại Cao Hùng và Đài Nam",
      "Mua sắm quà lưu niệm đa dạng",
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn tiêu chuẩn",
      "Các bữa ăn theo chương trình",
      "Xe du lịch đưa đón",
      "HDV tiếng Việt",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Tiền tip",
      "Chi phí ngoài chương trình",
    ],
    notes: [
      "Vui lòng chuẩn bị đầy đủ giấy tờ tùy thân.",
      "Lịch bay có thể thay đổi tùy hãng hàng không.",
    ],
    departures: [
      {
        id: 1,
        date: "29/04/2026",
        airline: "Bay Vietjet Air",
        price: "12,999,000đ",
        seats: "Hết chỗ",
        status: "Liên hệ",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR ĐÀI LOAN CAO HÙNG - ĐÀI BẮC 5N4Đ",
        image: "/trangchu/tour/tour-dai-loan-dai-dong-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "dai-loan-cao-hung-dai-bac-5n4d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - CAO HÙNG",
        meals: "Tối",
        content:
          "Quý khách làm thủ tục bay sang Đài Loan, đến nơi xe đón đoàn dùng bữa và nhận phòng nghỉ ngơi.",
      },
      {
        day: "NGÀY 2",
        title: "CAO HÙNG - ĐÀI NAM",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn tham quan các thắng cảnh nổi bật, trải nghiệm văn hóa và ẩm thực Đài Loan.",
      },
    ],
  },

  {
    slug: "trung-quoc-mua-he-6n5d-thuong-hai-tay-o-tran-hang-chau",
    title: "TRUNG QUỐC MÙA HÈ 6N5Đ TOWER | THƯỢNG HẢI - TÂY Ô TRẤN - HÀNG CHÂU",
    picture: "/trangchu/tour/tour-du-lich-trung-quoc-bac-kinh-mua-he-du-lich-viet.webp",
    image: "/trangchu/tour/tour-du-lich-trung-quoc-bac-kinh-mua-he-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "6 ngày 5 đêm",
    date: "05/05/2026",
    seats: 10,
    price: "23,499,000 đ",
    countdown: "Còn 19 ngày 07:56:21",
    section: "tour-gio-chot",
    active: true,
    category: "international",
    featured: true,
    order: 3,

    code: "CN6N5D01",
    departureDates: "05/05/2026; 18/05/2026; 01/06/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Hành trình Trung Quốc mùa hè 6 ngày 5 đêm đưa du khách đến với Thượng Hải hiện đại, Tây Ô Trấn thơ mộng và Hàng Châu thanh bình. Đây là chuyến đi kết hợp giữa cảnh quan, văn hóa, kiến trúc và đời sống đặc sắc của vùng Giang Nam nổi tiếng.",
    highlights: [
      "Khám phá Thượng Hải hiện đại và sôi động",
      "Tham quan Tây Ô Trấn cổ kính",
      "Ngắm cảnh đẹp thơ mộng tại Hàng Châu",
      "Thưởng thức ẩm thực Trung Hoa đặc sắc",
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn tiêu chuẩn",
      "Ăn uống theo lịch trình",
      "Xe du lịch và vé tham quan",
      "HDV theo đoàn",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Tiền tip HDV và tài xế",
      "Các khoản phát sinh ngoài chương trình",
    ],
    notes: [
      "Mang theo giấy tờ tùy thân hợp lệ.",
      "Lịch trình có thể thay đổi theo thực tế.",
    ],
    departures: [
      {
        id: 1,
        date: "05/05/2026",
        airline: "Bay China Eastern",
        price: "23,499,000đ",
        seats: "Còn 10 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR THƯỢNG HẢI - BẮC KINH 6N5Đ",
        image: "/trangchu/tour/tour-du-lich-trung-quoc-bac-kinh-mua-he-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "thuong-hai-bac-kinh-6n5d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - THƯỢNG HẢI",
        meals: "Tối",
        content:
          "Đoàn khởi hành đi Thượng Hải, nhận phòng và nghỉ ngơi, khám phá thành phố về đêm.",
      },
      {
        day: "NGÀY 2",
        title: "THƯỢNG HẢI - TÂY Ô TRẤN",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn tham quan những địa danh nổi tiếng, sau đó di chuyển đến Tây Ô Trấn.",
      },
    ],
  },

  {
    slug: "nhat-ban-mua-he-5n5d-osaka-kyoto-yamanashi-fuji-tokyo",
    title: "NHẬT BẢN MÙA HÈ 5N5Đ TOUR | OSAKA - KYOTO - YAMANASHI - FUJI - TOKYO",
    picture: "/trangchu/tour/tour-du-lich-nhat-ban-mua-he-du-lich-viet.webp",
    image: "/trangchu/tour/tour-du-lich-nhat-ban-mua-he-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "5 ngày 5 đêm",
    date: "28/05/2026",
    seats: 10,
    price: "29,999,000 đ",
    countdown: "Còn 42 ngày 07:56:21",
    section: "tour-gio-chot",
    active: true,
    category: "international",
    featured: true,
    order: 4,

    code: "JP5N5D01",
    departureDates: "28/05/2026; 12/06/2026; 24/06/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Hành trình Nhật Bản mùa hè đưa du khách khám phá Osaka, Kyoto, Yamanashi, Fuji và Tokyo với nhiều điểm đến nổi tiếng, văn hóa đặc sắc và khung cảnh tuyệt đẹp. Chuyến đi phù hợp cho khách yêu thích xứ sở hoa anh đào và trải nghiệm hiện đại xen lẫn truyền thống.",
    highlights: [
      "Check-in Núi Phú Sĩ biểu tượng Nhật Bản",
      "Khám phá Osaka, Kyoto và Tokyo",
      "Trải nghiệm văn hóa truyền thống Nhật Bản",
      "Thưởng thức ẩm thực Nhật đặc sắc",
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn tiêu chuẩn",
      "Ăn uống theo chương trình",
      "Xe đưa đón và vé tham quan",
      "HDV theo đoàn",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Tip HDV và tài xế",
      "Các chi phí không nêu trong chương trình",
    ],
    notes: [
      "Quý khách cần chuẩn bị hồ sơ cá nhân đầy đủ.",
      "Lịch trình có thể thay đổi tùy thời tiết và tình hình thực tế.",
    ],
    departures: [
      {
        id: 1,
        date: "28/05/2026",
        airline: "Bay Vietjet Air",
        price: "29,999,000đ",
        seats: "Còn 10 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR NHẬT BẢN 6N5Đ | TOKYO - KYOTO - OSAKA",
        image: "/trangchu/tour/tour-du-lich-nhat-ban-mua-he-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "nhat-ban-6n5d-tokyo-kyoto-osaka",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - OSAKA",
        meals: "Nghỉ đêm trên máy bay",
        content:
          "Quý khách tập trung tại sân bay, làm thủ tục khởi hành đi Osaka. Nghỉ đêm trên máy bay.",
      },
      {
        day: "NGÀY 2",
        title: "OSAKA - KYOTO",
        meals: "Sáng/Trưa/Tối",
        content:
          "Đoàn tham quan các điểm nổi bật tại Osaka và Kyoto, trải nghiệm không khí đặc trưng của Nhật Bản.",
      },
    ],
  },

  {
    slug: "my-tho-ben-tre-cu-lao-thoi-son-con-phung",
    title: "MỸ THO - BẾN TRE CÙ LAO THỚI SƠN - CỒN PHỤNG",
    image: "/trangchu/tour/tham-quan-khu-du-lich-cu-lao-thoi-son-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "1 ngày 0 đêm",
    date: "16/04/2026",
    seats: 10,
    price: "590,000 đ",
    countdown: "Ưu đãi hôm nay",
    section: "tour-trong-nuoc",
    active: true,
    category: "domestic",
    featured: true,
    order: 1,

    code: "MTBT01",
    departureDates: "16/04/2026; 20/04/2026; 28/04/2026; 05/05/2026",
    transport: "Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Tour Mỹ Tho - Bến Tre - Cù Lao Thới Sơn - Cồn Phụng mang đến cho du khách trải nghiệm miền Tây sông nước chân thực với ghe xuồng, vườn trái cây, ẩm thực dân dã và không khí bình yên của vùng đồng bằng Nam Bộ.",
    highlights: [
      "Ngồi xuồng ba lá khám phá kênh rạch miền Tây",
      "Thưởng thức trái cây theo mùa",
      "Nghe đờn ca tài tử Nam Bộ",
      "Tham quan lò kẹo dừa truyền thống",
    ],
    includes: [
      "Xe du lịch đưa đón",
      "Ăn trưa theo chương trình",
      "Vé tham quan",
      "HDV theo đoàn",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Nước uống ngoài chương trình",
    ],
    notes: [
      "Nên mang giày dép dễ di chuyển.",
      "Lịch trình có thể thay đổi tùy điều kiện thời tiết.",
    ],
    departures: [
      {
        id: 1,
        date: "16/04/2026",
        airline: "Đi xe du lịch",
        price: "590,000đ",
        seats: "Còn 10 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR MIỀN TÂY 1 NGÀY | CẦN THƠ - CHỢ NỔI",
        image: "/trangchu/tour/tham-quan-khu-du-lich-cu-lao-thoi-son-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "mien-tay-1-ngay-can-tho-cho-noi",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - MỸ THO - BẾN TRE",
        meals: "Trưa",
        content:
          "Khởi hành từ TP.HCM đến Mỹ Tho, tham quan chùa Vĩnh Tràng, ngồi thuyền trên sông Tiền, đến Cù Lao Thới Sơn thưởng thức trái cây, nghe đờn ca tài tử, ghé Bến Tre tham quan lò kẹo dừa và trở về TP.HCM trong ngày.",
      },
    ],
  },

  {
    slug: "phan-thiet-kham-pha-dao-phu-quy-thien-duong",
    title: "PHAN THIẾT TOUR - KHÁM PHÁ ĐẢO PHÚ QUÝ - THIÊN ĐƯỜNG",
    picture: "/trangchu/tour/du-lich-dao-phu-quy-gia-tot-du-lich-viet.webp",
    image: "/trangchu/tour/du-lich-dao-phu-quy-gia-tot-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "3 ngày 2 đêm",
    date: "22/04/2026",
    seats: 10,
    price: "4,350,000 đ",
    countdown: "Hot tour",
    section: "tour-trong-nuoc",
    active: true,
    category: "domestic",
    featured: true,
    order: 2,

    code: "PQ3N2D",
    departureDates: "22/04/2026; 03/05/2026; 18/05/2026",
    transport: "Xe du lịch, Tàu cao tốc",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Hành trình Phan Thiết - đảo Phú Quý mang đến trải nghiệm biển đảo trong lành, phong cảnh đẹp, ẩm thực tươi ngon và nhịp sống yên bình. Đây là lựa chọn lý tưởng cho kỳ nghỉ ngắn ngày thư giãn.",
    highlights: [
      "Khám phá đảo Phú Quý hoang sơ",
      "Thưởng thức hải sản tươi ngon",
      "Check-in nhiều bãi biển đẹp",
      "Trải nghiệm tàu cao tốc ra đảo",
    ],
    includes: [
      "Xe du lịch",
      "Vé tàu khứ hồi",
      "Khách sạn",
      "Ăn uống theo chương trình",
      "HDV",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Chi phí phát sinh ngoài chương trình",
    ],
    notes: [
      "Nên mang theo kem chống nắng và đồ đi biển.",
      "Lịch trình biển đảo phụ thuộc thời tiết và tàu chạy.",
    ],
    departures: [
      {
        id: 1,
        date: "22/04/2026",
        airline: "Đi xe + tàu cao tốc",
        price: "4,350,000đ",
        seats: "Còn 10 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR NHA TRANG - BÌNH BA 3N2Đ",
        image: "/trangchu/tour/du-lich-dao-phu-quy-gia-tot-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "nha-trang-binh-ba-3n2d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - PHAN THIẾT - PHÚ QUÝ",
        meals: "Sáng/Trưa/Tối",
        content:
          "Khởi hành đi Phan Thiết, làm thủ tục lên tàu ra đảo Phú Quý, nhận phòng và nghỉ ngơi.",
      },
      {
        day: "NGÀY 2",
        title: "KHÁM PHÁ ĐẢO PHÚ QUÝ",
        meals: "Sáng/Trưa/Tối",
        content:
          "Tham quan các bãi biển đẹp, trải nghiệm cảnh quan hoang sơ, thưởng thức đặc sản địa phương.",
      },
    ],
  },

  {
    slug: "tour-da-nang-mua-he-5n4d-ba-na-hoi-an-hue-dong",
    title: "TOUR ĐÀ NẴNG MÙA HÈ 5N4Đ | BÀ NÀ - HỘI AN - HUẾ - ĐỘNG",
    image: "/trangchu/tour/tour-du-lich-da-nang-cay-cau-rong-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "5 ngày 4 đêm",
    date: "06/05/2026",
    seats: 10,
    price: "8,799,000 đ",
    countdown: "Khuyến mãi",
    section: "tour-trong-nuoc",
    active: true,
    category: "domestic",
    featured: true,
    order: 3,

    code: "DN5N4D01",
    departureDates: "06/05/2026; 15/05/2026; 27/05/2026; 10/06/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Tour Đà Nẵng mùa hè 5 ngày 4 đêm đưa du khách khám phá những điểm nổi bật nhất miền Trung như Bà Nà, Hội An, Huế và các danh thắng nổi tiếng. Hành trình phù hợp cho gia đình, nhóm bạn và khách yêu thích nghỉ dưỡng kết hợp tham quan.",
    highlights: [
      "Tham quan Bà Nà Hills nổi tiếng",
      "Dạo phố cổ Hội An lung linh",
      "Khám phá cố đô Huế",
      "Trải nghiệm ẩm thực miền Trung",
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn tiêu chuẩn",
      "Xe du lịch đưa đón",
      "Ăn uống theo chương trình",
      "HDV",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Tip tài xế và HDV",
    ],
    notes: [
      "Mang theo giấy tờ cá nhân đầy đủ.",
      "Lịch trình có thể điều chỉnh theo điều kiện thực tế.",
    ],
    departures: [
      {
        id: 1,
        date: "06/05/2026",
        airline: "Bay Vietjet Air",
        price: "8,799,000đ",
        seats: "Còn 10 chỗ",
        status: "Book",
      },
      {
        id: 2,
        date: "15/05/2026",
        airline: "Bay Vietjet Air",
        price: "8,799,000đ",
        seats: "Còn 5 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR HUẾ - ĐÀ NẴNG - HỘI AN 4N3Đ",
        image: "/trangchu/tour/tour-du-lich-da-nang-cay-cau-rong-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "hue-da-nang-hoi-an-4n3d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - ĐÀ NẴNG",
        meals: "Tối",
        content:
          "Quý khách bay đến Đà Nẵng, nhận phòng khách sạn, tự do khám phá thành phố biển.",
      },
      {
        day: "NGÀY 2",
        title: "BÀ NÀ - HỘI AN",
        meals: "Sáng/Trưa/Tối",
        content:
          "Tham quan Bà Nà Hills, chiều khởi hành đi Hội An, dạo phố cổ và thưởng thức đặc sản.",
      },
      {
        day: "NGÀY 3",
        title: "HUẾ",
        meals: "Sáng/Trưa/Tối",
        content:
          "Tham quan Đại Nội, chùa Thiên Mụ và các điểm nổi tiếng tại Huế.",
      },
    ],
  },

  {
    slug: "mien-bac-mua-he-5n4d-tam-chuc-ninh-binh-ha",
    title: "MIỀN BẮC MÙA HÈ 5N4Đ TOWER | TAM CHÚC - NINH BÌNH - HẠ",
    picture: "/trangchu/tour/tour-du-lich-tam-chuc-mua-he-du-lich-viet.webp ",
    image: "/trangchu/tour/tour-du-lich-tam-chuc-mua-he-du-lich-viet.webp",
    departure: "Từ Hồ Chí Minh",
    duration: "5 ngày 4 đêm",
    date: "18/04/2026",
    seats: 9,
    price: "12,399,000 đ",
    countdown: "Tour bán chạy",
    section: "tour-trong-nuoc",
    active: true,
    category: "domestic",
    featured: true,
    order: 4,

    code: "MB5N4D01",
    departureDates: "18/04/2026; 30/04/2026; 12/05/2026; 25/05/2026",
    transport: "Máy bay, Xe du lịch",
    startFrom: "Từ Hồ Chí Minh",
    overviewText:
      "Tour miền Bắc mùa hè đưa du khách khám phá vẻ đẹp tâm linh và thiên nhiên của Tam Chúc, Ninh Bình và vùng vịnh Hạ Long nổi tiếng. Hành trình hài hòa giữa nghỉ dưỡng, tham quan và trải nghiệm văn hóa vùng Bắc Bộ.",
    highlights: [
      "Tham quan quần thể chùa Tam Chúc",
      "Khám phá Ninh Bình non nước hữu tình",
      "Ngắm vịnh Hạ Long nổi tiếng",
      "Trải nghiệm đặc sản miền Bắc",
    ],
    includes: [
      "Vé máy bay khứ hồi",
      "Khách sạn tiêu chuẩn",
      "Xe đưa đón",
      "Ăn theo chương trình",
      "HDV suốt tuyến",
    ],
    excludes: [
      "Chi phí cá nhân",
      "Các khoản ngoài chương trình",
    ],
    notes: [
      "Nên mang giày thể thao để thuận tiện di chuyển.",
      "Lịch trình có thể đổi thứ tự điểm tham quan.",
    ],
    departures: [
      {
        id: 1,
        date: "18/04/2026",
        airline: "Bay Vietjet Air",
        price: "12,399,000đ",
        seats: "Còn 9 chỗ",
        status: "Book",
      },
    ],
    relatedTours: [
      {
        id: 1,
        title: "TOUR HÀ NỘI - SAPA - HẠ LONG 5N4Đ",
        image: "/trangchu/tour/tour-du-lich-tam-chuc-mua-he-du-lich-viet.webp",
        departure: "Từ Hồ Chí Minh",
        slug: "ha-noi-sapa-ha-long-5n4d",
      },
    ],
    itinerary: [
      {
        day: "NGÀY 1",
        title: "TP.HCM - HÀ NỘI",
        meals: "Tối",
        content:
          "Đáp chuyến bay đi Hà Nội, xe đón đoàn dùng bữa và nghỉ ngơi.",
      },
      {
        day: "NGÀY 2",
        title: "TAM CHÚC - NINH BÌNH",
        meals: "Sáng/Trưa/Tối",
        content:
          "Tham quan chùa Tam Chúc, sau đó tiếp tục khám phá vẻ đẹp của Ninh Bình.",
      },
    ],
  },
];