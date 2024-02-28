"use client";
import { Image } from "@nextui-org/react";
import Newlabel from "../Newlabel/Newlabel";
import Link from "next/link";
import { IconCart } from "../../../assets/Card/IconCard";
import ItemCardCart from "./ItemCardCart";
import { useState } from "react";
import ItemOfferPrice from "./ItemOfferPrice";

export default function Card({
  images,
  title,
  price,
  cantDues,
  newProduct,
  id,
  categori,
  offer,
  offerPrice,
}) {
  const [hoverAction, setHoverAction] = useState(true);

  return (
    <div
      className=" w-[280px] h-[400px] rounded-md shadow-shadowCardProd relative hover:shadow-gray-600 "
      onMouseEnter={() => {
        setHoverAction(false);
      }}
      onMouseLeave={() => {
        setHoverAction(true);
      }}
    >
      <section className="w-[280px] h-[280px] relative ">
        <Newlabel newProduct={newProduct} offer={offer} />
        <Link href={`/detail/${id}`}>
          <Image
            className="w-[280px] h-[280px] rounded-t-md rounded-b-none object-contain cursor-pointer z-0 "
            src={images[0]}
            alt="imageCard"
          />
        </Link>
      </section>
      <section className="w-full h-[120px] flex flex-col justify-center items-start gap-[15px] px-5 bg-colorWhite-100 rounded-b-md">
        <h2 className="font-bold uppercase">{title}</h2>
        <div className="w-full h-[20px]  flex flex-row justify-between">
          <h5 className="font-normal text-[12px]">{categori}</h5>
          {offer ? (
            <div className="flex flex-row gap-x-1">
              <p className="font-normal line-through text-colorGray-100 text-[14px]">
                ${price}
              </p>
              <ItemOfferPrice offerPrice={offerPrice} />
            </div>
          ) : (
            <p className="font-bold text-[14px]">${price}</p>
          )}
        </div>
        {/* <p className="py-2 rounded-b-lg bg-colorGold-800 text-center font-bold ">
          {cantDues} Cuotas sin interés
        </p> */}
      </section>
      <ItemCardCart hoverAction={hoverAction} />
    </div>
  );
}
