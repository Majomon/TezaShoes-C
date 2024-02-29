import { IconExitCart } from "../../../../assets/Cart/IconsCart";
import ContainerOptionsColorAndSize from "./ContainerOptionsColorAndSize";

export default function SidebarColorSize({
  isOpenCart,
  setIsOpenCart,
  colorInputs,
  handleSizeChange,
  handleAddSize,
  handleColorChange,
  handleAddColor,
  handleFinishedColorSize,
  isOpenMeasure,
}) {
  return (
    <div
      className={`${
        isOpenCart ? "w-full sm:w-[500px]" : "w-0"
      } bg-white min-h-screen fixed top-0 right-0 transition-all duration-300 z-30 `}
    >
      <section className={`${!isOpenCart && "hidden"}`}>
        <div className="flex flex-col">
          <section className="flex flex-row items-center justify-between px-5 border-b-1 border-colorGray-100 h-[50px]">
            <h2 className=" text-xl font-bold">Color y Talle</h2>
            <button className="" onClick={() => setIsOpenCart(false)}>
              <IconExitCart />
            </button>
          </section>
          <section className=" px-5 overflow-auto h-fit max-h-[85vh]">
            {colorInputs.length !== 0 ? (
              colorInputs.map((colorInput, colorIndex) => (
                <ContainerOptionsColorAndSize
                  key={colorIndex}
                  colorInput={colorInput}
                  colorIndex={colorIndex}
                  handleColorChange={handleColorChange}
                  handleAddSize={handleAddSize}
                  handleSizeChange={handleSizeChange}
                  handleAddColor={handleAddColor}
                  isOpenMeasure={isOpenMeasure}
                />
              ))
            ) : (
              <p className="py-3 text-center w-full text-base font-normal">
                Sin variantes
              </p>
            )}
          </section>
        </div>
      </section>
      <section className="w-fit h-fit flex items-center justify-center gap-x-4 mx-auto">
        <button
          className=" px-[10px] py-[5px] border-1 border-colorBlack-400 rounded-xl"
          onClick={() => setIsOpenCart(false)}
        >
          Finalizar
        </button>

        <button
          onClick={handleAddColor}
          className="px-[10px] py-[5px] border-1 border-colorGoldSecundary-500 bg-colorGoldSecundary-250 rounded-xl"
        >
          Crear nueva variante
        </button>
      </section>
    </div>
  );
}
