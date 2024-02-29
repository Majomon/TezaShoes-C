import CardProductPurchase from "./CardProductPurchase";

function ContainerPurchase({ cart, totalCart }) {
  let cantProduct = 0;
  return (
    <div className="w-full shadow-cardPurchaseShadow px-[10px] py-[15px] rounded-md">
      <div>
        <div>
          {/* <h2>Resumen de compra</h2> */}
          <ul className="grid grid-cols-1 gap-y-6 w-full">
            {cart?.map(
              (item, index) => (
                (cantProduct += item.count),
                (
                  <li key={index} className="flex">
                    <CardProductPurchase item={item} />
                  </li>
                )
              )
            )}
          </ul>
        </div>
        <section className="flex flex-col gap-y-1">
          <div className="flex justify-between items-center py-1">
            <h3 className="text-sm text-colorGray-100">
              Cantidad de productos:
            </h3>
            <p className="text-sm font-bold text-colorBlack-400">
              {cantProduct}
            </p>
          </div>
          <div className="flex justify-between items-center py-1">
            <h3 className="text-sm text-colorGray-100">Total actual:</h3>
            <p className="text-lg font-bold text-colorBlack-400">
              ${totalCart}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContainerPurchase;
