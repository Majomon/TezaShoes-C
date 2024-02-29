import { IconWhatsappClient } from "../../../assets/svg/IconsDashboards";
import ItemPaymentStatus from "../Purchase/Sumary/ItemPaymentStatus";
import ItemShippingStatus from "../Purchase/Sumary/ItemShippingStatus";
import SaleCart from "./SaleCart";

export default function DetailSaleAndClient({ ordersId }) {
  return (
    <div className="w-full max-w-[970px] m-auto h-fit flex flex-col gap-4">
      {ordersId.error ? (
        <p className=" text-center w-full">No existe este numero de orden</p>
      ) : (
        <>
          {/*parte 1: numero de orden y estados*/}
          <section className="flex flex-col gap-y-2">
            <h1 className=" text-lg font-bold">#{ordersId?.numberOrder}</h1>
            <article className=" flex gap-x-2">
              {ordersId?.status && (
                <ItemPaymentStatus
                  option={
                    ordersId?.status === "Pendiente de pago"
                      ? "Pendiente"
                      : "Pago realizado" === ordersId?.status
                      ? ordersId?.status
                      : "Cancelado"
                  }
                />
              )}
              {ordersId?.statusDelivery && (
                <ItemShippingStatus option={ordersId?.statusDelivery} />
              )}
            </article>
          </section>
          <div className="flex justify-between items-start">
            {/*parte 2: Detalles de la compra y cliente*/}
            <section className="flex flex-col gap-y-2 w-full max-w-[470px]">
              <h2 className=" text-lg font-bold">Detalles de compra</h2>
              {/*Detalle de carrito*/}
              <article className="w-full bg-white rounded-lg border-1 border-colorGray-100 ">
                <h2 className="text-lg font-bold p-[10px]">
                  Detalles de carrito
                </h2>
                {ordersId?.cart?.map((item, index) => {
                  const {
                    name,
                    category,
                    image,
                    nameColor,
                    size,
                    count,
                    price,
                    totalPrice,
                  } = item;
                  return (
                    <SaleCart
                      key={index}
                      index={index}
                      image={image}
                      name={name}
                      nameColor={nameColor}
                      size={size}
                      totalPrice={totalPrice}
                      price={price}
                      count={count}
                      category={category}
                    />
                  );
                })}
                <div className=" flex justify-between items-center p-[10px] border-t-1 border-colorGray-100">
                  <p className=" text-sm font-bold">Total</p>
                  <p className=" text-base font-bold">${ordersId?.totalCart}</p>
                </div>
              </article>
              {/*Metodod de pago*/}
              <article className="w-full bg-white rounded-lg border-1 border-colorGray-100 p-[10px]">
                <div className=" flex justify-between items-center">
                  <h2 className=" text-lg font-bold">Metodo de pago</h2>
                  {ordersId?.status && (
                    <ItemPaymentStatus
                      option={
                        ordersId?.status === "Pendiente de pago"
                          ? "Pendiente"
                          : "Pago realizado" === ordersId?.status
                          ? ordersId?.status
                          : "Cancelado"
                      }
                    />
                  )}
                </div>
                <p className=" text-sm font-normal">
                  {ordersId?.paymentMethod}
                </p>
              </article>
              {/*Metodo de envio*/}
              <article className="w-full bg-white rounded-lg border-1 border-colorGray-100 p-[10px]">
                <div className=" flex justify-between items-center ">
                  <h2 className=" text-lg font-bold ">Metodo de envio</h2>
                  {ordersId?.statusDelivery && (
                    <ItemShippingStatus option={ordersId?.statusDelivery} />
                  )}
                </div>
                <p className="text-sm font-normal">
                  {ordersId?.dataPurchase?.delivery}
                </p>
              </article>
            </section>
            <section className="w-full max-w-[470px] flex flex-col gap-y-2 mt-9">
              {/*datos de cliente */}
              <article className=" bg-white border-1 border-colorGray-100 rounded-md p-[10px]">
                <div className=" w-full flex justify-between items-center pb-2">
                  <h2 className=" text-lg font-bold">Datos de cliente</h2>
                  <a
                    href={`https://wa.me/+54${ordersId?.dataPurchase?.phone}`}
                    target="_blank"
                  >
                    <IconWhatsappClient />
                  </a>
                </div>
                <div className=" flex flex-col gap-y-1">
                  <section className="flex gap-x-1">
                    <p className=" text-sm font-normal">
                      {ordersId?.dataPurchase?.name}
                    </p>
                    <p className=" text-sm font-normal">
                      {ordersId?.dataPurchase?.lastName}
                    </p>
                  </section>
                  <p className=" text-sm font-normal">
                    {ordersId?.dataPurchase?.email}
                  </p>
                  <p className=" text-sm font-normal">
                    Tel:{ordersId?.dataPurchase?.phone}
                  </p>
                  <p className=" text-sm font-normal">
                    DNI:{ordersId?.dataPurchase?.document}
                  </p>
                </div>
              </article>
              {/*datos de Direccion */}
              <article className="bg-white border-1 border-colorGray-100 rounded-md p-[10px] gap-y-2">
                <h2 className=" text-lg font-bold pb-2">
                  Direccion de cliente
                </h2>
                <div className=" flex flex-col gap-y-1">
                  <p className="text-sm font-normal">
                    Calle y altura: {ordersId?.dataPurchase?.address?.street},{" "}
                    {ordersId?.dataPurchase?.address?.number}
                  </p>
                  <p className="text-sm font-normal">
                    Localidad: {ordersId?.dataPurchase?.address?.city}
                  </p>
                  <p className="text-sm font-normal">
                    Cp: {ordersId?.dataPurchase?.address?.postalCode}
                  </p>
                  <p className="text-sm font-normal">
                    Entre Calles:{" "}
                    {ordersId?.dataPurchase?.address?.betweenStreets}
                  </p>
                  <p className="text-sm font-normal">
                    Provincia: {ordersId?.dataPurchase?.address?.province}
                  </p>
                </div>
              </article>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
