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
import { useEffect } from "react";

function ContainerNav({ categorias, products }) {
  const { categories, allProducts, setProducts, setCategories } =
    useStoreProducts();
  const startTime = Cookies.get("timePurchase");
  const pathname = usePathname();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    setCategories(categorias);
  }, [categories]);

  if (pathname.startsWith("/purchase")) {
    return null;
  }
  
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
