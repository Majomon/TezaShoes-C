import React from "react";
import {
  IconComunication,
  IconPay,
  IconTruck,
  IconDevolution,
} from "../../../assets/svg/InformativeIcons";
import CardInfoIcons from "./CardInfoIcons";
import Image from "next/image";
import backgroundInformationIcons from "../../../assets/image/backgroundInformationIcons.png";

const listCardInfo = [
  {
    id: "itemcomunication",
    imageSvg: <IconComunication className="m-auto" />,
    textInfo: "Comunicacion",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "itemCard",
    imageSvg: <IconPay />,
    textInfo: "Pagos",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "itemTruck",
    imageSvg: <IconTruck />,
    textInfo: "Envios",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "itemDevolution",
    imageSvg: <IconDevolution />,
    textInfo: "Devolución",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
];

export default function CardInfoSet() {
  return (
    <div className="mb-[40px] flex flex-wrap justify-center items-center gap-x-[35px] gap-y-10 relative bg-black bg-opacity-40 h-fit w-full py-[40px]">
      <Image
        src={backgroundInformationIcons}
        className=" absolute top-0 left-0 -z-10 w-full h-full object-cover"
        alt="imgInformacion"
      />

      {listCardInfo.map((info) => (
        <CardInfoIcons
          key={info.id}
          imageSvg={info.imageSvg}
          TextInfor={info.textInfo}
          info={info.info}
        />
      ))}
    </div>
  );
}
