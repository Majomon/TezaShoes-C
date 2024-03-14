import Image from "next/image";
import { useEffect, useState } from "react";
import mainImageHomeMaxSize from "../../../assets/image/mainIMageHomeMaxSize.png";
import mainImagePhone from "../../../assets/image/mainImagePhone.webp";

export default function MainImage() {
  return (
    <div className=" w-[100%] flex justify-center items-center">
      <Image
        src={mainImageHomeMaxSize}
        width={1920}
        alt="altMain"
        className="hidden md:block"
      />
      <Image
        src={mainImagePhone}
        width={768}
        alt="altMain"
        className=" md:hidden"
      />
    </div>
  );
}
