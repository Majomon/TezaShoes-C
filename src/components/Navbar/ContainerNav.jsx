"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoTeza from "../../app/LogoTeza.png";
import TemporizadorDeCompra from "../TemporizadorDeCompra";
import NavBurger from "./NavBurger";
import NavIcons from "./NavIcons";
import NavLinks from "./NavLinks";
import { useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import ModalPaymentModo from "./ModalPaymentModo";

function ContainerNav({ categorias, products }) {
  const { categories, allProducts, setProducts, setCategories } =
    useStoreProducts();

  const [openModalPaymentModo, setOpenModalPaymentModo] = useState(false);
  const [varCookiesVerific,setVarCookiesVerific] = useState(null)
  const startTime = Cookies.get("timePurchase");
  const pathname = usePathname();
  
  useEffect(() => {
    setVarCookiesVerific(Cookies.get("OrderPaymentModo"))
  },[Cookies.get("OrderPaymentModo")])

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    setCategories(categorias);
  }, [categories]);

  if (pathname.startsWith("/purchase")) {
    return null;
  }
  /* let varCookiesVerific = Cookies.get("OrderPaymentModo"); */
  /* console.log(varCookiesVerific) */

  return (
    <div className="w-full h-16  md:px-8 px-2 shadow-md relative">
      {!startTime && (
        <div className="flex items-center">
          {/* LEFT */}

          <NavBurger categories={categories} />

          <Image
            src={LogoTeza}
            height={40}
            alt="Logo Teza Shoes"
            className=" mx-auto block md:hidden"
          />

          {/* CENTER */}
          <NavLinks />

          {/* RIGHT */}
          <NavIcons products={allProducts} />
          {
          varCookiesVerific && (
            <div className=" absolute left-[50%] translate-x-[-50%] shadow-cardPerfilShadow p-2 bg-white top-12 rounded-xl hover:bg-[#088F5A] hover:text-white transition-all duration-300 flex items-center gapy-y-2 z-50">
              <button
                onClick={() => setOpenModalPaymentModo(!openModalPaymentModo)}
              >
                <p className=" text-sm font-normal">Compra pendiente con</p> 
                <span className=" text-base font-bold">MODO</span>
              </button>
            </div>
          )}

          <ModalPaymentModo
            setOpenModalPaymentModo={setOpenModalPaymentModo}
            openModalPaymentModo={openModalPaymentModo}
          />
        </div>
      )}

      {startTime && (
        <div className="w-full h-fit absolute -bottom-8 right-0">
          <TemporizadorDeCompra />
        </div>
      )}
    </div>
  );
}

export default ContainerNav;
