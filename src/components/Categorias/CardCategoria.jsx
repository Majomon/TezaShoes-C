"use client";
import Link from "next/link";
import { useState } from "react";

export default function Card({ image, category }) {
  const [hover, setHover] = useState(false);

  return (
    <div className=" w-[280px] h-[400px] rounded-md shadow-shadowCardProd relative">
      <Link
        href={`/search?category=${category}`}
        className="w-[280px] h-[280px] relative "
      >
        <img
          className="w-full h-full rounded-t-lg rounded-b-lg object-cover cursor-pointer z-0 grayscale hover:grayscale-0 hover:transition-all hover:duration-75"
          src={image}
          alt="imageCard"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <div
          className={`w-full h-[40px] flex justify-center items-center absolute bottom-[65px] left-0 right-0 z-1 border-t border-b border-colorWhite-100 ${
            hover
              ? "bg-colorGoldSecundary-500 hover:border-0 transition-all duration-75 border-colorGoldSecundary-500"
              : " "
          } backdrop-blur-md`}
        >
          <h2 className="text-center text-white text-2xl font-bold uppercase ">
            {category}
          </h2>
        </div>
      </Link>
    </div>
  );
}
