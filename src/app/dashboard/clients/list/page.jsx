"use client";
import SearchTableClient from "@/components/Dashboard/SearchTable/SearchTableClient";
import MainClient from "@/components/MainClient/MainClient";
import { useStoreUsers } from "@/zustand/store";
import { useEffect, useState } from "react";

function ListClients() {
  const { users, setUsers, fetchAllUsers } = useStoreUsers();
  const [stateList, setStateList] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setUsers(users)
    setStateList(users)
  },[users])

  return (
    <div className="w-full p-6">
      <div className=" w-full max-w-[960px] mx-auto flex flex-col gap-y-2">
        <h1 className=" text-base font-bold">Clientes</h1>
        <SearchTableClient
          allList={users}
          setStateList={setStateList}
        />
        <MainClient
          stateList={stateList}
          users={users}
          fetchAllUsers={fetchAllUsers}
        />
      </div>
    </div>
  );
}

export default ListClients;
