import { useEffect, useState } from "react";
import ContainerPurchase from "../ContainerPurchase";

function MainRight() {
  const [totalState, setTotalState] = useState(0);
  const [cartState, setCartState] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalCart = parseFloat(localStorage.getItem("TotalCart"));
    if (cart && totalCart) {
      setCartState(cart);
      setTotalState(totalCart);
    }
  }, []);

  return (
    <div className="w-full max-w-[460px]">
      <div>
        <h2 className="py-4 text-base font-normal uppercase text-center lg:text-left">
          Detalles
        </h2>
        <ContainerPurchase cart={cartState} totalCart={totalState} />
      </div>
    </div>
  );
}

export default MainRight;
