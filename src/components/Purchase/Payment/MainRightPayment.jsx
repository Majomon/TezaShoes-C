import { useEffect, useState } from "react";
import ContainerPurchase from "../ContainerPurchase";
import ContainDeliverPersonal from "../Delivery/ContainDeliverPersonal";
import CardDetail from "./CardDetail";

function MainRightPayment() {
  const [cartState, setCartState] = useState([]);
  const [totalState, setTotalState] = useState(0);
  const [storedDataState, setStoredDataState] = useState({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCart = parseFloat(localStorage.getItem("TotalCart"));
    const storedData = JSON.parse(localStorage.getItem("dataPurchase")) || {};
    if (cart && totalCart && storedData) {
      setCartState(cart);
      setTotalState(totalCart);
      setStoredDataState(storedData);
    }
  }, []);

  return (
    <div className=" max-w-[460px] w-full">
      <h2 className="py-4 text-base font-normal uppercase">Detalles</h2>
      <div className="flex flex-col gap-y-4 w-full">
        <ContainerPurchase cart={cartState} totalCart={totalState} />
        <ContainDeliverPersonal storedData={storedDataState} />
        <CardDetail
          title={storedDataState.delivery}
          value={
            storedDataState.delivery === "Retiro por local"
              ? "$0"
              : "A convenir"
          }
        />
      </div>
    </div>
  );
}

export default MainRightPayment;
