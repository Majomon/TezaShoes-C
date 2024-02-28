"use client";

import React from "react";

export default function CardInfoIcons({ imageSvg, TextInfor, info }) {
  return (
    <div className=" w-[250px] h-fit flex flex-col justify-center items-center gap-y-[5px] text-colorWhite-100 ">
      {imageSvg}
      <h4 className="text-center w-[100%] font-semibold text-[1.3rem]">
        {TextInfor}
      </h4>
      <p className="text-center font-light text-[0.9rem]">{info}</p>
    </div>
  );
}
