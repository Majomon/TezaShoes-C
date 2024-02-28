export default function PurchaseSteps({name, step, url,urlName}) {
  return (
    <div className="flex w-[120px]">
      
        <div
          className={`w-full flex flex-col p-[5px] ${
            url === urlName
              ? "text-gray-950 border-1 border-colorGoldSecundary-500 rounded-lg"
              : "text-gray-300"
          }`}
        >
          <div className="flex justify-between gap-x-4 border-b-1 border-[#EEEEEE]">
            <h2 className=" font-semibold text-base">PASO</h2>
            <h2 className=" font-semibold text-base">{step}</h2>
          </div>
          <p
            className={` text-sm uppercase${
              url === urlName
                ? " text-colorGoldSecundary-500"
                : " text-colorGray-100"
            }`}
          >
            {name}
          </p>
        </div>
      
    </div>
  );
}
