import DetailSaleAndClient from "./DetailSaleAndClient";

export default function OrderIdMain({ ordersId }) {
  return (
    <div className="w-full max-w-[970px] mx-auto my-3 h-fit flex flex-col gap-4 ">
      <DetailSaleAndClient ordersId={ordersId}/>
    </div>
  );
}
