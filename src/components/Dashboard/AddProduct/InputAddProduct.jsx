function InputAddProduct({ dataForm, handleChange, name, place, address }) {
  return (
    <div className="">
      {place === "Descripción" || place === "Descripcion de Medidas" ? (
        <div className="w-full h-fit">
          <label className=" text-xs font-normal">{place}</label>
          <textarea
            className="w-full h-full min-h-[80px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
            name={name}
            value={dataForm[name] || ""}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <label className=" text-xs font-normal">
            {place === "Precio" ? `${place} Real` : place}
          </label>
          <input
            className="w-full h-full min-h-[30px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
            type="text"
            name={name}
            /* placeholder={place || ""} */
            value={dataForm[name] || ""}
            onChange={handleChange}
          />
        </div>
      )}

      {/*       {error[name] && (
          <span className="text-xs text-red-400">{error[name]}</span>
        )} */}
    </div>
  );
}

export default InputAddProduct;
