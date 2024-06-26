import { useStorePayOrder } from "@/zustand/store";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardOptionPayment from "./CardOptionPayment";

function MainLeftPayment() {
  const { orderData, setOrderData } = useStorePayOrder();
  const { fetchPostOrder } = useStorePayOrder();
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderInfo, setOrderInfo] = useState({
    userId: "",
    cart: [],
    dataPurchase: {},
    totalCart: 0,
    paymentMethod: "",
  });

  const listPayment = [
    {
      name: "Transferencia Bancaria/Mercado pago",
      descrip: "Banco - Mercado pago",
      infoMp:
        "Lorem ipsum dolor sit amet consectetur.Non amet vestibulum vitae amet facilisi sit mauris tortor. Lorem ac faucibus lacinia etiam id varius leo nulla. Sapien quam dignissim rutrum nunc habitant arcu venenatis donec tincidunt.",
      infoBank:
        "Lorem ipsum dolor sit amet consectetur. Non amet vestibulum vitae amet facilisi sit mauris tortor. Lorem ac faucibus lacinia etiam id varius leo nulla. Sapien quam dignissim rutrum nunc habitant arcu venenatis donec tincidunt.",
    },
    {
      name: "MODO",
      descrip: "Inmediato y 6 Cuotas",
      infoMp: "",
      infoBank: "",
    },
  ];

  let cantProduct = 0;

  orderInfo.cart.forEach((item) => {
    cantProduct += item.count;
  });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const dataPurchase = JSON.parse(localStorage.getItem("dataPurchase")) || {};
    const totalCart = localStorage.getItem("TotalCart") || 0;

    if (userId && cart && dataPurchase && totalCart) {
      setOrderInfo((prevOrderInfo) => ({
        ...prevOrderInfo,
        userId,
        cart,
        dataPurchase,
        totalCart,
      }));
    }
  }, []);

  const handleChange = (name /* e */) => {
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      paymentMethod: name,
    }));
  };

  const handleSubmit = async () => {
    await fetchPostOrder(orderInfo);
    Cookies.remove("timePurchase");

    if (listPayment[selectedOption].name === "MODO") {
      // Convertir el objeto orderInfo a una cadena JSON
      const orderInfoString = JSON.stringify(orderInfo);

      // Establecer la cadena JSON en la cookie con nombre "OrderPaymentModo"
      Cookies.set("OrderPaymentModo", orderInfoString);
    }
  };

  useEffect(() => {
    if (orderData) {
      setOrderData({});
    }
  }, []);

  return (
    <div className=" max-w-[460px] w-full h-full">
      <div className="w-full flex flex-col gap-y-6 my-6">
        {listPayment.map((item, index) => {
          const { name, descrip } = item;
          return (
            <CardOptionPayment
              index={index}
              key={index}
              handleChange={handleChange}
              totalCart={orderInfo.totalCart}
              name={name}
              descrip={descrip}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              cantProduct={cantProduct}
            />
          );
        })}
      </div>
      {listPayment[selectedOption]?.name ===
        "Transferencia Bancaria/Mercado pago" && (
        <div className=" flex flex-col gap-y-3 w-full">
          <p className=" text-base text-[#F60909] font-normal">
            ¡Importante! Enviar el comprobante al Email
          </p>
          <section className="flex flex-col gap-y-2">
            <h4 className=" text-base font-semibold">Mercado Pago</h4>
            <p>{listPayment[selectedOption]?.infoMp}</p>
          </section>
          <section className="flex flex-col gap-y-2">
            <h4 className=" text-base font-semibold">Banco</h4>
            <p>{listPayment[selectedOption]?.infoBank}</p>
          </section>
        </div>
      )}
      {orderInfo.paymentMethod && (
        <div className="flex justify-between items-center my-3 w-full">
          <Link href={"/purchase/purchaseSummary"} className="w-full">
            <button
              className="w-full text-sm font-normal py-2 px-6 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase "
              onClick={handleSubmit}
            >
              Finalizar
            </button>
          </Link>
        </div>
      )}
      <Link href={"/purchase/deliveryMode"} className="w-full">
        <button className="w-full text-sm font-normal py-2 px-6 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase ">
          Volver
        </button>
      </Link>
    </div>
  );
}

export default MainLeftPayment;
