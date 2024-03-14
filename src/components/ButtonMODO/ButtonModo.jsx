"use client";
import { useStorePayOrder, useStoreSendEmails } from "@/zustand/store";
import Cookies from "js-cookie";

const ButtonModo = ({ totalCart, cantProduct, mockOrder, dataId }) => {
  const { fetchPutOrderId, fetchGetOrder } = useStorePayOrder();
  const { fetchPostStatusPaymentNaty } = useStoreSendEmails();

  const createPaymentIntention = async () => {
    const res = await fetch(
      "https://teza-shoes-api.vercel.app/modo/modoCheckout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: totalCart,
          quantity: cantProduct,
          mockOrder,
        }),
      }
    );

    const jsonRes = await res.json();
    return {
      checkoutId: jsonRes.id,
      qrString: jsonRes.qr,
      deeplink: jsonRes.deeplink,
    };
  };

  const handleSuccess = async () => {
    try {
      Cookies.remove("OrderPaymentModo");
      Cookies.remove("orderData");
      const response = await fetchPutOrderId(dataId, {
        status: "Pago realizado",
      });
      if (response.status === 200) {
        const dataOrder = await fetchGetOrder(dataId);
        fetchPostStatusPaymentNaty(dataOrder);
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const showModal = async () => {
    const modalData = await createPaymentIntention();
    const modalObject = {
      qrString: modalData.qrString,
      checkoutId: modalData.checkoutId,
      deeplink: {
        url: modalData.deeplink,
        callbackURL: "https://tiendadeprueba.com/checkout",
        callbackURLSuccess: "https://tiendadeprueba/thankyou",
      },
      callbackURL: "https://porfolio-three-mocha.vercel.app",
      refreshData: createPaymentIntention,
      onSuccess: handleSuccess,
      onFailure: () => console.log("onFailure"),
      onCancel: () => console.log("onCancel"),
      onClose: () => console.log("onClose"),
    };

    const script = document.createElement("script");
    script.src = "https://ecommerce-modal.modo.com.ar/bundle.js"; // Cambiar a la URL de prueba en ambientes no productivos
    document.head.appendChild(script);
    // Esperar a que el script se cargue antes de inicializar el pago
    script.onload = () => {
      // Inicializar el pago con el SDK de MODO
      ModoSDK.modoInitPayment(modalObject);
    };
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={showModal}
        className="w-fit py-1 px-2 bg-colorGoldSecundary-500 rounded-md hover:bg-yellow-400 hover:shadow-sm  hover:shadow-gray-400"
      >
        Pagar con MODO
      </button>
    </div>
  );
};

export default ButtonModo;
