import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IconMailListClients,
  IconWhatsappListClients,
} from "../../../assets/svg/IconsDashboards";
import { Tooltip } from "@nextui-org/react";

export default function DataListClients({ name, orders, email, phone, _id }) {
  const [idUser, setIdUser] = useState(0);

  const totalPaymentOrders = () => {
    let totalPaymentCart = 0;
    let cartList = null;
    orders.forEach((elem) => {
      cartList = elem.cart;
    });

    cartList?.forEach((item) => {
      totalPaymentCart += item.totalPrice;
    });
    return totalPaymentCart;
  };

  const lastOrderDate = () => {
    let dimOrders = orders.length - 1;
    return formatDate(orders[dimOrders].date);
  };

  const lastOrderId = () => {
    let dimOrders = orders.length - 1;
    return orders[dimOrders]?.numberOrder;
  };

  useEffect(() => {
    orders?.forEach((elem) => {
      setIdUser(elem._id);
    });
  }, []);

  return (
    <tr className=" text-left ">
      <th className=" font-normal text-colorGoldSecundary-500">
        <Link href={`/dashboard/clients/${_id}`} className=" cursor-pointer">
          {name}
        </Link>
      </th>
      <th className="text-sm font-normal">
        {!lastOrderId() ? (
          <p>--</p>
        ) : (
          <div className=" flex gap-1">
            <p>{lastOrderDate()}</p>
            <span
              className={`${
                lastOrderId() === 0
                  ? " text-black"
                  : "text-colorGoldSecundary-500 cursor-pointer"
              } `}
            >
              <Link href={`/dashboard/${idUser}`}>#{lastOrderId()}</Link>
            </span>
          </div>
        )}
      </th>

      <th className="text-sm font-normal">
        <div className=" flex items-center">
          ${totalPaymentOrders() === 0 ? <p>--</p> : totalPaymentOrders()}
        </div>
      </th>
      <th className=" flex gap-3">
        <Tooltip
          content="Whatsapp"
          delay={0}
          closeDelay={0}
          placement={"top-end"}
        >
          <Link
            href={`https://wa.me/+549${phone}`}
            className=" border-1 border-colorGray-100 rounded-full p-1.5"
          >
            <IconWhatsappListClients />
          </Link>
        </Tooltip>
        <Tooltip
          content="Correo"
          delay={0}
          closeDelay={0}
          placement={"top-end"}
        >
          <Link
            href={`mailto:${email}`}
            className=" border-1 border-colorGray-100 rounded-full p-1.5 flex items-center justify-center"
          >
            <IconMailListClients />
          </Link>
        </Tooltip>
      </th>
    </tr>
  );
}
