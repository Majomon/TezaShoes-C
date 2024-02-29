"use client";
import { useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Description from "./Description";
import DetailArticle from "./DetailArticle";
import InterestProductsCarousel from "./InterestProductsCarousel/InterestProductsCarousel";

export default function Main({ product, allproduct }) {
  const { setDetail, setProducts, detail } = useStoreProducts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDetail(product);
    setProducts(allproduct);
    setIsLoading(false);
    return () => {
      setDetail({});
    };
  }, [product]);

  const isProductActive = detail && detail.isActive;

  return (
    <div className="w-full min-h-screen px-3 py-3 md:px-10 md:pt-4 pb-16">
      {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <h1 className="text-xl font-bold">Cargando...</h1>
        </div>
      ) : isProductActive ? (
        <div className="w-full h-full flex flex-col max-w-[1366px] mx-auto">
          <div className="md:pt-4 flex flex-col gap-y-10 lg:flex-row gap-x-[5%]">
            <Carousel />
            <DetailArticle />
          </div>
          <div className="flex flex-row py-14">
            <Description />
            {/* <ShippingCalculator /> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-96 text-red-500 flex justify-center items-center">
          <h1 className="text-xl font-bold">
            El producto ya no está disponible.
          </h1>
        </div>
      )}
      <InterestProductsCarousel />
    </div>
  );
}
