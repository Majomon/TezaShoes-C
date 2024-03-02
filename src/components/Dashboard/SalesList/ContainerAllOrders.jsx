"use client";
import { formatDate } from "@/utils/formatDate";
import {
  useStoreDashboard,
  useStorePayOrder,
  useStoreSendEmails,
  useStoreUsers,
} from "@/zustand/store";
import Link from "next/link";
import { useState } from "react";
import { Notify } from "../../../../assets/Dashboard/IconActions";
import ContainerActionsOrders from "./ContainerActionsOrders";
import ContainerDetailsOrders from "./ContainerDetailsOrders";
import DashboardModalClient from "./DashboardModalClient";

function ContainerAllOrders({ currentPage, productsPerPage, stateOrder }) {
  const { allOrders, setAllOrders } = useStoreDashboard();
  const { fetchPostStatusPayment, fetchPostOrderCancel } = useStoreSendEmails();
  const { fetchPutUserOrderStatus } = useStoreUsers();
  const { fetchPutOrderId } = useStorePayOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openSelectecProduct, setOpenSelectecProduct] = useState(false);
  const [cart, setCart] = useState(null);
  const [isOpenModalClient, setIsOpenModalClient] = useState(false);
  const [isOpenModalActions, setIsOpenModalActions] = useState(false);

  const lastIndex = currentPage * productsPerPage; // 1 * 2 = 2
  const firstIndex = lastIndex - productsPerPage; // 2 - 2 = 0

  const openProductModal = (order) => {
    if (
      selectedOrder &&
      selectedOrder._id === order._id &&
      openSelectecProduct
    ) {
      setOpenSelectecProduct(false);
      setSelectedOrder(null);
      setCart(null);
    } else {
      setSelectedOrder(order);
      setOpenSelectecProduct(true);
      setCart(order.cart);
    }
  };

  const openClientModal = () => {
    if (selectedOrder !== null) {
      setSelectedOrder(null);
    }
    setIsOpenModalClient(!isOpenModalClient);
  };

  const openActionsModal = (order) => {
    setIsOpenModalActions(!isOpenModalActions);
    setSelectedOrder(order);
  };

  const handlePaymentStatusChange = async (item, newStatus) => {
    if (newStatus == "Pago realizado") {
      await fetchPostStatusPayment(item);
      if (item.idUserPurchase) {
        await fetchPutUserOrderStatus(item.idUserPurchase, {
          idOrder: item.numberOrder,
          status: newStatus,
        });
      }
    } else if (newStatus === "Cancelado") {
      await fetchPostOrderCancel(item);
      if (item.idUserPurchase) {
        await fetchPutUserOrderStatus(item.idUserPurchase, {
          idOrder: item.numberOrder,
          status: newStatus,
        });
      }
    } else {
      await fetchPutUserOrderStatus(item.idUserPurchase, {
        idOrder: item.numberOrder,
        status: "Pendiente de pago",
      });
    }

    await fetchPutOrderId(item._id, { status: newStatus });
    const updatedOrders = allOrders.map((order) => {
      if (order._id === item._id) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setAllOrders(updatedOrders);
  };

  const handleDeliveryStatusChange = async (item, newStatusDelivery) => {
    await fetchPutOrderId(item._id, { statusDelivery: newStatusDelivery });
    if (item.idUserPurchase) {
      await fetchPutUserOrderStatus(item.idUserPurchase, {
        idOrder: item.numberOrder,
        statusDelivery: newStatusDelivery,
      });
    }
    const updatedOrders = allOrders.map((order) => {
      if (order._id === item._id) {
        return { ...order, statusDelivery: newStatusDelivery };
      }
      return order;
    });
    setAllOrders(updatedOrders);
  };

  const orderWholesaleAllOrders = () => {
    if (stateOrder.length !== 0) {
      return stateOrder?.sort((a, b) => b.numberOrder - a.numberOrder);
    } else {
      return allOrders?.sort((a, b) => b.numberOrder - a.numberOrder);
    }
  };

  return (
    <>
      {!orderWholesaleAllOrders() ? (
        <p className="w-full text-center">Sin ventas</p>
      ) : (
        orderWholesaleAllOrders()
          ?.map((item, index) => [
            <tr key={`${item._id}_${index}`} className="text-xs text-left">
              <td className="text-colorGoldSecundary-500 py-3">
                <Link
                  href={`/dashboard/${item._id}`}
                  className=" cursor-pointer text-xs border-normal"
                >
                  #{item.numberOrder}
                </Link>
              </td>
              <td className="text-sm border-normal">{formatDate(item.date)}</td>
              {item.idUserPurchase ? (
                <td
                  className="text-colorGoldSecundary-500 cursor-pointer text-xs border-normal truncate"
                  /* onClick={openClientModal} */
                >
                  <Link href={`/dashboard/clients/${item.idUserPurchase}`}>
                    {item.dataPurchase.name}
                  </Link>
                </td>
              ) : (
                <td
                  className="text-black text-xs border-normal truncate"
                  /* onClick={openClientModal} */
                >
                  {item.dataPurchase.name}
                </td>
              )}

              <td className="text-xs border-normal">${item.totalCart}</td>
              <td>
                <button
                  onClick={() => openProductModal(item)}
                  className="text-colorGoldSecundary-500 text-xs border-normal"
                >
                  Ver
                </button>
              </td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) =>
                    handlePaymentStatusChange(item, e.target.value)
                  }
                  className={`w-fit ${
                    item.status === "Pago realizado"
                      ? "bg-green-300 border-1 border-green-500 "
                      : item.status === "Cancelado"
                      ? "bg-red-300 border-1 border-red-500 "
                      : "bg-colorGoldSecundary-250 border-1 border-colorGoldSecundary-500"
                  } p-1 rounded-2xl outline-none`}
                >
                  <option value="Pendiente de pago" className=" bg-white">
                    Pendiente de pago
                  </option>
                  <option value="Pago realizado" className=" bg-white">
                    Pago realizado
                  </option>
                  <option value="Cancelado" className="bg-white">
                    Cancelado
                  </option>
                </select>
              </td>
              <td>
                <select
                  value={item.statusDelivery}
                  disabled={item.status === "Cancelado"}
                  onChange={(e) =>
                    handleDeliveryStatusChange(item, e.target.value)
                  }
                  className={`w-fit ${
                    item.statusDelivery === "Empaquetado"
                      ? "bg-blue-300 border-1 border-blue-500"
                      : item.statusDelivery === "Enviado"
                      ? "bg-blue-300 border-1 border-blue-500"
                      : "bg-colorViolet-100 border-1 border-colorViolet-300 "
                  } p-1 rounded-2xl outline-none`}
                >
                  <option value="Por empaquetar" className="bg-white">
                    Por empaquetar
                  </option>
                  {/*  <option value="Empaquetado">Empaquetado</option> */}
                  <option value="Enviado" className="bg-white">
                    Enviado
                  </option>
                </select>
              </td>

              <td className="relative">
                {item.notificationShipping.notified ? (
                  <div className="flex items-center gap-x-1 text-gray-400">
                    <button onClick={() => openActionsModal(item)}>
                      {Notify()}
                    </button>
                    <h2>Nofiticado</h2>
                    {selectedOrder &&
                      isOpenModalActions &&
                      selectedOrder._id === item._id && (
                        <ContainerActionsOrders
                          item={item}
                          openActionsModal={openActionsModal}
                        />
                      )}
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1">
                    <button onClick={() => openActionsModal(item)}>
                      {Notify()}
                    </button>
                    <h2>NOTIFICAR ENVÍO</h2>
                    {selectedOrder &&
                      isOpenModalActions &&
                      selectedOrder._id === item._id && (
                        <ContainerActionsOrders
                          item={item}
                          openActionsModal={openActionsModal}
                        />
                      )}
                  </div>
                )}
              </td>
            </tr>,
            selectedOrder &&
              openSelectecProduct &&
              selectedOrder._id === item._id && (
                <ContainerDetailsOrders
                  key={item._id + "_details"}
                  cart={cart}
                  selectedOrder={selectedOrder}
                  item={allOrders.find(
                    (order) => order._id === selectedOrder._id
                  )}
                />
              ),
          ])
          .slice(firstIndex, lastIndex)
      )}

      <DashboardModalClient
        isOpenModalClient={isOpenModalClient}
        setIsOpenModalClient={setIsOpenModalClient}
      />
    </>
  );
}

export default ContainerAllOrders;
