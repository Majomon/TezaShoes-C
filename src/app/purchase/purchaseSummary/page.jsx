"use client";
import MainLeftSumary from "@/components/Purchase/Sumary/MainLeftSumary";
import MainRightSumary from "@/components/Purchase/Sumary/MainRightSumary";
import { useStorePayOrder, useStoreSendEmails } from "@/zustand/store";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function PurchaseSummary() {
  const { orderData } = useStorePayOrder();
  const { fetchPostOrderCreate } = useStoreSendEmails();

  useEffect(() => {
    if (orderData) {
      fetchPostOrderCreate(orderData);
    }
  }, [orderData]);

  if(orderData.paymentMethod === "MODO"){
    let convertToString = JSON.stringify(orderData);
    Cookies.set("orderData",convertToString)
  }

  return (
    <div className="w-full min-h-screen mx-auto">
      <div className="w-full min-[500px]:w-[460px] mx-auto lg:w-full my-4 py-[5px] px-[10px] bg-white text-colorBlack-400 flex justify-between rounded-lg shadow-cardPurchaseShadow">
        <h2 className=" uppercase ">Número de compra</h2>
        <p>#{orderData.numberOrder || "123"}</p>
      </div>
      <div className="w-full h-fit flex justify-between gap-y-[20px] flex-col gap-5 items-center lg:items-start lg:flex-row">
        <MainLeftSumary />
        <MainRightSumary />
      </div>
    </div>
  );
}
