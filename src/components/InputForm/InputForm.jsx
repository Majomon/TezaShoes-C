"use client";
function InputForm({ inputForm, error, handlerChange, name, options }) {
  return (
    <div >
      {name === "message" ? (
        <div>
          <textarea
            name={name}
            value={inputForm[name]}
            onChange={handlerChange}
            placeholder={options[name] ? options[name] : ""}
            className={`w-full h-28 p-2 text-sm border-b-1 border-b-colorGoldSecundary-500 outline-none ${
              error[name] ? "focus:outline-none" : ""
            }`}
          />
          {error[name] && (
            <span className="text-xs text-red-400">{error[name]}</span>
          )}
        </div>
      ) : (
        <div className="h-14">
          <input
            type="text"
            name={name}
            value={inputForm[name]}
            onChange={handlerChange}
            placeholder={options[name] ? options[name] : ""}
            className={`w-full h-12 pl-2 text-sm border-b-1 border-b-colorGoldSecundary-500 outline-none ${
              error[name] ? "focus:outline-none" : ""
            }`}
          />
          {error[name] && (
            <span className="text-xs text-red-400">{error[name]}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default InputForm;

/* placeholder={name.charAt(0).toUpperCase() + name.slice(1)}  */
