"use client";
/*switer*/
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
/*importes de componentes*/
import CardCategoria from "@/components/Categorias/CardCategoria";
import { useStoreProducts } from "@/zustand/store";
import {
  IconArrowNext,
  IconArrowPrev,
} from "../../../assets/Detail/IconDetails";

export default function Categorias() {
  const { categories } = useStoreProducts();

  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCube]}
        effect={{ shadow: true }}
        autoplay={{ delay: 8000 }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: "#ButtonNext",
          prevEl: "#ButtonPrev",
        }}
        className=" max-w-[1366px] w-full h-[480px]"
        breakpoints={{
          slidesPerGroup: 1,
          slidesPerView: 1,
          620: {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 2,
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 0,
            slidesPerGroup: 3,
          },
          1250: {
            slidesPerView: 4,
            spaceBetween: 0,
            slidesPerGroup: 4,
          },
        }}
      >
        {categories.map((item) => {
          const { _id, image, name } = item;

          return (
            <SwiperSlide key={_id} className="">
              <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
                <CardCategoria
                  key={_id}
                  category={name}
                  image={image}
                  isNew={true}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section className="flex gap-x-2 justify-center items-center w-full mb-8">
        <button
          className=" cursor-pointer w-[60px] h-[60px] rounded-full border border-neutral-200 flex items-center justify-center hover:shadow-md hover:border-none transition-all"
          id="ButtonPrev"
        >
          <IconArrowPrev />
        </button>
        <button
          className=" cursor-pointer w-[60px] h-[60px] rounded-full border border-neutral-200 flex items-center justify-center hover:shadow-md hover:border-none transition-all"
          id="ButtonNext"
        >
          <IconArrowNext />
        </button>
      </section>
    </div>
  );
}
