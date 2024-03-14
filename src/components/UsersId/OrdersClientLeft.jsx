" use client ";
/* import { useEffect } from "react"; */
import CardOrdersClient from "./CardOrdersClient";

export default function OrdersClient({ orders, id }) {
  
/*   useEffect(() => {
    window.scrollTo(0, 0);
  }, []); */

  return (
    <div className=" bg-white border-1 border-colorGray-100 rounded-lg w-full max-w-[470px]">
      <section className="p-[10px] border-b-1 border-colorGray-100 w-full">
        <h2 className=" text-lg font-bold text-left">
          {orders?.length === 0 ? 0 : orders?.length} Ventas
        </h2>
      </section>
      {orders?.length === 0 ? (
        <p className=" w-full p-5 text-center">Sin ventas</p>
      ) : (
        <section className=" pb-2 overflow-auto h-fit max-h-screen">
          {orders?.map((item) => {
            return <CardOrdersClient key={id} id={id} item={item} />;
          })}
        </section>
      )}
      {/* <section className=" pb-2 overflow-auto h-fit max-h-screen">
        {orders?.map((item) => {
          return <CardOrdersClient key={id} id={id} item={item} />;
        })}
      </section> */}
    </div>
  );
}
