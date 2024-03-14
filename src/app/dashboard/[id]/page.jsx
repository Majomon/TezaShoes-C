import OrderIdMain from "@/components/OrderId/OrderIdMain";

/* async function getFetchOrdersId({ id }) {
  const res = await fetch(`${process.env.URL_BASE_DEV}/payOrder/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
} */

export default async function SalesOrderId({ params }) {
  /* const ordersId = await getFetchOrdersId(params); */

  return (
    <div className=" min-h-screen w-full">
      <OrderIdMain params={params}/>
    </div>
  );
}
