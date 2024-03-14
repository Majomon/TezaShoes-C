"use client";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import LogoTeza from "../../app/LogoTeza.png";
import Image from "next/image";
import { useStoreProducts, useStoreProductsFilter } from "@/zustand/store";
import listLinkNavbar from "@/utils/listLinksNavbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import ItemMenuSidebar from "./ItemMenuSidebar";

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { categories } = useStoreProducts();
  const { setSelectColor, setSelectSize, setSelectOrder } =
    useStoreProductsFilter();

  return (
    <div>
      {/* BLUR */}
      <div
        className={`${
          !isMenuOpen && "hidden"
        } bg-neutral-950/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm z-20`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`${
          isMenuOpen ? "w-full sm:w-[320px]" : "w-0"
        } bg-white min-h-screen fixed top-0 left-0 transition-all duration-300 z-30`}
      >
        <div className={`${!isMenuOpen && "hidden"} pt-3`}>
          <div className="flex flex-row items-center justify-between px-5 py-2 ">
            <button className="" onClick={() => setIsMenuOpen(false)}>
              <CgClose size={25} color="black" />
            </button>
            {/* <Image className="" src={LogoTeza} alt="Logo Teza Shoes" /> */}
          </div>
          <section className=" h-[75vh] overflow-auto">
            <ul className=" block ">
              {listLinkNavbar.map((item) => {
                const { name, url } = item;
                return (
                  <ItemMenuSidebar
                    key={name}
                    name={name}
                    categories={categories}
                    url={url}
                    setSelectColor={setSelectColor}
                    setSelectSize={setSelectSize}
                    setSelectOrder={setSelectOrder}
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                  />
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
