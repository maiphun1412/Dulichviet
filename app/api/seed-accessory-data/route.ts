import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const accessoryProducts = [
      {
        id: "pisani-tatti-yg6044l-24-m-burgundy",
        title: "Pisani Tatti YG6044L_24 M Burgundy",
        slug: "pisani-tatti-yg6044l-24-m-burgundy",
        brand: "Pisani",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007568",
        stockStatus: "Còn hàng",
        price: 2590000,
        oldPrice: 3080000,
        discountPercent: 16,
        couponCode: "MBFDLV",
        couponPrice: 2201500,
        description:
          "Mua bán vali kéo du lịch thời trang Pisani Tatti YG6044L_24 M Burgundy size 20/24/28, vali xách tay, kí gửi, vali kéo nhựa cứng | Nhựa PC cao cấp.",
        shortDescription:
          "Vali kéo cao cấp thời trang, chống va đập tốt, bánh xe đôi xoay 360 độ.",
        colors: ["Burgundy"],
        sizes: ["Size M kí gửi (24 đến 26 inch)"],
        material: "Nhựa PC cao cấp",
        dimensions: "42 x 25 x 61 cm",
        capacity: "56L",
        wheels: "Bánh xe đôi",
        lock: "TSA",
        handle: "Dây kéo đôi",
        warranty: "Trọn đời",
        active: true,
        sortOrder: 1,
        mainImage:
          "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Pisani Tatti YG6044L_24 M Burgundy là dòng vali thời trang hiện đại, phù hợp cho cả công tác lẫn du lịch dài ngày.</p>
          <p>Thiết kế sang trọng với sắc Burgundy nổi bật, vỏ nhựa PC cao cấp giúp hạn chế trầy xước và tăng khả năng chịu lực khi di chuyển.</p>
          <p>Hệ thống bánh xe đôi xoay 360 độ, khóa TSA bảo mật và cần kéo chắc chắn giúp trải nghiệm sử dụng mượt mà hơn.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "Nhựa PC cao cấp" },
          { label: "Kích thước (DxRxC)", value: "42 x 25 x 61 cm" },
          { label: "Dung tích", value: "56L" },
          { label: "Bánh xe", value: "Bánh xe đôi" },
          { label: "Khóa", value: "TSA" },
          { label: "Dây kéo", value: "Dây kéo đôi" },
          { label: "Bảo hành", value: "Trọn đời" }
        ]
      },
      {
        id: "pisani-demili-ah0124-24-m-dark-blue",
        title: "Pisani Demili AH0124_24 M Dark Blue",
        slug: "pisani-demili-ah0124-24-m-dark-blue",
        brand: "Pisani",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007569",
        stockStatus: "Còn hàng",
        price: 1999000,
        oldPrice: 2980000,
        discountPercent: 33,
        couponCode: "MBFDLV",
        couponPrice: 1699150,
        description:
          "Vali kéo du lịch cỡ trung với gam xanh đậm thanh lịch, phù hợp cho những chuyến đi từ 3 đến 5 ngày.",
        shortDescription:
          "Vali cỡ M, gọn nhẹ, thiết kế chắc chắn, dễ phối hợp với nhiều phong cách.",
        colors: ["Dark Blue"],
        sizes: ["Size M kí gửi (24 đến 26 inch)"],
        material: "ABS + PC",
        dimensions: "41 x 24 x 60 cm",
        capacity: "54L",
        wheels: "Bánh xe xoay 360 độ",
        lock: "Khóa số TSA",
        handle: "Cần kéo hợp kim nhôm",
        warranty: "5 năm",
        active: true,
        sortOrder: 2,
        mainImage:
          "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Dòng vali Demili AH0124 phù hợp với khách hàng ưu tiên sự đơn giản, hiện đại và dễ sử dụng.</p>
          <p>Khung vali chắc chắn, bánh xe bền bỉ cùng trọng lượng hợp lý giúp di chuyển thuận tiện hơn trên nhiều địa hình.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "ABS + PC" },
          { label: "Kích thước (DxRxC)", value: "41 x 24 x 60 cm" },
          { label: "Dung tích", value: "54L" },
          { label: "Bánh xe", value: "Bánh xe xoay 360 độ" },
          { label: "Khóa", value: "Khóa số TSA" },
          { label: "Bảo hành", value: "5 năm" }
        ]
      },
      {
        id: "pisani-tatti-yg6044l-24-m-silver-gray",
        title: "Pisani Tatti YG6044L_24 M Silver Gray",
        slug: "pisani-tatti-yg6044l-24-m-silver-gray",
        brand: "Pisani",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007570",
        stockStatus: "Còn hàng",
        price: 2590000,
        oldPrice: 3080000,
        discountPercent: 16,
        couponCode: "MBFDLV",
        couponPrice: 2201500,
        description:
          "Phiên bản Silver Gray tinh tế, phù hợp cho khách hàng thích phong cách tối giản.",
        shortDescription:
          "Vali màu xám bạc hiện đại, chống va đập tốt, phù hợp du lịch và công tác.",
        colors: ["Silver Gray"],
        sizes: ["Size M kí gửi (24 đến 26 inch)"],
        material: "Nhựa PC cao cấp",
        dimensions: "42 x 25 x 61 cm",
        capacity: "56L",
        wheels: "Bánh xe đôi",
        lock: "TSA",
        handle: "Dây kéo đôi",
        warranty: "Trọn đời",
        active: true,
        sortOrder: 3,
        mainImage:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Silver Gray là một trong những tông màu được ưa chuộng nhờ vẻ ngoài sang trọng, dễ phối đồ và ít lộ vết bẩn.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "Nhựa PC cao cấp" },
          { label: "Kích thước (DxRxC)", value: "42 x 25 x 61 cm" },
          { label: "Dung tích", value: "56L" }
        ]
      },
      {
        id: "pisani-reito-yg086l-20-s-pink",
        title: "Pisani Reito YG086L_20 S Pink",
        slug: "pisani-reito-yg086l-20-s-pink",
        brand: "Pisani",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007571",
        stockStatus: "Còn hàng",
        price: 1990000,
        oldPrice: 2830000,
        discountPercent: 30,
        couponCode: "MBFDLV",
        couponPrice: 1691500,
        description:
          "Vali cabin màu hồng dịu nhẹ, thiết kế trẻ trung, phù hợp đi ngắn ngày hoặc xách tay lên máy bay.",
        shortDescription:
          "Nhỏ gọn, đáng yêu, thích hợp cho khách hàng nữ hoặc làm quà tặng.",
        colors: ["Pink"],
        sizes: ["Size S xách tay (20 inch)"],
        material: "Nhựa PP",
        dimensions: "36 x 23 x 55 cm",
        capacity: "36L",
        wheels: "Bánh xe đôi",
        lock: "Khóa số",
        handle: "Cần kéo nhôm",
        warranty: "3 năm",
        active: true,
        sortOrder: 4,
        mainImage:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Dòng Reito size S hướng đến nhu cầu di chuyển linh hoạt, dễ dàng mang theo trong cabin máy bay.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "Nhựa PP" },
          { label: "Kích thước (DxRxC)", value: "36 x 23 x 55 cm" },
          { label: "Dung tích", value: "36L" }
        ]
      },
      {
        id: "larita-rota-mg0324-20-s-pink",
        title: "Larita Rota MG0324_20 S Pink",
        slug: "larita-rota-mg0324-20-s-pink",
        brand: "Larita",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007572",
        stockStatus: "Còn hàng",
        price: 1499000,
        oldPrice: 1900000,
        discountPercent: 22,
        couponCode: "MBFDLV",
        couponPrice: 1299000,
        description:
          "Vali Larita màu hồng pastel nhẹ nhàng, thiết kế nữ tính và thân thiện với người dùng.",
        shortDescription:
          "Dòng vali xách tay gọn nhẹ, phù hợp cho chuyến đi 2 đến 3 ngày.",
        colors: ["Pink"],
        sizes: ["Size S xách tay (20 inch)"],
        material: "ABS",
        dimensions: "35 x 22 x 54 cm",
        capacity: "34L",
        wheels: "Bánh xe 360 độ",
        lock: "Khóa số",
        handle: "Cần kéo nhôm",
        warranty: "2 năm",
        active: true,
        sortOrder: 5,
        mainImage:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Larita Rota MG0324 mang phong cách nhẹ nhàng, thanh lịch, phù hợp với nhiều đối tượng người dùng.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "ABS" },
          { label: "Kích thước (DxRxC)", value: "35 x 22 x 54 cm" },
          { label: "Dung tích", value: "34L" }
        ]
      },
      {
        id: "heys-zen-28-l-black",
        title: "Heys Zen_28 L Black",
        slug: "heys-zen-28-l-black",
        brand: "Heys",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007573",
        stockStatus: "Còn hàng",
        price: 4290000,
        oldPrice: 5490000,
        discountPercent: 22,
        couponCode: "MBFDLV",
        couponPrice: 3990000,
        description:
          "Vali cỡ lớn màu đen dành cho những chuyến đi dài ngày, dung tích rộng rãi.",
        shortDescription:
          "Thiết kế mạnh mẽ, sang trọng, phù hợp khách hàng cần nhiều không gian chứa đồ.",
        colors: ["Black"],
        sizes: ["Size L kí gửi (28 inch)"],
        material: "PC chống trầy",
        dimensions: "48 x 30 x 75 cm",
        capacity: "90L",
        wheels: "Bánh đôi chịu lực",
        lock: "TSA",
        handle: "Cần kéo đôi",
        warranty: "5 năm",
        active: true,
        sortOrder: 6,
        mainImage:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `
          <p>Heys Zen size L phù hợp cho gia đình hoặc người đi công tác dài ngày cần khả năng chứa đồ lớn.</p>
        `,
        technicalSpecs: [
          { label: "Chất liệu", value: "PC chống trầy" },
          { label: "Kích thước (DxRxC)", value: "48 x 30 x 75 cm" },
          { label: "Dung tích", value: "90L" }
        ]
      },
      {
        id: "larita-lanca-ah0525-16-s-orange",
        title: "Larita Lanca AH0525_16 S Orange",
        slug: "larita-lanca-ah0525-16-s-orange",
        brand: "Larita",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007574",
        stockStatus: "Còn hàng",
        price: 799000,
        oldPrice: 999000,
        discountPercent: 20,
        couponCode: "MBFDLV",
        couponPrice: 699000,
        description:
          "Vali mini màu cam nổi bật, thích hợp cho trẻ trung, năng động, di chuyển ngắn ngày.",
        shortDescription:
          "Nhỏ gọn, bắt mắt, phù hợp xách tay hoặc dùng cá nhân.",
        colors: ["Orange"],
        sizes: ["Size mini 16 inch"],
        material: "ABS",
        dimensions: "30 x 20 x 45 cm",
        capacity: "22L",
        wheels: "Bánh xoay 360 độ",
        lock: "Khóa số",
        handle: "Cần kéo nhôm",
        warranty: "1 năm",
        active: true,
        sortOrder: 7,
        mainImage:
          "https://images.unsplash.com/photo-1614179689702-355944cd0918?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1614179689702-355944cd0918?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1614179689702-355944cd0918?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `<p>Larita Lanca là lựa chọn phù hợp cho các chuyến đi ngắn hoặc nhu cầu đựng đồ gọn nhẹ.</p>`,
        technicalSpecs: [
          { label: "Chất liệu", value: "ABS" },
          { label: "Kích thước (DxRxC)", value: "30 x 20 x 45 cm" },
          { label: "Dung tích", value: "22L" }
        ]
      },
      {
        id: "larita-yuno-ah0325-20-m-orange",
        title: "Larita Yuno AH0325_20 M Orange",
        slug: "larita-yuno-ah0325-20-m-orange",
        brand: "Larita",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007575",
        stockStatus: "Còn hàng",
        price: 1099000,
        oldPrice: 1490000,
        discountPercent: 8,
        couponCode: "MBFDLV",
        couponPrice: 1019150,
        description:
          "Vali Larita Yuno tông cam trẻ trung, phù hợp với người yêu thích phong cách năng động.",
        shortDescription:
          "Thiết kế đơn giản, tiện dụng, phù hợp cho du lịch cá nhân.",
        colors: ["Orange"],
        sizes: ["Size M 20 inch"],
        material: "ABS + PC",
        dimensions: "37 x 24 x 57 cm",
        capacity: "39L",
        wheels: "Bánh đôi",
        lock: "Khóa số",
        handle: "Cần kéo nhôm",
        warranty: "2 năm",
        active: true,
        sortOrder: 8,
        mainImage:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `<p>Larita Yuno là lựa chọn kinh tế cho người cần vali nhỏ gọn, dễ di chuyển.</p>`,
        technicalSpecs: [
          { label: "Chất liệu", value: "ABS + PC" },
          { label: "Kích thước (DxRxC)", value: "37 x 24 x 57 cm" },
          { label: "Dung tích", value: "39L" }
        ]
      },
      {
        id: "pisani-tatti-yg6044l-24-m-silver",
        title: "Pisani Tatti YG6044L_24 M Silver",
        slug: "pisani-tatti-yg6044l-24-m-silver",
        brand: "Pisani",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007576",
        stockStatus: "Còn hàng",
        price: 2590000,
        oldPrice: 3000000,
        discountPercent: 23,
        couponCode: "MBFDLV",
        couponPrice: 2201500,
        description:
          "Phiên bản Silver mang phong cách hiện đại, thanh lịch và rất dễ dùng trong nhiều hoàn cảnh.",
        shortDescription:
          "Vali tông bạc tối giản, bền bỉ, phù hợp công tác và du lịch.",
        colors: ["Silver"],
        sizes: ["Size M kí gửi (24 đến 26 inch)"],
        material: "PC cao cấp",
        dimensions: "42 x 25 x 61 cm",
        capacity: "56L",
        wheels: "Bánh đôi",
        lock: "TSA",
        handle: "Dây kéo đôi",
        warranty: "Trọn đời",
        active: true,
        sortOrder: 9,
        mainImage:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `<p>Pisani Tatti bản Silver phù hợp cho khách hàng ưa phong cách gọn gàng, tinh tế.</p>`,
        technicalSpecs: [
          { label: "Chất liệu", value: "PC cao cấp" },
          { label: "Kích thước (DxRxC)", value: "42 x 25 x 61 cm" },
          { label: "Dung tích", value: "56L" }
        ]
      },
      {
        id: "larita-zeni-lk0325-19-s-pink",
        title: "Larita Zeni LK0325_19 S Pink",
        slug: "larita-zeni-lk0325-19-s-pink",
        brand: "Larita",
        category: "vali",
        subCategory: "my-pham",
        sku: "00007577",
        stockStatus: "Còn hàng",
        price: 1199000,
        oldPrice: 1590000,
        discountPercent: 15,
        couponCode: "MBFDLV",
        couponPrice: 1019150,
        description:
          "Dòng vali cabin nhỏ gọn, màu hồng nữ tính, phù hợp cho chuyến đi ngắn ngày.",
        shortDescription:
          "Nhẹ, đẹp, dễ kéo, rất phù hợp cho người dùng thích phong cách trẻ trung.",
        colors: ["Pink"],
        sizes: ["Size S xách tay (19 inch)"],
        material: "ABS",
        dimensions: "34 x 22 x 52 cm",
        capacity: "32L",
        wheels: "Bánh xoay 360 độ",
        lock: "Khóa số",
        handle: "Cần kéo nhôm",
        warranty: "2 năm",
        active: true,
        sortOrder: 10,
        mainImage:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
        thumbnails: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
        ],
        detailHtml: `<p>Larita Zeni là mẫu vali cabin có kiểu dáng dễ thương, phù hợp cho người đi công tác hoặc du lịch ngắn ngày.</p>`,
        technicalSpecs: [
          { label: "Chất liệu", value: "ABS" },
          { label: "Kích thước (DxRxC)", value: "34 x 22 x 52 cm" },
          { label: "Dung tích", value: "32L" }
        ]
      }
    ];

    for (const item of accessoryProducts) {
      await setDoc(doc(db, "travel_accessories", item.id), item);
    }

    return NextResponse.json({
      success: true,
      message: "Đã update dữ liệu phụ kiện du lịch lên Firebase thành công",
      total: accessoryProducts.length
    });
  } catch (error: any) {
    console.error("seed-accessory-data error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Update dữ liệu thất bại"
      },
      { status: 500 }
    );
  }
}