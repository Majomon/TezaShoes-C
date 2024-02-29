export default function ColorComponentDetail({
  hexaColor,
  selectedColor,
  nameColor,
  handleColorChange,
  option,
}) {
  return (
    <div
      className={`flex gap-x-[5px] items-center justify-center ${
        selectedColor && selectedColor.color === option.color
          ? " border-b-1 border-b-colorGoldSecundary-500 pb-[5px]"
          : " justify-center border-1 border-gray-200 p-[5px] cursor-pointer"
      }`}
      onClick={() => handleColorChange(option)}
    >
      <div
        className="rounded-full w-[25px] h-[25px] border-1 justify-center items-center p-[5px] border-stone-300"
        style={{ backgroundColor: hexaColor }}
      ></div>
      <h3
        className={` text-xs font-bold ${
          selectedColor && selectedColor.color === option.color
            ? " text-colorGoldSecundary-500"
            : "text-stone-300"
        }`}
      >
        {nameColor}
      </h3>
    </div>
  );
}
