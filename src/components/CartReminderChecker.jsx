"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartReminderChecker() {
  const [showCartReminder, setShowCartReminder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cartAbandoned = Cookies.get("cartAbandoned");
    if (cartAbandoned) {
      const abandonedTime = new Date(cartAbandoned);
      const currentTime = new Date();
      const timeDifference = currentTime - abandonedTime;
      const timeLimit = 0.2 * 60 * 1000; // 0.5 minutos (30 segundos)

      if (timeDifference >= timeLimit) {
        setShowCartReminder(true);
      } else {
        const timeoutId = setTimeout(() => {
          setShowCartReminder(true);
        }, timeLimit - timeDifference);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, []);

  const handleDismissReminder = () => {
    setShowCartReminder(false);
    Cookies.remove("cartAbandoned");
  };

  const handleContinueShopping = () => {
    setShowCartReminder(false);
    Cookies.remove("cartAbandoned");
    router.push("/");
  };

  return (
    <>
      {showCartReminder && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-lg z-50">
          <div className="w-11/12 h-2/5 sm:w-96 sm:h-fit bg-white p-8 rounded-lg flex flex-col justify-between shadow-2xl shadow-gray-950 ">
            <div className="text-black text-center mb-4">
              ¡Hey! Parece que olvidaste tu carrito.
            </div>
            <div className="text-gray-600 text-sm mb-6">
              ¡No te pierdas tus artículos favoritos! Continúa comprando ahora 😉.
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg focus:outline-none"
                onClick={handleDismissReminder}
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 rounded-lg focus:outline-none"
                onClick={handleContinueShopping}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
