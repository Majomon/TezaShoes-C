import Link from "next/link";
import { IconNotProducts } from "../../../assets/NotProducts/IconNotProducts";

export default function NotProducts({
  searchParamsCategory,
  searchParamsName,
  setProductsFilterTwo,
  productsFilter,
  setSelectOrder,
  setSelectColor,
  setSelectSize
}) {
  return (
    <div className=" mx-auto flex flex-col-reverse xl:flex-row items-center justify-center gap-x-[130px] ">
      <section className="flex flex-col gap-y-[15px] w-[300px]">
        <h1 className="text-center text-colorBlack-400 text-2xl font-semibold ">
          Productos no encontrados
        </h1>
        <Link
          href={`/search?${
            searchParamsCategory && !searchParamsName
              ? `category=${searchParamsCategory}`
              : `name=${searchParamsName}`
          }`}
          className=" text-sm w-full h-[40px] text-colorWhite-100 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black uppercase flex items-center justify-center"
          onClick={() => {
            setProductsFilterTwo(productsFilter);
            setSelectOrder(null);
            setSelectColor(null);
            setSelectSize(null);
          }}
        >
          Filtrar todos los productos
        </Link>
      </section>
      <section className="w-[180px] h-[174px]">
        <IconNotProducts />
      </section>
    </div>
  );
}
