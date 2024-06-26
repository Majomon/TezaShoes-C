"use client";
import { ListTableHeadClients } from "@/utils/ListsDashboards";
import { useEffect } from "react";
import DataListClients from "./DataListClients";

export default function MainClient({ stateList, users, fetchAllUsers }) {
  
  useEffect(() => {
    fetchAllUsers()
  },[])

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
            <p className="w-full text-center">Sin usuarios registrados</p>
          ) : (
            (stateList?.length === 0 ? users : stateList)?.map((user, index) => {
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
