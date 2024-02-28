"use client";
import ItemPaymentStatus from "@/components/Purchase/Sumary/ItemPaymentStatus";
import { useState } from "react";
import ModalCardCart from "./ModalCardCart";

export default function ItemCardOrder({
  numberOrder,
  date,
  status,
  totalCart,
  cantCart,
  cart,
  paymentMethod,
  address,
  statusDelivery,
}) {
  const [isOpenModalCard, setIsOpenModalCard] = useState(false);

  const dateOrder = (date) => {
    const newDate = date.split("T", 1);
    return newDate.toString();
  };

  return (
    <div
      className="max-w-[700px] w-full border-1 mx-auto h-fit px-[5px] py-2.5 rounded-[5px] shadow-inputPerfilShadow flex flex-col justify-between cursor-pointer hover:border-2 hover:border-colorGoldSecundary-500"
      onClick={() => setIsOpenModalCard(!isOpenModalCard)}
    >
      <section className="flex flex-row justify-between h-full">
        <h4 className="text-black text-ms font-semibold">
          id: <span>{numberOrder}</span>
        </h4>
        <p className="text-stone-300 text-ms font-normal">{dateOrder(date)}</p>
      </section>
      <section className="flex flex-row justify-between items-center h-full">
        <article>
          <p className="text-stone-300 text-sm font-normal">
            Cantidad: {cantCart}
          </p>
          <p className="text-black sm:hidden text-ms font-semibold">${totalCart}</p>
        </article>
        <article className="flex flex-col sm:flex-row justify-center gap-2 w-fit">
          <p className="text-black hidden sm:block text-ms font-semibold">${totalCart}</p>
          <p className="text-xs py-1">{statusDelivery}</p>
          {paymentMethod === "MODO" ? (
            <ItemPaymentStatus option={"Pagado"} />
          ) : (
            <ItemPaymentStatus option={"Pendiente"} />
          )}
        </article>
      </section>
      <ModalCardCart
        numberOrder={numberOrder}
        isOpenModalCard={isOpenModalCard}
        setIsOpenModalCard={setIsOpenModalCard}
        cart={cart}
        paymentMethod={paymentMethod}
        address={address}
      />
    </div>
  );
}
