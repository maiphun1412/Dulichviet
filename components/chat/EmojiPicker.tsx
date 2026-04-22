const emojis = ["👍","👎","😡","😐","😢","😀","😍","😮","😩","😴","😂","😲","😝","🙂"];

export default function EmojiPicker({
  onSelect,
}: {
  onSelect: (emoji: string) => void;
}) {
  return (
    <div className="absolute bottom-[58px] right-14 z-20 grid grid-cols-5 gap-3 rounded-[18px] bg-white p-4 shadow-2xl">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="text-[30px]"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}