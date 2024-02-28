export default function CardOptionDelivery({
  index,
  state,
  setState,
  handleOptionChange,
  id,
  title,
  value,
  descrip
}) {
  return (
    <div
      className={`shadow-cardPurchaseShadow p-[10px] rounded-lg cursor-pointer w-full ${
        state === index ? " border-1 border-colorGoldSecundary-500" : " "
      }`}
      onClick={() => {
        setState(index);
        handleOptionChange(index, id);
      }}
    >
      <h3 className=" font-bold text-base">{title}</h3>
      <section className="flex justify-between items-end" id={id}>
        <p className=" text-xs font-normal text-colorGray-100 w-2/3 ">
          {descrip}
        </p>
        <p className=" sm:text-base font-bold text-sm">{value}</p>
      </section>
    </div>
  );
}
