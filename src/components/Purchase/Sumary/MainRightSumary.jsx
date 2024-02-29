import { useStorePayOrder } from "@/zustand/store";
import { redirect } from "next/navigation";
import CardDetail from "../Payment/CardDetail";
import CardPayment from "./CardPayment";
import ContainInfoPersonal from "./ConatainInfoPersonal";
import ItemPaymentStatus from "./ItemPaymentStatus";

function MainRightSumary() {
  const { orderData } = useStorePayOrder();

  const { name, lastName, document, address, phone, delivery, nationality } =
    orderData?.dataPurchase;
  const { paymentMethod } = orderData;

  const dateOrder = (date) => {
    const newDate = date.split("T", 1);
    return newDate.toString();
  };

  if (!orderData) {
    redirect("/");
  }

  return (
    <div className="h-fit max-w-[460px] w-full flex flex-col gap-y-[20px]">
      <section className="h-fit w-full shadow-cardPurchaseShadow flex items-center justify-between p-[10px] rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-base">Estado de pago:</p>

          {orderData?.status && orderData?.status === "Pendiente de pago" ? (
            <ItemPaymentStatus option={"Pendiente"} />
          ) : (
            <ItemPaymentStatus option={"Pagado"} />
          )}
        </div>
        <p className=" text-left">
          {" "}
          {dateOrder(orderData?.date) /* || "2024-02-05" */}
        </p>
      </section>
      <ContainInfoPersonal
        name={name /* || "Nombre" */}
        lastName={lastName /* || "Apellido" */}
        document={document /* ||  "123456789" */}
        address={address}
        phone={phone /* || "+569 123456789" */}
        nationality={nationality}
      />
      <CardDetail title={delivery /* || "Correo Argentino - Classic" */} />
      <CardPayment
        title={paymentMethod /* || "tra" */}
        /* descrip={paymentMethod} */
      />
    </div>
  );
}

export default MainRightSumary;
