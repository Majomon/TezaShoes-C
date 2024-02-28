import {
  useStoreCartLocalStorage,
  useStoreProducts,
  useStoreTimePurchase,
} from "@/zustand/store";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const TemporizadorDeCompra = ({ initialSeconds = 600 }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const { fetchPostPutProductsRestore } = useStoreProducts();
  const { setTimePurchase, setPurchaseCancel, isFinished } =
    useStoreTimePurchase();
  const { cartLocalStorage } = useStoreCartLocalStorage();
  const [isOk, setIsOk] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const startTime = Cookies.get("timePurchase");
    if (startTime) {
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      const newRemainingSeconds = initialSeconds - elapsedTimeInSeconds;
      setRemainingSeconds(newRemainingSeconds >= 0 ? newRemainingSeconds : 0);
    }

    const timer = setInterval(async () => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          Cookies.remove("timePurchase");
          /*           localStorage.removeItem("cart");
            localStorage.removeItem("TotalCart"); */
          fetchPostPutProductsRestore(cartLocalStorage);
          setIsOk(true);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isOk === true) {
      setIsOk(false);
      setTimePurchase(true);
      redirect("/");
    }
    if (isCancel === true) {
      setPurchaseCancel(true);
      setIsCancel(false);
      redirect("/");
    }
  }, [isOk, isCancel]);

  const formattedTime = `${Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(remainingSeconds % 60).toString().padStart(2, "0")}`;

  const handlerSubmit = () => {
    fetchPostPutProductsRestore(cartLocalStorage);
    Cookies.remove("timePurchase");
    setIsCancel(true);
  };

  return (
    <div className="w-fit h-fit mx-auto gap-2 text-gray-950 font-bold text-lg bg-gray-50 py-4 px-6 rounded-br-sm rounded-bl-sm  flex flex-col fixed inset-0 border-l-1 border-r-1 border-b-1  border-gray-300  shadow-xl z-50">
      <div className="flex gap-2">
        <h2> Tiempo restante y contando perro: {formattedTime}</h2>
        <button
          className="text-red-600 hover:text-red-400 relative"
          onMouseEnter={() => {
            document
              .getElementById("cancel-text")
              .classList.remove("opacity-0");
          }}
          onMouseLeave={() => {
            document.getElementById("cancel-text").classList.add("opacity-0");
          }}
          onClick={() => handlerSubmit()}
        >
          X
          <span
            id="cancel-text"
            className="w-fit absolute top-5 text-sm  bg-gray-100 text-gray-700 px-2 py-1 rounded shadow-md opacity-0 transition-opacity duration-300 pointer-events-none"
          >
            Cancelar compra
          </span>
        </button>
      </div>
      {!pathname.startsWith("/purchase") && (
        <div className="w-full h-fit flex justify-center items-center">
          <Link
            href={"/purchase"}
            className=" bg-gray-500 py-1 px-2 rounded-md hover:bg-gray-400 hover:text-white"
          >
            Continuar con la compra
          </Link>
        </div>
      )}
    </div>
  );
};

export default TemporizadorDeCompra;
