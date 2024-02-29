function ContainerOffer({ isOn, handleChangeSwitch }) {
  return (
    <div className="w-full">
      <h2 className=" text-base font-bold">Oferta</h2>
      <div className=" w-full">
        <label
          htmlFor="toggle"
          className="w-full flex items-center cursor-pointer"
        >
          <div className="flex gap-y-4 items-start flex-col w-full ">
            <input
              id="toggle"
              type="checkbox"
              name="offerActive"
              checked={isOn}
              onChange={handleChangeSwitch}
              className="sr-only"
            />
            <div className="relative flex items-center">
              <div
                className={`w-12 h-6 rounded-full shadow-inner ${
                  isOn ? " bg-colorGoldSecundary-500" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`absolute w-5 h-5 bg-gray-100 rounded-full shadow left-1 duration-300  ${
                  isOn
                    ? "transform translate-x-full  border-1 border-gray-400"
                    : "transform -translate-x  border-1 border-gray-400"
                }`}
              ></div>
            </div>
            {/* {isOn && (
              <div className="flex-col w-full ">
                <p className=" text-xs font-normal">Precio de oferta</p>
                <input
                  className="w-full h-full min-h-[30px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
                  name="offerPrice"
                  onChange={handleChangeSwitch}
                />
              </div>
            )} */}
          </div>
        </label>
      </div>
    </div>
  );
}

export default ContainerOffer;
