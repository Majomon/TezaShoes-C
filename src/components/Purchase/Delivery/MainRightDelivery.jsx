import { useEffect, useState } from "react";
import ContainerPurchase from "../ContainerPurchase";
import ContainDeliverPersonal from "./ContainDeliverPersonal";

function MainRightDelivery() {
  const [cartState, setCartState] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [storedDataState, setStoredDataState] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalCart = parseFloat(localStorage.getItem("TotalCart"));
    const storedData = JSON.parse(localStorage.getItem("dataPurchase"));

    if (cart && totalCart && storedData) {
      setCartState(cart);
      setTotalState(totalCart);
      setStoredDataState(storedData);
    }
  }, []);

  return (
    <div className=" w-full max-w-[460px]">
      <h2 className="py-4 text-left lg:text-base font-normal uppercase">
        Detalles
      </h2>
      <div className=" w-full  flex flex-col gap-y-4">
        <ContainerPurchase
          cart={cartState}
          totalCart={totalState}
          storedData={storedDataState}
        />
        <ContainDeliverPersonal storedData={storedDataState} />
      </div>
    </div>
  );
}

export default MainRightDelivery;
