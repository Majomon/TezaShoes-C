import { EffectCube, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MobileResponsiveCarousel({
  imagens,
  handlerImgModal,
  imgSelected,
}) {
  return (
    <div className=" block min-[570px]:hidden h-[505px] w-full ">
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
                className="w-full h-full object-contain"
                src={image}
                alt={`Imagen ${index}`}
                onClick={() => handlerImgModal()}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
