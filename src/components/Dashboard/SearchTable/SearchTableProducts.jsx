'use client'
import React, { useEffect, useState } from "react";

export default function SearchTableProducts({ allList, setStateList }) {
  const [valueSearch, setValueSearch] = useState("");
  
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    filterOrders(value);

    /* if (!value) {
      setStateList(allList);
    } */
  };

  /* useEffect(() => {
    setStateList(allList);
  }, []); */

  const filterOrders = (valueParam) => {
    let newAllOrders = allList.filter((order) => {
      if (
        order.name
          .toLowerCase()
          .includes(
            valueParam?.toLowerCase() 
          ) || order.category.toLowerCase().includes(valueParam?.toLowerCase())
      ) {
        return order;
      }
    });
    setStateList(newAllOrders);
  };


  return (
    <div className="mx-auto w-full max-w-[960px] py-2">
      <input
        type="text"
        className="border-1 border-colorGray-100 rounded-lg w-full p-1"
        placeholder="Buscar por Nombre de producto o Categoria"
        value={valueSearch}
        onChange={handleChangeInput}
      />
      {/* stateOrder.length === 0 && <p>no se encontro la busqueda</p> */}
    </div>
  );
}