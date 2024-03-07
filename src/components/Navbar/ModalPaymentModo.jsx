"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import ButtonModo from "../ButtonMODO/ButtonModo";
import ItemCardOrder from "../Account/CardOrder/ItemCardOrder";
import ItemModal from "../Account/CardOrder/ItemModal/ItemModal";
import { useStoreCartLocalStorage, useStorePayOrder, useStoreProducts, useStoreSendEmails, useStoreUsers } from "@/zustand/store";

function ModalPaymentModo({ openModalPaymentModo, setOpenModalPaymentModo }) {
  const { fetchPostPutProductsRestore } = useStoreProducts();
  const { cartLocalStorage } = useStoreCartLocalStorage();
  const { fetchPutUserOrderStatus } = useStoreUsers();
  const { fetchPutOrderId } = useStorePayOrder();
  const { fetchPostOrderCancel } = useStoreSendEmails();

  let varCookies = Cookies.get("OrderPaymentModo");
  let varCookiesOrderData = Cookies.get("orderData");
  const orderDataCookies = varCookiesOrderData ? JSON.parse(varCookiesOrderData) : {};

  const cookiesParsing = varCookies ? JSON.parse(varCookies) : {};
  const { cart, dataPurchase, totalCart } = cookiesParsing;

  const handleClicCancel = async() => {
    await fetchPutOrderId(orderDataCookies._id,{status: "Cancelado"})
    await fetchPostOrderCancel(orderDataCookies);
    if (cookiesParsing.userId.id) {
      await fetchPutUserOrderStatus(cookiesParsing.userId.id, {
        idOrder: orderDataCookies.numberOrder,
        status: "Cancelado",
      });
    }
    Cookies.remove("OrderPaymentModo");
    Cookies.remove("orderData");
    setOpenModalPaymentModo(false);
    fetchPostPutProductsRestore(cartLocalStorage);
  };

  const totalProducts =
    cookiesParsing?.cart?.reduce((acc, item) => acc + item.count, 0) || 0;

  return (
    <div>
      <Modal
        isOpen={openModalPaymentModo}
        placement={"center"}
        backdrop={"opaque"}
        onClose={() => setOpenModalPaymentModo(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h1 className=" text-base font-bold">#{orderDataCookies?.numberOrder}</h1>
          </ModalHeader>
          <ModalBody>
            <section className=" overflow-auto max-h-[350px]">
              {cart ? (
                cart?.map((item, index) => {
                  const {
                    name,
                    image,
                    category,
                    totalPrice,
                    nameColor,
                    size,
                    price,
                    count,
                  } = item;
                  return (
                    <ItemModal
                      key={index}
                      name={name}
                      category={category}
                      image={image}
                      colorName={nameColor}
                      size={size}
                      price={price}
                      count={count}
                      totalPrice={totalPrice}
                    />
                  );
                })
              ) : (
                <p>vacio</p>
              )}
            </section>
            <section className="flex flex-col gap-y-1">
              <article className="flex justify-between">
                <p className="text-colorBlack-400 text-base font-normal">
                  Cantidad
                </p>
                <p className=" text-colorBlack-400 text-base font-bold">
                  {totalProducts}
                </p>
              </article>
              <article className="flex justify-between ">
                <p className="text-colorBlack-400 text-base font-normal">
                  Total
                </p>
                <p className=" text-colorBlack-400 text-base font-bold">
                  ${cookiesParsing.totalCart}
                </p>
              </article>
              {dataPurchase ? (
                <div>
                  <article className="flex flex-col gap-y-1">
                    <h2 className=" text-base font-bold">Metodo de envio:</h2>
                    <p>{dataPurchase.delivery}</p>
                  </article>
                  <article className="flex flex-col gap-y-1">
                    <h2 className=" text-base font-bold">
                      Direccion de envio:
                    </h2>
                    <div className="w-full flex flex-col gap-y-1">
                      <div className="w-full flex items-center justify-between">
                        <p>{dataPurchase.address.street}</p>

                        <p>{dataPurchase.address.number}</p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>{dataPurchase.address.city}</p>

                        <p>{dataPurchase.address.postalCode}</p>
                      </div>
                      <p>{dataPurchase.address.province}</p>
                    </div>
                  </article>
                </div>
              ) : (
                <p className=" text-center">Sin datos</p>
              )}
            </section>
          </ModalBody>
          <ModalFooter>
            <div className="w-fit flex items-center justify-center gap-3">
              <button
                className="border-1 font-regular border-red-500 p-2 w-fit rounded-xl text-base text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                onClick={handleClicCancel}
              >
                Cancelar
              </button>
              <ButtonModo
                totalCart={totalCart}
                cantProduct={totalProducts}
                mockOrder={orderDataCookies?.numberOrder}
                dataId={orderDataCookies?._id}
              />
            </div>
            {/* <button className="border-1 border-green-500 p-2">
              Pagar con Modo
            </button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalPaymentModo;
