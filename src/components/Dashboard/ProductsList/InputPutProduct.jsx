function InputForInputPutProductmPurchase({ dataForm, handlerChange, name, place, address }) {
    const dataAddress = dataForm.address || {};
  
    return (
      <div className="h-14">
        {address ? (
          <input
            className="border-colorGoldSecundary-500 border-b-2 focus:outline-none"
            type="text"
            name={name}
            placeholder={place || ""}
            value={dataAddress[name] || ""}
            onChange={handlerChange}
          />
        ) : (
          <input
            className="border-colorGoldSecundary-500 border-b-2 focus:outline-none"
            type="text"
            name={name}
            placeholder={place || ""}
            value={dataForm[name] || ""}
            onChange={handlerChange}
          />
        )}
  
        {/*       {error[name] && (
          <span className="text-xs text-red-400">{error[name]}</span>
        )} */}
      </div>
    );
  }
  
  export default InputPutProduct;
  