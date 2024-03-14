"use client";
import React, { useEffect, useState } from "react";

export default function SearchTable({ allList, setStateList, stateList }) {
  const [valueSearch, setValueSearch] = useState("");

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    filterOrders(value);
  };


  const filterOrders = (valueParam) => {
    let newAllOrders = allList.filter((order) => {
      if (
        order.dataPurchase.name
          .toLowerCase()
          .includes(valueParam?.toLowerCase()) ||
        order.numberOrder.toString().includes(valueParam?.toLowerCase()) ||
        order.totalCart.toString().includes(valueParam?.toLowerCase())
        
      ) {
        return order;
      }
    });
    setStateList(newAllOrders);
  };

  return (
    <div className="mx-auto w-full max-w-[960px] py-2 flex gap-x-2">
      <input
        type="text"
        className="border-1 border-colorGray-100 rounded-lg w-full p-1"
        placeholder="Buscar por Nombre o N° de orden o Total"
        value={valueSearch}
        onChange={handleChangeInput}
      />
    </div>
  );
}
