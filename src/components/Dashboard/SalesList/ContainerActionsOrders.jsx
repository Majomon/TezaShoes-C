import {
  useStoreDashboard,
  useStorePayOrder,
  useStoreSendEmails,
  useStoreUsers,
} from "@/zustand/store";
import { useState } from "react";

function ContainerActionsOrders({ item, setIsOpenModalActions }) {
  const { allOrders, setAllOrders } = useStoreDashboard();
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");
  const { fetchPutOrderId } = useStorePayOrder();
  const { fetchPostNotification } = useStoreSendEmails();
  const { fetchPutUserOrderStatus } = useStoreUsers();

  const handleShippingTracking = async () => {
    /* Modifico la orden */
    await fetchPutOrderId(item._id, {
      notificationShipping: { notified: true, courier, tracking },
    });

    /* Envio el email de notificación */
    await fetchPostNotification(item, {
      notified: true,
      courier,
      tracking,
    });

    /* Modifico la orden del usuario */
    if (item.idUserPurchase) {
      await fetchPutUserOrderStatus(item.idUserPurchase, {
        idOrder: item.numberOrder,
        notificationShipping: { notified: true, courier, tracking },
      });
    }

    const updatedOrders = allOrders.map((order) => {
      if (order._id === item._id) {
        return {
          ...order,
          notificationShipping: { notified: true, courier, tracking },
        };
      }
      return order;
    });

    setAllOrders(updatedOrders);
  };

  const handleCourierChange = (e) => {
    setCourier(e.target.value);
  };

  const handleTrackingChange = (e) => {
    setTracking(e.target.value);
  };

  return (
    <div className="h-fit absolute right-[100%] top-0 bg-gray-50 shadow-cardPerfilShadow rounded-md z-50 p-4 flex flex-col gap-2 transition-all duration-200">
      <div
        className=" absolute top-0 right-[1px] text-sm text-colorBlack-400 font-normal px-1 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpenModalActions(false)}
      >
        x
      </div>
      <input
        type="text"
        name="courier"
        value={courier}
        onChange={handleCourierChange}
        placeholder="Mensajeria"
        className="border border-gray-300 rounded-md p-2 text-black"
      />
      <input
        type="text"
        name="tracking"
        value={tracking}
        onChange={handleTrackingChange}
        placeholder="Número de seguimiento"
        className="border border-gray-300 rounded-md p-2 text-black"
      />
      {courier && tracking ? (
        <button
          onClick={handleShippingTracking}
          className="w-full bg-colorGoldSecundary-500 text-white rounded-2xl p-2 cursor-pointer"
        >
          Notificar envío
        </button>
      ) : (
        <button
          onClick={handleShippingTracking}
          disabled
          className="w-full bg-colorGoldSecundary-250 text-white rounded-2xl p-2"
        >
          Notificar envío
        </button>
      )}
      {/* <button
        onClick={handleShippingTracking}
        className="w-full bg-blue-500 text-white rounded-2xl p-2 cursor-pointer"
      >
        Notificar envío
      </button> */}
    </div>
  );
}

export default ContainerActionsOrders;
