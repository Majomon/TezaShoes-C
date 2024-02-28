export default function ItemShippingStatus({ option }) {
  return (
    <p
      className={`${
        option === "Enviado"
          ? " bg-colorBlue-100 border-1 border-colorBlue-300"
          : " bg-colorViolet-100 border-1 border-colorViolet-300"
      } px-[8px] py-[3px] rounded-xl text-xs w-fit`}
    >
      {option}
    </p>
  );
}
