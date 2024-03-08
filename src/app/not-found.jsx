"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ImagePurse from "../../assets/svg/Purse.svg";
import ImageShoes2 from "../../assets/svg/Shoes2.svg";

function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="w-full min-h-screen text-black flex flex-col-reverse gap-y-6 lg:flex-row items-center justify-center gap-x-[133px] overflow-hidden">
      <div className="flex flex-col items-center gap-y-[30px]">
        <h1 className=" text-3xl sm:text-4xl font-semibold">
          Ooops<span className="">!</span>
        </h1>
        {/* <Image src={fotoError} className="w-[150px] h-[150px]"/> */}
        <p className=" text-xl sm:text-2xl text-center w-fit max-w-lg leading-tight tracking-wide ">
          No podemos encontrar la página que estás buscando :(
        </p>
        <Link href={"/"}>
          <button className="bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 h-[50px] rounded-none w-[180px]">
            REGRESAR
          </button>
        </Link>
      </div>
      <div className=" w-[325px] h-[265px] relative font-semibold">
        <p className=" text-colorGoldSecundary-500 text-4xl absolute bottom-0 right-[38px] font-semibold">
          ¿
        </p>
        <p className="text-4xl absolute left-[3px] bottom-[34px] font-semibold">
          ¿
        </p>
        <p className=" text-colorGoldSecundary-500 text-4xl absolute top-[24px] left-[94px] font-semibold">
          ?
        </p>
        <p className="text-4xl absolute top-[22px] right-[36px]">?</p>
        <Image
          src={ImagePurse}
          width={180}
          className="absolute right-0 top-0"
          alt="notFound"
        />
        <Image
          src={ImageShoes2}
          width={250}
          className="absolute bottom-0 left-0 "
          alt="notFoundShoes"
        />
      </div>
    </main>
  );
}

export default NotFound;
