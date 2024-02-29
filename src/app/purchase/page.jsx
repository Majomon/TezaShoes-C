"use client";
import MainLeft from "@/components/Purchase/Home/MainLeft";
import MainRight from "@/components/Purchase/Home/MainRight";
import { useStoreUsers } from "@/zustand/store";
import { useEffect, useState } from "react";

export default function Purchase() {
  const { userData } = useStoreUsers();
  const [dataForm, setDataForm] = useState([]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevDataForm) => {
      if (
        name === "street" ||
        name === "number" ||
        name === "betweenStreets" ||
        name === "floor" ||
        name === "department" ||
        name === "city" ||
        name === "postalCode" ||
        name === "province"
      ) {
        return {
          ...prevDataForm,
          address: {
            ...prevDataForm.address,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevDataForm,
          [name]: value,
        };
      }
    });
  };

  useEffect(() => {
    const dataPurchase = JSON.parse(localStorage.getItem("dataPurchase"));
    if (dataPurchase) {
      setDataForm(dataPurchase);
    }
  }, [userData]);

  return (
    <div className="w-full min-h-screen mx-auto h-full flex flex-col gap-5 items-center lg:items-start lg:flex-row justify-between my-4 ">
      <MainLeft handlerChange={handlerChange} dataForm={dataForm} />
      <MainRight />
    </div>
  );
}
