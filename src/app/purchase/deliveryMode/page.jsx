"use client";
import MainLeftDelivery from "@/components/Purchase/Delivery/MainLeftDelivery";
import MainRightDelivery from "@/components/Purchase/Delivery/MainRightDelivery";
import { useEffect } from "react";

export default function DeliveryMode() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center gap-5 justify-between my-4 lg:items-start lg:flex-row ">
      <MainLeftDelivery />
      <MainRightDelivery />
    </div>
  );
}
