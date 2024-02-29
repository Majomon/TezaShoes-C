export default function SaleCart({
  index,
  name,
  nameColor,
  size,
  totalPrice,
  price,
  count,
  category,
  image,
}) {
  return (
    <div>
      <div className="w-full flex gap-x-1 h-fit p-[10px]">
        <section className=" w-[70px] h-[70px]">
          <img
            className="w-full h-full rounded-md border-1 object-contain"
            src={image}
            alt={`image ${index}`}
          />
        </section>
        <section className=" flex w-full justify-between gap-x-4">
          <article className=" w-full h-full flex flex-col justify-between pb-1">
            <h5 className=" text-colorGoldSecundary-500 text-sm font-semibold">
              {name}
            </h5>
            <p className=" text-colorGray-100 text-sm font-normal">
              {category}
            </p>
            <div className="flex w-full items-center justify-between gap-x-1">
              <p className=" text-sm font-normal">{nameColor}</p>
              <p className="text-sm font-normal">{size}</p>
            </div>
          </article>
          <article className="flex gap-x-1 items-end p-0 h-full">
            <p>${price}</p>
            <p>x{count}</p>
          </article>
          <article className="flex items-end h-full">
            <p className=" text-base font-bold">${totalPrice}</p>
          </article>
        </section>
      </div>
    </div>
  );
}
