"use client";
import { useStoreOpenCart, useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import ModalSearch from "./Modal/ModalSearch";
import ModalShoppingCard from "./Modal/ModalShoppingCard";
import ModalUser from "./Modal/ModalUser";

export default function NavIcons({ products }) {
  const {isOpenCart, setIsOpenCart} = useStoreOpenCart();
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { setProducts, allProducts } = useStoreProducts();
  
  useEffect(() => {
    if (allProducts?.lenght === 0) {
      setProducts(products);
    }
  }, [products]);

  return (
    <div className="w-full flex flex-1 justify-end items-center ">
      <div
        className={`${
          !isOpenCart && "hidden"
        } w-full min-h-screen bg-neutral-950/50 fixed top-0 left-0 right-0 backdrop-blur-sm z-10`}
        onClick={() => setIsOpenCart(false)}
      />
      <ModalSearch/>
      <ModalUser isOpenUser={isOpenUser} setIsOpenUser={setIsOpenUser} />
      <ModalShoppingCard
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
      />
    </div>
  );
}
