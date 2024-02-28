"use client";
import ItemCardOrder from "@/components/Account/CardOrder/ItemCardOrder";
import ContainerInputPersonalInformation from "@/components/Account/ContainerInputPersonalInformation";
import ContainerInputShipping from "@/components/Account/ContainerInputShipping";
import { useStoreUsers } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAccountPage = (userId) => {


  return {
    userData,
    isSelect,
    setIsSelect,
    listForms,
    setIsOpenModal,
    isOpenModal,
  };
};
