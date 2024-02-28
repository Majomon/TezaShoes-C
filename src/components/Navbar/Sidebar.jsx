"use client";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import LogoTeza from "../../app/LogoTeza.png";
import Image from "next/image";
import { useStoreProducts, useStoreProductsFilter } from "@/zustand/store";
import listLinkNavbar from "@/utils/listLinksNavbar";

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
          isMenuOpen ? "w-[320px]" : "w-0"
        } bg-white min-h-screen fixed top-0 left-0 transition-all duration-300 z-30`}
      >
        <div className={`${!isMenuOpen && "hidden"} pt-3`}>
          <div className="flex flex-row items-center justify-between px-5 py-2 ">
            <button className="" onClick={() => setIsMenuOpen(false)}>
              <CgClose size={25} color="black" />
            </button>
            <Image className="" src={LogoTeza} alt="Logo Teza Shoes" />
          </div>
          <ul>
            <h3 className=" text-lg font-semibold border-b-1 border-t-1 border-colorBlack-400 px-6">
              Categorias
            </h3>
            {categories?.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer px-6 my-4 hover:font-bold hover:underline"
              >
                <Link
                  className="w-full text-lg "
                  href={`/search?category=${item.name}`}
                  onClick={() => {
                    setSelectColor(null);
                    setSelectSize(null);
                    setSelectOrder(null);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className=" block ">
            <h3 className=" text-lg font-semibold border-b-1 border-t-1 border-colorBlack-400 px-6">
              Paginas
            </h3>
            {listLinkNavbar.map((item) => {
              const { name, url } = item;
              return (
                <li
                  key={name}
                  className="cursor-pointer px-6 my-4 hover:font-bold hover:underline"
                >
                  <Link
                    className="w-full text-lg "
                    href={url}
                    onClick={() => {
                      setSelectColor(null);
                      setSelectSize(null);
                      setSelectOrder(null);
                      setIsMenuOpen(!isMenuOpen);
                    }}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
