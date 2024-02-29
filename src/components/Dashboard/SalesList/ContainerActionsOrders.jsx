import {
  useStoreDashboard,
  useStorePayOrder,
  useStoreSendEmails,
} from "@/zustand/store";
import { useState } from "react";

function ContainerActionsOrders({ item, openActionsModal }) {
  const { allOrders, setAllOrders } = useStoreDashboard();
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");
  const { fetchPutOrderId } = useStorePayOrder();
  const { fetchPostNotification } = useStoreSendEmails();

  const handleShippingTracking = async () => {
    await fetchPutOrderId(item._id, {
      notificationShipping: { notified: true, courier, tracking },
    });

    await fetchPostNotification(item, {
      notified: true,
      courier,
      tracking,
    });
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

  /*   const handleNotifyShipping = async () => {
        await fetchPostNotification(item, {
      notified: true,
      courier,
      tracking,
    }); 
    await handleShippingTracking(item, {
      notified: true,
      courier,
      tracking,
    });

    openActionsModal(null);
  }; */

  return (
    <div className="h-fit absolute right-[100%] top-0 bg-gray-50 border-1 border-colorGray-100 shadow-cardPerfilShadow rounded-md z-50 p-4 flex flex-col gap-2">
      <input
        type="text"
        name="courier"
        value={courier}
        onChange={handleCourierChange}
        placeholder="Courier"
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        name="tracking"
        value={tracking}
        onChange={handleTrackingChange}
        placeholder="Número de seguimiento"
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={handleShippingTracking}
        className="w-full bg-blue-500 text-white rounded-2xl p-2 cursor-pointer"
      >
        Notificar envío
      </button>
    </div>
  );
}

export default ContainerActionsOrders;
