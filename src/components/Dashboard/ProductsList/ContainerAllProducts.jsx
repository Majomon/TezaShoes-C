"use client";
import PaginationDashboard from "@/components/PaginateDashboard.jsx/PaginateDashboard";
import { listTableProducts } from "@/utils/ListsDashboards";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Delete,
  Disabled,
  Edit,
  Enabled,
  Share,
} from "../../../../assets/Dashboard/IconActions";
import { usePathname } from "next/navigation";

function ContainerAllProducts({
  allProducts,
  fetchPutProductId,
  fetchDeleteProductId,
  stateList,
  /* setProducts, */
  /* setStateList */
  fetchAllProducts,
}) {
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * productsPerPage; // 1 * 2 = 2
  const firstIndex = lastIndex - productsPerPage;
  const urlDeploy = "https://www.mongar.tech";

  /* por cada renderizado va a a setear en la allProducts y traera actaulizado la lista desde el esatdo global afectando a todo el componente de la page  */

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const toggleIsActive = async (productId, currentStatus) => {
    try {
      const updatedProduct = { isActive: !currentStatus };
      await fetchPutProductId(productId, updatedProduct);
    } catch (error) {
      toast.warning("Error al modificar el producto");
    }
  };

  let dimProduct = stateList?.length;

  const toggleDelete = async (productId) => {
    try {
      await fetchDeleteProductId(productId);
    } catch (error) {
      toast.warning("Error al eliminar el producto");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("URL Copiado");
  };

  const totalStockProduct = (options) => {
    let totalStock = 0;
    options?.forEach((elem) => {
      elem.sizes.forEach((subElem) => (totalStock += subElem.stock));
    });
    return totalStock;
  };

  const orderWholesaleAllProducts = () => {
    /* if (stateList?.length === 0) {
      const allProductsWithId = allProducts?.map((item, index) => {
        return { id: index, ...item };
      });
      return allProductsWithId?.sort((a, b) => b.id - a.id);
    } else {
      const allStateListWithId = stateList?.map((item, index) => {
        return { id: index, ...item };
      });
      return allStateListWithId?.sort((a, b) => b.id - a.id);
    } */
    const allStateListWithId = stateList?.map((item, index) => {
      return { id: index, ...item };
    });
    return allStateListWithId?.sort((a, b) => b.id - a.id);
  };

  /* console.log(orderWholesaleAllProducts()?.map(item => item)) */
  /* console.log(stateList); */

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
            <p className=" text-center w-full">Cargando...</p>
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
                  </td>
                  {/* Acciones */}
                  <td className="w-fit h-full ">
                    <div className="flex justify-start items-start h-full gap-x-2">
                      <Tooltip
                        content="Compartir"
                        delay={0}
                        closeDelay={0}
                        placement={"top-end"}
                      >
                        <div
                          className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                          onClick={() =>
                            copyToClipboard(
                              copyToClipboard(
                                `${urlDeploy}/detail/${product._id}`
                              )
                            )
                          }
                        >
                          <Share />
                        </div>
                      </Tooltip>

                      <Tooltip
                        content="Editar"
                        delay={0}
                        closeDelay={0}
                        placement={"top-end"}
                      >
                        <Link
                          href={`/dashboard/products/listProducts/${product._id}`}
                          className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                        >
                          <Edit />
                        </Link>
                      </Tooltip>

                      <div className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full">
                        {product.isActive === true ? (
                          <Tooltip
                            content="Visible"
                            delay={0}
                            closeDelay={0}
                            placement={"top-end"}
                          >
                            <div
                              onClick={() => toggleIsActive(product._id, true)}
                            >
                              <Enabled />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content="No visible"
                            delay={0}
                            closeDelay={0}
                            placement={"top-end"}
                          >
                            <div
                              onClick={() => toggleIsActive(product._id, false)}
                            >
                              <Disabled />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      <Tooltip
                        content="Eliminar"
                        delay={0}
                        closeDelay={0}
                        placement={"top-end"}
                      >
                        <div
                          className=" h-fit p-1 cursor-pointer border-1 border-gray-300 rounded-full"
                          onClick={() => toggleDelete(product._id)}
                        >
                          <Delete />
                        </div>
                      </Tooltip>
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
