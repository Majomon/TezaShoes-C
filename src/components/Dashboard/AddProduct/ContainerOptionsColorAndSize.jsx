import validateInput from "@/utils/inputWithoutLess";
import { IconAdd } from "../../../../assets/svg/IconsDashboards";
import check from "@/utils/inputWithoutLess";
import { Disabled } from "../../../../assets/Dashboard/IconActions";

function ContainerOptionsColorAndSize({
  colorInput,
  colorIndex,
  handleColorChange,
  handleAddSize,
  handleSizeChange,
  handleAddColor,
  isOpenMeasure,
}) {
  return (
    <div
      key={colorIndex}
      className=" flex flex-col rounded-lg py-5 w-full gap-y-5"
    >
      <div>
        <div className="flex gap-5 w-full">
          <input
            className=" w-1/6 h-[30px]"
            type="color"
            name="codHexadecimal"
            value={colorInput.color.codHexadecimal}
            onChange={(e) => handleColorChange(colorIndex, e)}
          />
          <input
            className=" w-5/6 border-1 border-colorGray-100 rounded-lg px-2 h-[30px]"
            type="text"
            name="nameColor"
            value={colorInput.color.nameColor}
            onChange={(e) => handleColorChange(colorIndex, e)}
            placeholder="Nombre del color"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-y-3">
        <div className="flex gap-x-10 ">
          <h2 className=" text-base font-medium w-1/2">Talles y Stock</h2>
          <button
            className=" flex items-center justify-start gap-x-2 w-1/2"
            onClick={() => handleAddSize(colorIndex)}
          >
            <IconAdd />
            <p className=" text-colorGoldSecundary-500 text-base font-medium">
              Agregar Talle
            </p>
          </button>
        </div>
        {colorInput.sizes.map((size, sizeIndex) => (
          <div key={sizeIndex} className="grid grid-cols-2 gap-x-10">
            {isOpenMeasure ? (
              <input
                className=" border-1 border-colorGray-100 rounded-lg px-2 h-[30px]"
                type="number"
                name="size"
                value={1}
                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                placeholder="Talle"
                min={0}
                id="sizeInput"
                disabled
              />
            ) : (
              <input
              className=" border-1 border-colorGray-100 rounded-lg px-2 h-[30px]"
              type="number"
              name="size"
              value={check(size.size)}
              onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
              placeholder="Talle"
              min={0}
              id="sizeInput"
            />
            )}
            {/* <input
              className=" border-1 border-colorGray-100 rounded-lg px-2 h-[30px]"
              type="number"
              name="size"
              value={check(size.size)}
              onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
              placeholder="Talle"
              min={0}
              id="sizeInput"
            /> */}
            <input
              className=" border-1 border-colorGray-100 rounded-lg px-2 h-[30px]"
              type="number"
              name="stock"
              value={check(size.stock)}
              onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
              placeholder="Stock"
              min={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContainerOptionsColorAndSize;
