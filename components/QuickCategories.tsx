type MainCategory = {
  id: number;
  label: string;
  highlight?: string;
  icon: string;
  highlightColor?: string;
};

type SubCategory = {
  id: number;
  label: string;
  icon: string;
  active?: boolean;
};

const mainCategories: MainCategory[] = [
  {
    id: 1,
    label: "Tour TRONG NƯỚC",
    highlight: "TRONG NƯỚC",
    icon: "/trangchu/icon1.png",
  },
  {
    id: 2,
    label: "Tour NƯỚC NGOÀI",
    highlight: "NƯỚC NGOÀI",
    icon: "/trangchu/icon2.png",
    highlightColor: "text-[#1f4ea3]",
  },
  {
    id: 3,
    label: "Dịch vụ làm VISA",
    highlight: "VISA",
    icon: "/trangchu/icon3.png",
    highlightColor: "text-[#c63da4]",
  },
  {
    id: 4,
    label: "VÉ MÁY BAY GIÁ RẺ",
    highlight: "VÉ MÁY BAY GIÁ RẺ",
    icon: "/trangchu/icon4.png",
    highlightColor: "text-[#19a7d8]",
  },
  {
    id: 5,
    label: "ĐẶT KHÁCH SẠN",
    highlight: "ĐẶT KHÁCH SẠN",
    icon: "/trangchu/icon5.png",
    highlightColor: "text-[#66bfb6]",
  },
];

const subCategories: SubCategory[] = [
  { id: 1, label: "Tour Doanh Nghiệp", icon: "/trangchu/sub1.png" },
  { id: 2, label: "Du lịch Hành Hương", icon: "/trangchu/sub2.png" },
  { id: 3, label: "Tour Hoa Anh Đào", icon: "/trangchu/sub3.png" },
  { id: 4, label: "Du lịch Mùa Đông", icon: "/trangchu/sub4.png" },
  { id: 5, label: "Tour Hè 2026", icon: "/trangchu/sub5.png", active: true },
  { id: 6, label: "Tour Lễ 30/4", icon: "/trangchu/sub6.png" },
];

export default function QuickCategories() {
  return (
    <section className="bg-[#eef0f3]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
        <div className="overflow-x-auto">
          <div className="grid min-w-[1180px] grid-cols-5 gap-5">
            {mainCategories.map((item) => {
              const before = item.label.replace(item.highlight || "", "").trim();

              return (
                <a
                  key={item.id}
                  href="#"
                  className="flex h-[102px] items-center gap-4 border border-[#dedede] bg-white px-2 shadow-sm transition hover:-translate-y-0.5"
                >
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-[44px] w-[44px] object-contain"
                    />
                  </div>

                  <div className="min-w-0 text-[16px] leading-[1.35] text-[#4a4a4a]">
                    {before ? (
                      <>
                        <span>{before} </span>
                        <span className={item.highlightColor || "text-[#222]"}>
                          {item.highlight}
                        </span>
                      </>
                    ) : (
                      <span className={item.highlightColor || "text-[#222]"}>
                        {item.highlight}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-[#e2e2e2] bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
          <div className="overflow-x-auto">
            <div className="grid min-w-[1180px] grid-cols-6">
              {subCategories.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className="flex flex-col items-center justify-start gap-3 px-3 text-center"
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-[50px] w-[50px] object-contain"
                  />
                  <span
                    className={`text-[14px] font-semibold leading-[1.3] ${
                      item.active ? "text-[#e91e8f]" : "text-[#444]"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}