import DataClient from "./DataClient";
import OrdersClient from "./OrdersClientLeft";

export default function ContentMainLeftRight({ orders, id, userId }) {
  return (
    <div className="w-full h-full flex justify-between">
      <OrdersClient orders={orders} id={id} />
      <DataClient userId={userId} />
    </div>
  );
}
