"use client";
import { useEffect, useState } from "react";
import DetailSaleAndClient from "./DetailSaleAndClient";
import { useStorePayOrder } from "@/zustand/store";

export default function OrderIdMain({ params }) {
  const { setOrderId, idOrderData, fetchGetOrder }= useStorePayOrder();

  useEffect(() => {
    fetchGetOrder(params.id);
    return () => {
      setOrderId({})
    };
  }, [params.id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="w-full max-w-[970px] mx-auto my-3 h-fit flex flex-col gap-4 ">
      <DetailSaleAndClient ordersId={idOrderData} />
    </div>
  );
}
