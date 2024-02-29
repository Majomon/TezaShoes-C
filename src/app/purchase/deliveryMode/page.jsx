"use client";
import MainLeftDelivery from "@/components/Purchase/Delivery/MainLeftDelivery";
import MainRightDelivery from "@/components/Purchase/Delivery/MainRightDelivery";

export default function DeliveryMode() {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center gap-5 justify-between my-4 lg:items-start lg:flex-row ">
      <MainLeftDelivery />
{/*       <MainRightDelivery /> */}
    </div>
  );
}
