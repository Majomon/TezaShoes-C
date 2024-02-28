export default function ContainDeliverPersonal({ storedData }) {
  const { name, lastName, document, address, phone, nationality } = storedData;
  return (
    <div className="w-full h-fit px-[10px] py-[15px] shadow-cardPurchaseShadow grid grid-cols-1 sm:grid-cols-2 rounded-lg justify-items-start sm:justify-normal gap-2 ">
      <h4 className=" font-semibold text-colorBlack-400">
        {name}.{lastName}
      </h4>
      <p>Dni:{document}</p>
      <p>Tel:{phone}</p>
      <p className=" text-right">
        {address.street},{address.number}
      </p>
      <p>{address.city}</p>
      <p className=" text-right">{address.province}</p>
      <p className="truncate min-w-[128px]">Cp:{address.postalCode}</p>
      <p>{nationality}</p>
    </div>
  );
}
