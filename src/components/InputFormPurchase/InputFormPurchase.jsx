function InputFormPurchase({
  dataForm,
  handlerChange,
  name,
  place,
  address,
  errors,
}) {
  const dataAddress = dataForm.address || {};
  const error = errors[name] || "";

  return (
    <div className="w-full h-fit flex flex-col items-center p-[15px] rounded-lg">
      {address ? (
        <input
          className="border-colorGoldSecundary-500 border-b-2 focus:outline-none w-full pb-1"
          type="text"
          name={name}
          placeholder={place || ""}
          value={dataAddress[name] || ""}
          onChange={handlerChange}
        />
      ) : (
        <input
          className="border-colorGoldSecundary-500 border-b-2 focus:outline-none w-full pb-1"
          type="text"
          name={name}
          placeholder={place || ""}
          value={dataForm[name] || ""}
          onChange={handlerChange}
          autoComplete="off"
        />
      )}
      {error && <p className="text-xs text-red-400 py-2">{error}</p>}
    </div>
  );
}

export default InputFormPurchase;
