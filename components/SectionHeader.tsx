type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[18px] font-medium uppercase text-[#1f55a5]">
        {title}
      </h2>
    </div>
  );
}