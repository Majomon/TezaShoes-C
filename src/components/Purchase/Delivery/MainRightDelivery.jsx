import { useEffect, useState } from "react";
import ContainerPurchase from "../ContainerPurchase";
import ContainDeliverPersonal from "./ContainDeliverPersonal";

function MainRightDelivery() {
  const [total, setTotal] = useState(0);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCart = parseFloat(localStorage.getItem("TotalCart"));
  const storedData = JSON.parse(localStorage.getItem("dataPurchase")) || {};

  useEffect(() => {
    setTotal(totalCart);
  }, []);

  return (
    <div className=" w-full max-w-[460px]">
      <h2 className="py-4 text-center lg:text-base font-normal uppercase">Detalles</h2>
      <div className=" w-full  flex flex-col gap-y-4">
        
        <ContainerPurchase cart={cart} totalCart={total} storedData={storedData} />
        <ContainDeliverPersonal 
          storedData={storedData}
        />
      </div>
    </div>
  );
}

export default MainRightDelivery;
