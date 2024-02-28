import ItemsCart from "./ItemsCart";
import { IconExitCart } from "../../../assets/Cart/IconsCart";

export default function SidebarCart({ isOpenCart, setIsOpenCart }) {
  return (
    <div
      className={`${
        isOpenCart ? "w-full sm:w-[500px]" : "w-0"
      } bg-colorWhite-100 min-h-screen fixed top-0 right-0 transition-all duration-300 z-30`}
    >
      <div className={`${!isOpenCart && "hidden"}`}>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between px-5 border-b-1 border-colorGoldSecundary-500 h-[50px]">
            <h2 className=" text-xl font-bold">Carrito</h2>
            <button className="" onClick={() => setIsOpenCart(false)}>
              <IconExitCart />
            </button>
          </div>
          <ItemsCart setIsOpenCart={setIsOpenCart} isOpenCart={isOpenCart} />
        </div>
      </div>
    </div>
  );
}
