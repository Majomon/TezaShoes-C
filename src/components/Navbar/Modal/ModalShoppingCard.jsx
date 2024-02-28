'use client'
import { CiShoppingCart } from "react-icons/ci";
import SidebarCart from "../SidebarCart";
import { useStoreOpenSearch } from "@/zustand/store";

function ModalShoppingCard({ isOpenCart, setIsOpenCart }) {
  const { setIsOpenSearch } = useStoreOpenSearch();

  return (
    <div className="mx-1">
      <button>
        <CiShoppingCart size={25} onClick={() => {
            setIsOpenSearch(false);
            setIsOpenCart(true);
          }} />
      </button>
      <SidebarCart isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart}/>
    </div>
  );
}

export default ModalShoppingCard;
