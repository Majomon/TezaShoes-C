"use client";
import ContainerAllOrders from "@/components/Dashboard/SalesList/ContainerAllOrders";
import SearchTable from "@/components/Dashboard/SearchTable/SearchTable";
import PaginationDashboard from "@/components/PaginateDashboard.jsx/PaginateDashboard";
import listTable from "@/utils/listTabletSaleList";
import { useStoreDashboard } from "@/zustand/store";
import { useState } from "react";

function SalesList() {
  const { allOrders, setAllOrders } = useStoreDashboard();

  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [stateOrder, setStateOrder] = useState([]);

  let dimOrders =
    stateOrder?.length === 0 ? allOrders?.length : stateOrder?.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full p-6">
      <h1 className=" font-bold mx-auto w-full max-w-[960px] ">Ventas</h1>
      <SearchTable
        allList={allOrders}
        setStateList={setStateOrder}
        stateList={stateOrder}
      />

      <div className="w-full max-w-[960px] flex flex-col items-center gap-y-2 p-3 border mx-auto border-colorGray-100 bg-white rounded-lg ">
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left">
              {listTable.map((item, index) => {
                return (
                  <th key={index} className=" text-xs font-semibold">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <ContainerAllOrders
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              stateOrder={stateOrder}
            />
          </tbody>
        </table>
        <PaginationDashboard
          totalPagination={dimOrders}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
        />
      </div>
    </div>
  );
}

export default SalesList;
