'use client'
import React, { useEffect, useState } from "react";

export default function SearchTableClient({ allList, stateList, setStateList }) {
  const [valueSearch, setValueSearch] = useState(null);
  
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    filterOrders();

    if (!value) {
      setStateList(allList);
    }
  };

  useEffect(() => {
    setStateList(allList);
  }, []);

  const filterOrders = () => {
    let newAllOrders = allList.filter((order) => {
      if (
        order.name
          .toLowerCase()
          .includes(
            valueSearch?.toLowerCase()
          ) /* || order?.totalCart?.toLowerCase().include(valueSearch?.toLowerCase()) */
      ) {
        return order;
      }
    });
    setStateList(newAllOrders);
  };

  /* console.log(stateList) */

  return (
    <div className="mx-auto w-full max-w-[960px] py-2">
      <input
        type="text"
        className="border-1 border-colorGray-100 rounded-lg w-full p-1"
        placeholder="Buscar por Nombre"
        value={valueSearch}
        onChange={handleChangeInput}
      />
      {/* stateOrder.length === 0 && <p>no se encontro la busqueda</p> */}
    </div>
  );
}
