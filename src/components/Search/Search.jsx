"use client";
import { capitalize } from "@/utils/capitalize";
import { useStoreProducts, useStoreProductsFilter } from "@/zustand/store";
import {
  Accordion,
  AccordionItem,
  CircularProgress,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import bgSearch from "../../../assets/image/backgroundSearchNew.png";
import Card from "../Card/Card";
import ColorComponent from "../ColorComponent/ColorComponent";
import PageRouting from "../PageRouting/PageRouting";
import SizeComponent from "../SizeComponent/SizeComponent";
import NotProducts from "./NotProducts";

const listOrder = [
  {
    value: "mayor",
    name: "Mayor precio",
  },
  {
    value: "menor",
    name: "Menor precio",
  },
];

export default function Search({ product }) {
  const {
    fetchAllProductsFilter,
    setProductsFilter,
    productsFilter,
    isLoading,
  } = useStoreProducts();
  const {
    selectColor,
    setSelectColor,
    selectSize,
    setSelectSize,
    setSelectOrder,
    selectOrder,
  } = useStoreProductsFilter();
  const [filterColorSize, setFilterColorSize] = useState([]);
  /* const [isLoading,setIsLoading] = useState(true) */
  const searchParams = useSearchParams();
  const searchParamsCategory = useSearchParams().get("category");
  const searchParamsName = useSearchParams().get("name");
  const searchParamsColor = useSearchParams().get("color");
  const searchParamsSize = useSearchParams().get("size");

  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      Pruebando andoooooooooooo
    </div>
  );
}
