import {
  IconArrowNext,
  IconArrowPrev,
} from "../../../../assets/Detail/IconDetails";
import { useStoreProducts } from "@/zustand/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCube } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Card from "@/components/Card/Card";

export default function InterestProductsCarousel() {
  const { detail, allProducts } = useStoreProducts();

  const sameCategoryProducts = allProducts.filter(
    (product) =>
      product.category === detail.category && product._id !== detail._id
  );

  const getRandomProducts = (arr, n) => {
    const mescla = arr.sort(() => 0.5 - Math.random());
    return mescla.slice(0, n);
  };

  const randomProducts = getRandomProducts(sameCategoryProducts, 6);

  return (
    <section className="max-w-[1366px] h-fit mx-auto">
      <article className=" flex flex/row items-center justify-between">
        <h1 className="text-left text-neutral-950 text-xl font-semibold">
          Tambien te puede interesar
        </h1>
        <div className="flex flex-row gap-x-[10px]">
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
        </div>
      </article>
      <article className="">
        <Swiper
          modules={[Autoplay, Navigation, EffectCube]}
          /* effect={{ shadow: true }} */
          effect={"coverflow"}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: "#ButtonNext",
            prevEl: "#ButtonPrev",
          }}
          className=" max-w-[1366px] h-[450px]"
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
          {randomProducts.map((product) => (
            <SwiperSlide className=" " key={product._id}>
              <div className=" w-[100%] h-full flex flex-col justify-center items-center ">
                <Card
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  cantDues={product.cantDues}
                  newProduct={product.newProduct}
                  images={product.images}
                  categori={product.category}
                  offer={product.offer.offerActive}
                  offerPrice={product.offer.offerPrice}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
    </section>
  );
}
