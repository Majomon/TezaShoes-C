function ContainerDetailsOrders({ cart, selectedOrder, item }) {
  return (
    <>
      <tr key={`${item._id}-details`}>
        <td
          colSpan="8"
          className="w-full border-t-1 border-b-1 border-[#EEEEEE]"
        >
          <table className="w-full my-2">
            <thead>
              <tr className="text-xs text-left ">
                <th className="text-sm font-bold">Producto</th>
                <th className="text-sm font-bold">Cantidad</th>
                <th className="text-sm font-bold">Precio Unitario</th>
                <th className="text-sm font-bold">Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr
                  key={`${product.product_id}-${index}`}
                  className="text-xs text-left"
                >
                  <td className="h-20 flex gap-x-2 items-center">
                    <img
                      src={product.image}
                      className="w-16 h-16 rounded-lg border-1 object-contain"
                      alt="Product"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-colorGoldSecundary-500 text-sm font-bold">
                        {product.name}
                      </p>
                      <p className="text-gray-300 text-sm font-normal">
                        {product.category}
                      </p>
                      <div className="flex gap-x-2">
                        <div className="flex gap-x-1">
                          <p className=" text-sm font-normal">
                            {product.nameColor}
                          </p>
                          {/* <span
                            style={{ backgroundColor: product.color }}
                            className={`rounded-full w-3 h-3 border-1 border-colorGray-100`}
                          ></span> */}
                        </div>
                        <p className=" text-sm font-normal">{product.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className=" text-sm font-normal">{product.count}</td>
                  <td className=" text-sm font-normal">${product.price}</td>
                  <td className=" text-sm font-normal">
                    ${product.totalPrice}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="8">
                  <div className="flex justify-end items-center">
                    <h3 className="font-bold text-base rounded-xl py-1 px-2 bg-neutral-100 border-1 border-colorGray-100">
                      Total de la compra: ${selectedOrder.totalCart}
                    </h3>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
}

export default ContainerDetailsOrders;
