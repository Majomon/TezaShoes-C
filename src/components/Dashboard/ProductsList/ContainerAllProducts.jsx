"use client";
import PaginationDashboard from "@/components/PaginateDashboard.jsx/PaginateDashboard";
import { listTableProducts } from "@/utils/ListsDashboards";
import { useStoreProducts } from "@/zustand/store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Delete,
  Disabled,
  Edit,
  Enabled,
  Share,
} from "../../../../assets/Dashboard/IconActions";

function ContainerAllProducts() {
  const {
    allProducts,
    fetchPutProductId,
    fetchAllProducts,
    setProducts,
    fetchDeleteProductId,
  } = useStoreProducts();
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * productsPerPage; // 1 * 2 = 2
  const firstIndex = lastIndex - productsPerPage;

  const toggleIsActive = async (productId, currentStatus) => {
    try {
      const updatedProduct = { isActive: !currentStatus };
      await fetchPutProductId(productId, updatedProduct);
      setTimeout(() => {
        setProducts(fetchAllProducts());
      }, 100);
    } catch (error) {
      /* console.error("Error al cambiar el estado del producto:", error); */
      toast.warning("Error al modificar el producto");
    }
  };

  let dimProduct = allProducts?.length;

  const toggleDelete = async (productId) => {
    try {
      await fetchDeleteProductId(productId);
      setTimeout(() => {
        setProducts(fetchAllProducts());
      }, 100);
      toast.success("Producto eliminado");
    } catch (error) {
      /* console.error("Error al cambiar el estado del producto:", error); */
      toast.warning("Error al eliminar el producto");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("URL Copiado");
  };

  /* console.log(allProducts) */
  const totalStockProduct = (options) => {
    let totalStock = 0;
    let listSizes = null;
    options?.forEach((elem) => {
      elem.sizes.forEach((subElem) => (totalStock += subElem.stock));
    });
    /* listSizes.forEach(elem => totalStock += elem.stock) */
    return totalStock;
  };

  const orderWholesaleAllProducts = () => {
    const allProductsWithId = allProducts?.map((item, index) => {
      return { id: index, ...item };
    });

    return allProductsWithId?.sort((a, b) => b.id - a.id);
  };

  /* console.log(allProducts) */

  return (
    <div className="border-1 border-colorGray-100 bg-white rounded-lg p-4">
      <table className="w-full">
        <thead className="">
          <tr className="text-left">
            {listTableProducts.map((item, index) => {
              return (
                <th key={index} className=" text-sm font-bold">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="">
          {!orderWholesaleAllProducts() ? (
            <p className=" text-center w-full">No hay productos</p>
          ) : (
            orderWholesaleAllProducts()
              ?.map((product) => (
                <tr key={product._id} className=" h-[85px] w-full">
                  {/* Imagen y título */}
                  <td className="w-fit flex gap-x-2 ">
                    <img
                      src={product.images[0]}
                      className="w-[70px] h-[70px] border-1 rounded-lg object-contain"
                      alt={`Product ${product._id}`}
                    />
                    <div className="flex flex-col gap-y-2">
                      <h4 className="text-colorGoldSecundary-500 text-sm font-bold">
                        {product.name}
                      </h4>
                      <h4 className=" text-colorGray-100 text-sm font-normal">
                        {product.category}
                      </h4>
                    </div>
                  </td>
                  {/* Stock Total*/}
                  <td className=" text-sm font-normal">
                    {totalStockProduct(product.options)}
                  </td>
                  {/* Precio */}
                  <td className="w-fit h-full">
                    <div className=" flex flex-col items-start h-full ">
                      <h4 className="text-sm">Precio: ${product.price}</h4>
                      {product.offer.offerActive && (
                        <div>
                          <h4 className="text-sm">
                            Oferta: ${product.offer.offerPrice}
                          </h4>
                        </div>
                      )}
                    </div>
                  </td>
                  {/* Renderizado de opciones */}
                  <td className="w-fit h-full">
                    <Dropdown isDisabled={true}>
                      <DropdownTrigger>
                        <p
                          variant="bordered"
                          className="text-sm font-semibold text-colorGoldSecundary-500"
                        >
                          Ver
                        </p>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Static Actions"
                        className=" overflow-auto max-h-[200px]"
                        variant="bordered"
                      >
                        {product.options.map((option, index) => (
                          <DropdownItem key={index}>
                            <h4
                              className="text-sm font-bold py-1"
                              style={{
                                color: option.color.codHexadecimal,
                                WebkitTextStroke: "0.1px #CECECE",
                              }}
                            >
                              {option.color.nameColor}
                            </h4>
                            <ul>
                              {option.sizes.map((size) => {
                                return (
                                  <li key={size._id} className="text-xs">
                                    Talle: {size.size} - Stock: {size.stock}
                                  </li>
                                );
                              })}
                            </ul>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    {/* <button className=" text-sm font-semibold text-colorGoldSecundary-500">
                  Ver
                </button> */}
                    {/* {product.options.map((option) => (
                  <div key={option._id}>
                    <h4 className="text-xs font-bold py-1">
                      {option.color.nameColor}
                    </h4>
                    <ul>
                      {option.sizes.map((size) => (
                        <li key={size._id} className="text-xs">
                          Talle: {size.size} - Stock: {size.stock}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))} */}
                  </td>
                  {/* Acciones */}
                  <td className="w-fit h-full ">
                    <div className="flex justify-start items-start h-full gap-x-2">
                      <div
                        className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                        onClick={() =>
                          copyToClipboard(
                            `http://localhost:3000/detail/${product._id}`
                          )
                        }
                      >
                        <Share />
                      </div>

                      <Link
                        href={`/dashboard/products/listProducts/${product._id}`}
                        className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                      >
                        <Edit />
                      </Link>

                      <div className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full">
                        {product.isActive === true ? (
                          <div
                            onClick={() => toggleIsActive(product._id, true)}
                          >
                            <Enabled />
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleIsActive(product._id, false)}
                          >
                            <Disabled />
                          </div>
                        )}
                      </div>

                      <div
                        className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                        onClick={() => toggleDelete(product._id)}
                      >
                        <Delete />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
              .slice(firstIndex, lastIndex)
          )}
        </tbody>
      </table>
      <PaginationDashboard
        totalPagination={dimProduct}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ContainerAllProducts;
