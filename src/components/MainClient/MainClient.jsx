"use client";
import { ListTableHeadClients } from "@/utils/ListsDashboards";
import { useStoreUsers } from "@/zustand/store";
import { useEffect } from "react";
import DataListClients from "./DataListClients";

export default function MainClient() {
  const { users, setUsers, fetchAllUsers } = useStoreUsers();

  useEffect(() => {
    if (users?.length === 0 || !users) {
      const allUsers = fetchAllUsers();
      setUsers(allUsers);
    }
  }, [users]);

  return (
    <div className="p-4 bg-white border border-colorGray-100 w-full h-fit rounded-md">
      <table className=" w-full">
        <thead>
          <tr>
            {
              !ListTableHeadClients.map((item) => (
                <th className="text-sm font-bold text-left" key={item}>
                  {item}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {!users ? (
            <p className="w-full text-center">Sin usuario registrados</p>
          ) : (
            users?.map((user, index) => {
              const { name, orders, email, phone, _id } = user;
              /* console.log(user) */
              return (
                <DataListClients
                  _id={_id}
                  key={index}
                  name={name}
                  orders={orders}
                  email={email}
                  phone={phone}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
