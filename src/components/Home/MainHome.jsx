"use client";
import { useStoreTimePurchase } from "@/zustand/store";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import CardInfoSet from "../CardInfoSet/CardInfoSet";
import CarruselNewProdTwo from "../Carrusel/CarruselNewProdTwo";
import Categorias from "../Categorias/Categorias";
import MainImage from "../MainImage/MainImage";
import Offer from "../Offer/Offer";
import Title from "../Title/Title";

export default function MainHome() {
  const { setTimePurchase, timePurchase, purchaseCancel, setPurchaseCancel } =
    useStoreTimePurchase();

  useEffect(() => {
    if (timePurchase) {
      toast.success("Se acabó el tiempo 😢. Por favor, vuelve a intentarlo ❤");
      setTimePurchase(false);
    }
    if (purchaseCancel) {
      toast.success("Cancelaste la compra 😢. No seas así 😫");
      setPurchaseCancel(false);
    }
  }, [timePurchase, purchaseCancel]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Toaster position="top-center" />
      <MainImage />
      <Title text={"Nuevo ingreso"} />
      <CarruselNewProdTwo />
      <CardInfoSet />
      <Title text={"Ofertas"} />
      <Offer />
      {/*    <VideoPlay /> */}
      <Title text={"Categorias"} />
      <div className="w-full h-full mx-auto">
        <Categorias />
      </div>
    </div>
  );
}
