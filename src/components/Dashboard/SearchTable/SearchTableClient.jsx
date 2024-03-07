'use client'
import React, { useEffect, useState } from "react";

export default function SearchTableClient({ allList, stateList, setStateList }) {
  const [valueSearch, setValueSearch] = useState(null);
  
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    filterOrders(value);

    if (!value) {
      setStateList(allList);
    }
  };

  useEffect(() => {
    setStateList(allList);
  }, []);

  const filterOrders = (valueParam) => {
    let newAllOrders = allList.filter((order) => {
      if (
        order.name
          .toLowerCase()
          .includes(
            valueParam?.toLowerCase()
          ) 
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
        placeholder="Buscar por Nombre de cliente"
        value={valueSearch}
        onChange={handleChangeInput}
      />
    </div>
  );
}
