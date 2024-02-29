import Link from "next/link";
import { useState } from "react";
import CardOptionDelivery from "./CardOptionDelivery";

function MainLeftDelivery() {
  const listOptionsDelivers = [
    {
      title: "Retiro por local",
      descrip: "ral. Manuel Belgrano 170,San Isidro, Provincia de Buenos Aires",
      value: "$0",
      id: "Retiro por local",
    },
    {
      title: "Correo Argentino",
      descrip: "Clasico",
      value: "A convenir",
      id: "Correo Argentino - Clasico",
    },
    {
      title: "Correo Argentino",
      descrip: "Express",
      value: "A convenir",
      id: "Correo Argentino - Express",
    },
    {
      title: "Correo Argentino Sucursal",
      descrip: "Acordar con el vendedor",
      value: "A convenir",
      id: "Correo Arngentino - Sucursal",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(" ");

  const [state, setState] = useState(null);

  const handleOptionChange = (index, id) => {
    if (index === index) {
      setSelectedOption(id);
    }
  };

  const handleContinue = () => {
    const storedData = JSON.parse(localStorage.getItem("dataPurchase")) || {};

    const newDataPurchase = { ...storedData, delivery: selectedOption };

    localStorage.setItem("dataPurchase", JSON.stringify(newDataPurchase));
  };

  return (
    <div className=" max-w-[460px] w-full">
      {/* <h2>Método de entrega</h2> */}
      <section className="flex flex-col gap-y-[30px] w-full">
        {/* Por local */}
        {listOptionsDelivers.map((item, index) => {
          const { title, descrip, value, id } = item;
          return (
            <CardOptionDelivery
              key={index}
              index={index}
              title={title}
              descrip={descrip}
              value={value}
              id={id}
              state={state}
              setState={setState}
              handleOptionChange={handleOptionChange}
            />
          );
        })}
      </section>
      <section className="flex flex-wrap gap-y-3 gap-x-4 items-center justify-between mt-[30px]">
        <Link href={"/purchase"} className=" w-full sm:w-[180px]">
          <button className="  w-full text-sm font-normal py-2 px-6 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase ">
            Volver
          </button>
        </Link>
        <Link href={"/purchase/paymentMethod"} className=" w-full sm:w-[180px]">
          {state !== null ? (
            <button
              className={` w-full bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-sm font-normal py-2 px-6 text-colorWhite-100 uppercase transition-all`}
              onClick={handleContinue}
            >
              Continuar
            </button>
          ) : (
            <button
              className={` bg-slate-200 w-full text-sm font-normal py-2 px-6 text-colorWhite-100 uppercase`}
              onClick={handleContinue}
              disabled
            >
              Continuar
            </button>
          )}
        </Link>
      </section>
    </div>
  );
}

export default MainLeftDelivery;
