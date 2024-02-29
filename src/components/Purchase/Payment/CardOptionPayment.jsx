export default function CardOptionPayment({
  handleChange,
  totalCart,
  name,
  descrip,
  selectedOption,
  setSelectedOption,
  index,
  cantProduct,
}) {
  return (
    <div
      className=""
      onClick={() => {
        setSelectedOption(index);
        handleChange(name);
      }}
    >
      <div
        name="paymentMethod"
        /* value={name} */
        className={`${
          selectedOption === index
            ? "border-1 border-colorGoldSecundary-500"
            : ""
        } cursor-pointer py-2 px-4 bg-white text-colorBlack-400 w-full h-fit shadow-cardPurchaseShadow rounded-lg flex flex-col gap-y-2`}
        /* onClick={handleChange} */
      >
        <p className="w-full text-left text-lg font-bold">{name}</p>
        <section className="flex justify-between w-full">
          <p className=" text-colorGray-100">{descrip}</p>
          <p className=" font-bold">${totalCart}</p>
        </section>
      </div>
    </div>
  );
}
