
function InputShipping({ nameLabel, nameInput, dataShipping, handleChange }) {
  return (
    <div className="py-2 px-4 flex flex-col items-start">
      <label className="text-center text-stone-300 text-sm font-normal">{nameLabel}:</label>
      <input
        className="bg-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow"
        name={nameInput}
        onChange={handleChange}
        placeholder={dataShipping ? dataShipping[nameInput] : ""}
        value={dataShipping ? dataShipping[nameInput] : ""}
      />
    </div>
  );
}

export default InputShipping;
