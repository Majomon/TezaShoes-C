import ShowSizeStock from "./ShowSizeStock";

export default function ShowColorSizeStock({
  color,
  sizes,
  index,
  deleteVariants,
  isOpenMeasure,
}) {
  return (
    <div className="">
      {color.nameColor !== "" && color.codHexadecimal !== "" ? (
        <div className="w-fit rounded-lg px-[10px] py-[5px] shadow-cardPerfilShadow relative">
          <button
            className=" bg-red-500 absolute -top-3 -right-1.5 px-2 rounded-full text-white"
            id={index}
            onClick={deleteVariants}
          >
            x
          </button>
          <section className="flex gap-x-3">
            <div
              className="w-[25px] h-[25px] rounded-full border-1 border-colorGray-100"
              style={{ backgroundColor: color.codHexadecimal }}
            ></div>
            <p>{color.nameColor}</p>
          </section>
          <section className="flex flex-col gap-y-1">
            <p>Talles:</p>
            <article className="flex gap-x-1">
              {sizes.map((subItem, index) => {
                const { size, stock } = subItem;
                return (
                  <ShowSizeStock
                    key={index}
                    size={isOpenMeasure ? 1 : size}
                    stock={stock}
                  />
                );
              })}
            </article>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
