"use client";
import ContainerAllProducts from "@/components/Dashboard/ProductsList/ContainerAllProducts";
import SearchTableProducts from "@/components/Dashboard/SearchTable/SearchTableProducts";
import { useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";

function ListProducts() {
  const {
    allProducts,
    fetchPutProductId,
    fetchAllProducts,
    setProducts,
    fetchDeleteProductId,
  } = useStoreProducts();
  const [stateList, setStateList] = useState([]);

  /* al agregar un producto se fuelve a setear el estado global para que ve vea del lado del front el producto agregado */
  useEffect(() => {
    setProducts(allProducts);
    /* return () => setProducts([]) */
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full p-6">
      <div className=" w-full max-w-[960px] mx-auto">
        <h1 className=" text-lg font-bold">Productos</h1>
        <SearchTableProducts
          allList={allProducts}
          stateList={stateList}
          setStateList={setStateList}
        />
        <ContainerAllProducts
          stateList={stateList}
          allProducts={allProducts}
          fetchPutProductId={fetchPutProductId}
          fetchAllProducts={fetchAllProducts}
          setProducts={setProducts}
          fetchDeleteProductId={fetchDeleteProductId}
        />
      </div>
    </div>
  );
}

export default ListProducts;
