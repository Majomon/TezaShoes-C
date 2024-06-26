"use client";

import MainLeftPayment from "@/components/Purchase/Payment/MainLeftPayment";
import MainRightPayment from "@/components/Purchase/Payment/MainRightPayment";
import { useEffect } from "react";

export default function PaymentMethod() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center gap-5 lg:items-start lg:flex-row justify-between my-4">
      <MainLeftPayment />
      <MainRightPayment />
    </div>
  );
}
