import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
/*importes de componentes*/
import Card from "../Card/Card";
import { useStoreProducts } from "@/zustand/store";

export default function Offer() {
  const { allProducts } = useStoreProducts();
  
  let newsProducts = allProducts.filter(
    (item) => item.offer.offerActive !== false && item.isActive === true
  );

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectCube]}
      effect={{ shadow: true }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 8000 }}
      spaceBetween={0}
      slidesPerView={1}
      className=" max-w-[1366px] h-[480px]"
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
      {newsProducts.map((item) => {
        const {
          _id,
          images,
          name,
          price,
          cantDues,
          newProduct,
          category,
          offer,
        } = item;
        return (
          <SwiperSlide key={_id} className="">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
              <Card
                key={_id}
                id={_id}
                title={name}
                price={price}
                cantDues={cantDues}
                newProduct={newProduct} //producto nuevo,oferta,normal
                images={images}
                categori={category}
                offer={offer.offerActive}
                offerPrice={offer.offerPrice}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
