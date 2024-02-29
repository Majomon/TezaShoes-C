"use client";
import ContainerAllOrders from "@/components/Dashboard/SalesList/ContainerAllOrders";
import PaginationDashboard from "@/components/PaginateDashboard.jsx/PaginateDashboard";
import listTable from "@/utils/listTabletSaleList";
import { useStoreDashboard } from "@/zustand/store";
import { useState } from "react";

function SalesList() {
  const { allOrders } = useStoreDashboard();

  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  let dimOrders = allOrders?.length;

  return (
    <div className="w-full p-6">
      <h1 className=" font-bold mx-auto w-full max-w-[960px] ">Ventas</h1>
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
