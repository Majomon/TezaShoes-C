"use client";
import Link from "next/link";

export default function CardSearchResult({ images, title, price, id }) {
  return (
    <div className="h-[70px] w-[272px] min-[325px]:w-full rounded-xl p-1 flex cursor-pointer shadow-cardPurchaseShadow hover:shadow-inputPerfilShadow">
      <section className=" w-1/4 xl:w-4/12  h-full relative ">
        <Link href={`/detail/${id}`}>
          <img
            className="w-full h-full mx-auto object-contain z-0 rounded-sm"
            src={images[0]}
            alt="imageCard"
          />
        </Link>
      </section>
      <section className="w-3/4 xl:w-8/12 h-full py-2 flex flex-col ">
        <h2 className="font-semibold text-base uppercase truncate">{title}</h2>
        <p className="font-normal text-sm">${price}</p>
      </section>
    </div>
  );
}
