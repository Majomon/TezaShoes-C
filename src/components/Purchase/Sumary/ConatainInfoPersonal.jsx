export default function ContainInfoPersonal({
  name,
  lastName,
  address,
  phone,
  document,
}) {
  return (
    <div className="w-full h-fit px-[10px] py-[15px] shadow-cardPurchaseShadow grid grid-cols-2 rounded-lg ">
      <h4 className=" font-semibold text-colorBlack-400">
        {name} {lastName}
      </h4>
      <p className=" text-right">
        {address?.street /* || "Calle falsa" */},{address?.number /* ||  "123" */}
      </p>
      <p>Dni:{document}</p>
      <p className=" text-right">
        Cp:{address?.postalCode /* || "1000" */},
        {address?.city /* || "Springfield" */}
      </p>
      <p>Tel:{phone}</p>
      <p className=" text-right">
        {address?.province /* || "Buenos Aires" */},
      </p>
    </div>
  );
}
