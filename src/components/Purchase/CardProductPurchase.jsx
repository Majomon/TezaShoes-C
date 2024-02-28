function CardProductPurchase({ item }) {

  const {image,name,nameColor,count,totalPrice,category,size,price,offerActive,offerPrice} = item;

  return (
    <div className="flex flex-col  min-[420px]:flex-row w-full justify-between pb-[10px] border-b-1 border-[#EEEEEE]">
      <section className="h-[117px] flex gap-x-1">
        <div className="h-full">
          <img
            src={image}
            alt={name}
            className="w-[100px] h-full rounded-md object-contain"
          />
        </div>
        <div className="flex flex-col gap-y-1 ml-4 h-full justify-between w-[150px] ">
          <h3 className="text-sm font-bold text-colorBlack-400">{name}</h3>
          <h4 className="text-sm font-normal text-colorGray-100">{category}</h4>
          <section className="flex w-full justify-between">
            <p className="text-sm text-colorBlack-400">{nameColor}</p>
            <p className="text-sm text-colorBlack-400">{size}</p>
          </section>
          <section className="flex w-full justify-between">
            {
              offerActive ? <p className="text-sm text-colorBlack-400 font-bold">${offerPrice}</p>
              : <p className="text-sm text-colorBlack-400 font-bold">${price}</p>
            }
            
            <p className="text-sm text-colorGray-100">x{count}</p>
          </section>
        </div>
      </section>
      <section className="flex items-end pt-2">
        <p className=" font-bold text-white bg-colorGoldSecundary-500 py-1 px-3 rounded-2xl">${totalPrice}</p>
      </section>
    </div>
  );
}

export default CardProductPurchase;
