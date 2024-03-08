export default function ListSizeGuide({
  size,
  index,
  measure,
  handleChangeSizeGuide,
  deleteElementSizeGuide
}) {
  return (
    <div className=" w-full flex gap-x-3 pb-2">
      <label htmlFor="" className="w-1/2 flex flex-col gap-y-1">
        <p className=" text-sm font-normal">Talle</p>
        <input
          type="text"
          className="border-1 border-colorGray-100 rounded-xl p-1 w-full"
          value={size}
          onChange={handleChangeSizeGuide}
          name="talle"
        />
      </label>
      <label htmlFor="" className="w-1/2 flex flex-col gap-y-1">
        <p className=" text-sm font-normal">Medida(cm)</p>
        <input
          type="text"
          className="border-1 border-colorGray-100 rounded-xl p-1 w-full"
          value={measure}
          onChange={handleChangeSizeGuide}
          name="medida"
        />
      </label>
      <button className=" cursor-pointer text-red-500 hover:bg-red-100 rounded-full py-0.5 px-1 h-fit" onClick={() => deleteElementSizeGuide(index)}>x</button>
    </div>
  );
}
