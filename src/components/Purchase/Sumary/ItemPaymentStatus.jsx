export default function ItemPaymentStatus({ option }) {
  return (
    <p
      className={`${
        option === "Pendiente"
          ? " bg-colorGoldSecundary-250 border-1 border-colorGoldSecundary-500"
          : option === "Pagado" || option === "Pago realizado"
          ? " bg-[#C5FFC3] border-1 border-[#25D366]"
          : "bg-[#FFBABA] border-1 border-[#F60909]"
      } px-[8px] py-[3px] rounded-xl text-xs w-fit`}
    >
      {option}
    </p>
  );
}
