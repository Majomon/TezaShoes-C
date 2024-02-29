import ItemPaymentStatus from "@/components/Purchase/Sumary/ItemPaymentStatus";
import ItemShippingStatus from "@/components/Purchase/Sumary/ItemShippingStatus";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export default function CardOrdersClient({ item, id }) {
  const {
    numberOrder,
    date,
    totalCart,
    dataPurchase,
    status,
    statusDelivery,
    _id,
  } = item;

  return (
    <article className=" border-b-1 border-colorGray-100 p-[10px] w-full h-fit flex flex-col gap-y-2">
      <div className="w-full flex justify-between items-center">
        <Link
          href={`/dashboard/${_id}`}
          className=" cursor-pointer text-colorGoldSecundary-500 text-sm font-bold"
        >
          #{numberOrder}
        </Link>
        <p className="text-sm font-normal">{formatDate(date)}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="text-sm font-normal">
          {dataPurchase?.name} {dataPurchase?.lastName}
        </p>
        <p className=" text-sm font-bold">${totalCart}</p>
      </div>
      <div className="w-full flex justify-start gap-x-2 items-center">
        {console.log(status, statusDelivery)}
        <ItemPaymentStatus
          option={
            status === "Pendiente de pago"
              ? "Pendiente"
              : "Pago realizado" === status
              ? status
              : "Cancelado"
          }
        />
        <ItemShippingStatus option={statusDelivery} />
      </div>
    </article>
  );
}
