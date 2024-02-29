"use client";
import PageRouting from "@/components/PageRouting/PageRouting";
import Image from "next/image";
import { useState } from "react";
import bgFrequentQuestions from "../../../assets/image/bgFrequentQuestions.png";

const listQuestionsAndTitle = [
  {
    title: "Como comprar",
    textContent: (
      <ul className=" flex flex-col gap-y-3 font-light list-[upper-roman] animate-appearScale">
        <li>Elige el producto que deseas comprar.</li>
        <li>
          Haz clic en el botón de "Agregar al carrito". Esto agregará el
          producto a tu carrito y te llevará al mismo.
        </li>
        <li>
          Puedes seguir agregando otros productos al carrito o sino haz clic en
          "Iniciar Compra".
        </li>
        <li>Completa tus datos de contacto y haz clic en "Continuar".</li>
        <li>
          Ingresa la dirección a donde deseas recibir el producto. Luego haz
          clic en "Continuar".
        </li>
        <li>
          Selecciona el método de envío que desees y haz clic en "Continuar".
        </li>
        <li>Los envíos los realizamos a través de Correo Argentino.</li>
        <li>Elige el medio de pago.</li>
        <li>También puedes seleccionar la opción de "A convenir".</li>
        <li>
          Una vez que hayas elegido el medio de pago, haz clic en "Continuar".
        </li>
        <li>
          Finalmente en la página de Confirmación de compra puedes revisar toda
          la información de la compra. Luego haz clic en "Continuar".
        </li>
        <li>
          Ahí serás redirigido a otra pantalla para que completes los datos
          sobre la forma de pago elegida. Después de confirmar la compra
          recibirás un correo de nuestra parte, ese no será un comprobante de
          pago.
        </li>
        <li>
          Una vez acreditado el pago, haremos el envío correspondiente de los
          productos que hayas comprado.
        </li>
      </ul>
    ),
  },
  {
    title: "Envios/Pedidos",
    textContent: (
      <div className=" flex flex-col justify-start items-start gap-y-[25px] animate-appearScale">
        <section className="flex flex-col gap-y-[5px] ">
          <h5 className="text-black text-base font-bold">Costo de Envio</h5>
          <p>
            El costo de envío será mostrado en base al total de la compra y
            ubicación, en el checkout, en el momento previo a la compra.
          </p>
        </section>
        <section className="flex flex-col gap-y-[5px]">
          <h5 className="text-black text-base font-bold">
            ¿Dónde puedo recibir mi pedido?
          </h5>
          <p>Realizamos envíos a todo el país.</p>
        </section>
        <section className="flex flex-col gap-y-[5px]">
          <h5 className="text-black text-base font-bold">
            ¿Cuánto tarda en llegar el pedido?
          </h5>
          <p>
            El tiempo de entrega dependerá del tipo de envío seleccionado. En
            general la demora se encuentra entre 3 y 7 días hábiles luego de
            acreditado el pago.
          </p>
        </section>
      </div>
    ),
  },
  {
    title: "Cambios y devoluciones",
    textContent: (
      <section className=" flex flex-col gap-y-5 animate-appearScale">
        <h3 className=" font-semibold">
          Si no estás conforme con nuestro producto, puedes realizar un cambio
          del mismo de alguna de las siguientes formas:
        </h3>
        <p>
          En cualquiera de nuestras tiendas podrás cambiarlo por un producto del
          mismo valor (esto si cuentas con locales a la calle o un showroom).
          Desde tu domicilio. Para eso ponte en contacto a
          Infotezashoes@gmail.com, Whatsapp y nosotros nos pondremos en contacto
          con la empresa de correos para que pasen a retirar el producto. Podrás
          cambiar el producto por otro del mismo valor, que también será enviado
          a tu domicilio y el costo sera cubierto por el comprador. Las
          devoluciones sólo pueden ser realizadas durante los 15 días siguientes
          al pedido.
        </p>
      </section>
    ),
  },
];

export default function FrequentQuestions() {
  const [state, setState] = useState(0);
  const selectStyle =
    "text-colorBlack-400 border-b-1 border-colorGoldSecundary-500";

  const handleClicTitle = (index) => {
    setState(index);
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-[40px] mb-[40px] ">
      <section className="w-full h-[200px] relative top-0 left-0  flex flex-col items-center justify-center gap-y-5">
        <Image
          src={bgFrequentQuestions}
          className="w-full h-full absolute top-0 left-0 object-cover -z-10"
          alt="imgPreguntas"
        />
        <h1 className="opacity-60 text-center text-white text-3xl font-normal font-['Martel'] tracking-[6.40px] md:tracking-[6.40px] md:text-4xl uppercase">
          Preguntas frecuentes
        </h1>
        <PageRouting currentRuat={"Preguntas Frecuentes"} />
      </section>
      <section className="w-full sm:w-11/12 mx-auto flex flex-col gap-y-[30px] px-4 ">
        <section className="flex flex-col gap-y-2">
          <div className="text-center">
            <span className="text-neutral-950 text-4xl font-medium font-['Inter']">
              Como podemos ayudarte
            </span>
            <span className="text-amber-500 text-4xl font-medium font-['Inter']">
              ?
            </span>
          </div>
          <div className="text-center">
            <span className="text-neutral-950 text-lg font-normal font-['Martel']">
              Si te quedo alguna duda podes llamarnos a nuestro numero:
            </span>
            <span className="text-amber-500 text-lg font-semibold font-['Martel']">
              1122334455
            </span>
          </div>
        </section>
        <div className=" flex flex-col sm:flex-row gap-x-14 gap-y-4 sm:mx-auto ">
          {listQuestionsAndTitle.map((item, index) => {
            const { title } = item;
            return (
              <h3
                className={`${
                  state === index ? selectStyle : "text-colorGray-100"
                }  pb-2 cursor-pointer`}
                key={index}
                onClick={() => {
                  handleClicTitle(index);
                }}
              >
                {title}
              </h3>
            );
          })}
        </div>
        <section className=" h-fit overflow-hidden max-w-[1066px] mx-auto">
          {listQuestionsAndTitle[state].textContent}
        </section>
      </section>
    </div>
  );
}
