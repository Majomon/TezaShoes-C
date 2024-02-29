import { useEffect, useState } from "react";
import ContainerPurchase from "../ContainerPurchase";

function MainRight() {
  const [total, setTotal] = useState(0);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCart = parseFloat(localStorage.getItem("TotalCart"));

  useEffect(() => {
    setTotal(totalCart);
  }, []);
  return (
    <div className="w-full max-w-[460px]">
      <div>
        <h2 className="py-4 text-base font-normal uppercase text-center lg:text-left">
          Detalles
        </h2>
        <ContainerPurchase cart={cart} totalCart={total} />
      </div>
    </div>
  );
}

export default MainRight;
