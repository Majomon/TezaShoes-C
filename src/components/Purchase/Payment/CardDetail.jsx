export default function CardDetail({ title }) {
  let newValue = title === "Retiro por local" ? "$0" : "A convenir";

  return (
    <div className={`shadow-cardPurchaseShadow p-[10px] rounded-lg flex justify-between`}>
      <h3 className=" font-bold text-base">{title}</h3>
      <p className=" text-base font-bold">{newValue}</p>
    </div>
  );
}
