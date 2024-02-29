function InputCheckbox({ handleChange, item, id }) {
  return (
    <div className="">
      <label htmlFor={id} className="w-fit flex items-center cursor-pointer">
        <div className="flex gap-x-4 items-center">
          <input
            id={id}
            type="checkbox"
            name="offerActive"
            checked={item}
            onChange={handleChange} // Usar onChange en lugar de onClick
            className="sr-only"
          />
          <div className="relative flex items-center">
            <div
              className={`w-12 h-6 rounded-full shadow-inner ${
                item ? " bg-colorGoldSecundary-500" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`absolute w-5 h-5 bg-gray-100 rounded-full shadow left-1 duration-300  ${
                item
                  ? "transform translate-x-full  border-1 border-gray-400"
                  : "transform -translate-x  border-1 border-gray-400"
              }`}
            ></div>
          </div>
        </div>
      </label>
    </div>
  );
}

export default InputCheckbox;
