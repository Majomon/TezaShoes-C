import { Navigation, Pagination, EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { IconCamare } from "../../../assets/svg/IconsDeatilsProducts";

export default function MobileResponsiveCarousel({
  imagens,
  countImages
}) {
  return (
    <div className=" block min-[570px]:hidden h-[505px] w-full relative">
      <div className="absolute top-3 right-2 py-2 px-6 rounded-full z-[5] bg-colorGoldSecundary-500 text-white flex gap-x-2">
        <p className=" text-base font-semibold">{countImages}</p>
        <IconCamare />
      </div>
      <Swiper
        modules={[Navigation, Pagination, EffectCube]}
        spaceBetween={0}
        slidesPerView={1}
        className=" h-full w-full "
      >
        {imagens.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                className="w-full h-full object-contain border-1"
                src={image}
                alt={`Imagen ${index}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
