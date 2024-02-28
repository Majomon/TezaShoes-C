export default function SizeComponentDetail({ valueSize,size,handleSizeChange,selectedSize }) {
  return (
    <div
      className={`w-[55px] h-11 flex items-center justify-center px-[20px] py-[10px] cursor-pointer ${selectedSize && selectedSize._id === size._id ? " border-b-1 border-b-colorGoldSecundary-500" : "shadow-buttonSizeShadow"}`}
      onClick={() => handleSizeChange(size)}
    >
      <p className={`text-center text-sm font-light ${selectedSize && selectedSize._id === size._id ? " text-colorGoldSecundary-500": "text-stone-300"}`}>{valueSize}</p>
    </div>
  );
}
