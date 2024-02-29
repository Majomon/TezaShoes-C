import ButtonModo from "@/components/ButtonMODO/ButtonModo";
import { useStorePayOrder } from "@/zustand/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProductPurchase from "../CardProductPurchase";

function MainLeftSumary() {
  const { orderData } = useStorePayOrder();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (orderData && orderData.paymentMethod !== "MODO") {
      const timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearTimeout(timer);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      localStorage.removeItem("dataPurchase");
      localStorage.removeItem("TotalCart");
      localStorage.removeItem("cart");
      redirect("/");
    }
  }, [countdown, orderData]);

  let cantCart = 0;

  const totalProducts =
    orderData?.cart?.reduce((acc, item) => acc + item.count, 0) || 0;

  if (!orderData || !orderData.cart || orderData.cart.length === 0) {
    return <div>No hay datos de pedido disponibles</div>;
  }

  const goHome = () => {
    localStorage.removeItem("dataPurchase");
    localStorage.removeItem("TotalCart");
    localStorage.removeItem("cart");
  };

  return (
    <div
      id="default-carousel"
      className="relative max-w-[460px] gap-y-2 w-full shadow-cardPurchaseShadow py-[15px] px-[10px] h-fit rounded-lg flex flex-col "
      data-carousel="slide"
    >
      <section>
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
        >
          {orderData.cart.map((item, index) => {
            cantCart += item.count;
            return (
              <SwiperSlide key={index}>
                <CardProductPurchase item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className="flex flex-col gap-y-3">
        <div className=" flex w-full items-center justify-between">
          <p className=" text-colorGray-100">Cantidad de productos</p>
          <p className=" font-semibold">{cantCart}</p>
        </div>
        <div className=" flex w-full items-center justify-between">
          <p className=" text-colorGray-100">Total</p>
          <p className=" font-semibold">${orderData.totalCart}</p>
        </div>
      </section>
      {orderData.paymentMethod === "MODO" && (
        <ButtonModo
          totalCart={orderData.totalCart}
          cantProduct={totalProducts}
          mockOrder={orderData.numberOrder}
          dataId={orderData._id}
        />
      )}
      <section>
        <div>
          <h2 className="text-sm font-semibold ">
            Recuerda que vas a recibir un email con los pasos a seguir y el
            detalle de la orden de compra
          </h2>
        </div>
        <div className="w-10/12 mx-auto flex justify-center items-center">
          <Link
            href={"/"}
            className="w-fit text-sm  font-normal my-4 py-2 px-4 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase"
          >
            <button onClick={() => goHome()}>Ir al inicio</button>
          </Link>
        </div>
        {orderData.paymentMethod !== "MODO" && (
          <p>Serás redirigido al inicio en {countdown} segundos.</p>
        )}
      </section>
    </div>
  );
}

export default MainLeftSumary;
