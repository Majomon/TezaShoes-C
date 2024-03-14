import ContentMainLeftRight from "./ContentMainLeftRight";

export default function UserIdMain({ userId }) {
  const { name, lastName, orders, _id } = userId;

  /* console.log(userId) */
  return (
    <div className=" w-full max-w-[960px] mx-auto my-3 h-fit flex flex-col gap-y-2">
      <section className=" flex flex-col gap-y-2">
        <h1 className=" text-lg font-bold">Detalle de cliente</h1>
        <p className=" text-lg font-normal">
          {name} {lastName}
        </p>
      </section>
      <ContentMainLeftRight userId={userId} orders={orders} id={_id} />
    </div>
  );
}
