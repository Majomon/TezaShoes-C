"use client";
import SearchTableClient from "@/components/Dashboard/SearchTable/SearchTableClient";
import MainClient from "@/components/MainClient/MainClient";
import { useStoreUsers } from "@/zustand/store";
import { useState } from "react";

function ListClients() {
  const { users, setUsers, fetchAllUsers } = useStoreUsers();
  const [stateList, setStateList] = useState([]);
  return (
    <div className="w-full p-6">
      <div className=" w-full max-w-[960px] mx-auto flex flex-col gap-y-2">
        <h1 className=" text-base font-bold">Clientes</h1>
        <SearchTableClient
          allList={users}
          stateList={stateList}
          setStateList={setStateList}
        />
        <MainClient
          stateList={stateList}
          users={users}
          setUsers={setUsers}
          fetchAllUsers={fetchAllUsers}
        />
      </div>
    </div>
  );
}

export default ListClients;
