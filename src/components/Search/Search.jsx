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
  /*   const searchParamsCategory = useSearchParams().get("category");
  const searchParamsName = useSearchParams().get("name");
  const searchParamsColor = useSearchParams().get("color");
  const searchParamsSize = useSearchParams().get("size"); */

  let listProductColors = filterColorSize?.map((item) =>
    item.options.map((subItem) => subItem.color)
  );

  let ListProductSize = filterColorSize?.map((item) =>
    item.options.map((subItem) => subItem.sizes)
  );

  const loadProductsFilterCategory = (product) => {
    setFilterColorSize(
      product?.filter((item) => item.category === searchParamsCategory)
    );
  };

  const loadProductsFilterParamsName = (product) => {
    setFilterColorSize(
      product.filter((item) =>
        item.name.toLowerCase().includes(searchParamsName?.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = Object.fromEntries(searchParams.entries());
      let response = await fetchAllProductsFilter(
        queryParams,
        searchParamsName,
        searchParamsColor,
        searchParamsSize
      );
    };
    fetchData();
  }, [
    searchParams,
    searchParamsCategory,
    searchParamsName,
    searchParamsColor,
    searchParamsSize,
  ]);

  useEffect(() => {
    if (searchParamsCategory) {
      loadProductsFilterCategory(product);
    } else {
      loadProductsFilterParamsName(product);
    }
  }, [searchParams, searchParamsCategory, searchParamsName]);

  const listNoRepitColor = () => {
    let listcolorsNorepite = [];
    listProductColors?.map((item) => {
      item.map((subItem) => {
        const { codHexadecimal, nameColor } = subItem;
        const newListcolorsNorepite = listcolorsNorepite.map(
          (item) => item.codHexadecimal
        );
        if (!newListcolorsNorepite.includes(codHexadecimal)) {
          listcolorsNorepite.push({ codHexadecimal, nameColor });
        }
      });
    });
    return listcolorsNorepite;
  };

  const listNoRepitSize = () => {
    let listSizeNorepite = [];
    ListProductSize?.map((item) => {
      item.map((subItem) => {
        subItem.map((subSubItem) => {
          if (!listSizeNorepite.includes(subSubItem.size)) {
            listSizeNorepite.push(subSubItem.size);
          }
        });
      });
    });
    return listSizeNorepite;
  };

  const handleListOrder = (value) => {
    if (value === "mayor") {
      productsFilter.sort((a, b) => b.price - a.price);
    } else if (value === "menor") {
      productsFilter.sort((a, b) => a.price - b.price);
    } else {
      setProductsFilter(productsFilter);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-5">Probando ando</div>
  );
}
