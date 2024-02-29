"use client";
import TemporizadorDeCompra from "@/components/TemporizadorDeCompra";
import Cookies from "js-cookie";
import { redirect, usePathname } from "next/navigation";
import PurchaseSteps from "./PurchaseSteps";
import { useEffect } from "react";

const listPurchaseSteps = [
  {
    name: "Llenar datos",
    step: "1",
    urlName: "/purchase",
  },
  {
    name: "Modo de entrega",
    step: "2",
    urlName: "/purchase/deliveryMode",
  },
  {
    name: "Medio de pago",
    step: "3",
    urlName: "/purchase/paymentMethod",
  },
  {
    name: "Resumen de compra",
    step: "4",
    urlName: "/purchase/purchaseSummary",
  },
];

export default function ProccessPurchase() {
  const timePurchase = Cookies.get("timePurchase");
  useEffect(() => {
    const itemCart = JSON.parse(localStorage.getItem("cart"));
    if (!itemCart && !timePurchase) {
      redirect("/");
    }
  }, []);

  const url = usePathname();

  return (
    <div>
      {timePurchase && <TemporizadorDeCompra />}
      <div className="w-full h-full mx-auto flex flex-col-reverse gap-y-3 lg:flex-row justify-between items-center py-4 relative mt-24 sm:mt-14">
        <section className=" flex gap-x-[10px] items-center justify-center relative h-[80px] w-fit sm:w-[365px]">
          <h2 className="text-lg font-light text-center text-colorBlack-400 uppercase w-full">
            {listPurchaseSteps.map((item) => {
              const { name, urlName } = item;
              if (url === urlName) {
                return `${name}`;
              }
            })}
          </h2>
          <h3 className=" absolute top-0 left-[50%] translate-x-[-50%] sm:left-0 sm:translate-x-[0] opacity-5 text-center text-colorBlack-400 text-8xl font-bold sm:tracking-[35.52px] tracking-[10.52px] ">
            TEZA
          </h3>
        </section>

        <div className="flex flex-wrap justify-between gap-x-2">
          {listPurchaseSteps.map((item) => {
            const { name, step, urlName } = item;
            return (
              <PurchaseSteps
                key={name}
                name={name}
                step={step}
                url={url}
                urlName={urlName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
