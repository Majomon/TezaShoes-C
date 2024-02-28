import {
  useStoreCartLocalStorage,
  useStoreProducts
} from "@/zustand/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckStockBeforePurchase from "../CheckStockBeforePurchase";

export default function TotalCart({ setIsOpenCart }) {
  const listCart = localStorage.getItem("cart");
  const { fetchPostPutProducts } = useStoreProducts();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modificado, setModificado] = useState(false);
  const { cartLocalStorage, setCartLocalStorage, totalCart, setTotalCart } =
    useStoreCartLocalStorage();

  const resultTotal = () => {
    const result = cartLocalStorage?.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);
    setTotalCart(result);
    localStorage.setItem("TotalCart", result);
  };

  useEffect(() => {
    if (modificado) {
      setCartLocalStorage(JSON.parse(listCart));
      resultTotal();
      setModificado(false);
    }
  }, [modificado]);

  const handleSubmit = async (data) => {
    try {
      // Verificar el stock antes de proceder con la compra
      const stockCheckResult = await CheckStockBeforePurchase(data);

      // Si todos los productos están disponibles
      if (stockCheckResult === true) {
        await fetchPostPutProducts(data);
        setIsOpenCart(false);
        const minutes = 1 * 60;
        Cookies.set("timePurchase", new Date().getTime(), {
          expires: minutes,
        });
        router.push("/purchase");
      } else {
        setModalMessage(stockCheckResult);
        setShowModal(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModificado(true);
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <section className=" px-[10px] lg:px-[20px] mt-5 flex flex-col gap-y-[10px]">
      <article className="flex flex-row justify-between">
        <h3 className=" text-lg font-light">Total</h3>
        <p className=" text-lg font-semibold">${totalCart}</p>
      </article>
      {/*       <Link href={"/purchase"}> */}
      <button
        className=" bg-colorBlack-400 text-colorWhite-100 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black w-[100%] uppercase h-12"
        onClick={() => handleSubmit(cartLocalStorage)}
      >
        Completar Compra
      </button>

      {/*    </Link> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white p-4 rounded-md">
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-2 py-1 px-2 text-gray-50 bg-gray-800 rounded-sm shadow-md shadow-gray-100"
            >
              Cerrar
            </button>
            <p className="text-4xl font-bold ">{modalMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}
