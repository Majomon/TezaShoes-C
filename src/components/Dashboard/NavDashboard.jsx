"use client";
import {
  useStoreDashboard,
  useStoreProducts,
  useStoreUsers,
} from "@/zustand/store";
import Link from "next/link";
import { useEffect } from "react";
import { IconLogOut, IconWeb } from "../../../assets/svg/IconsDashboards";
import ContainerNavLinksDashboard from "./ContainerNavLinksDashboard";

function NavDashboard({ orders, category, allUsers, products }) {
  const { setAllOrders, allOrders, fetchAllOrders } = useStoreDashboard();
  const { setUsers, users, fetchAllUsers } = useStoreUsers();
  const {
    allProducts,
    fetchAllProducts,
    setProducts,
    setCategories,
    categories,
    fetchAllCategories,
  } = useStoreProducts();


  useEffect(() => {
    setAllOrders(orders);
    setCategories(category);
    setUsers(allUsers);
    setProducts(products);
  }, [orders, category]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        allProducts.length === 0 ||
        categories.length === 0 ||
        users.length === 0 ||
        allOrders.length === 0
      ) {
        const newProducts = await fetchAllProducts();
        const allCategories = await fetchAllCategories();
        const allUsers = await fetchAllUsers();
        const allOrders = await fetchAllOrders();

        setProducts(newProducts);
        setCategories(allCategories);
        setUsers(allUsers);
        setAllOrders(allOrders);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-9/12 h-4/5 mx-auto  flex flex-col items-center justify-between relative">
      <div className="">
        <ContainerNavLinksDashboard />
      </div>
      <div className="flex flex-col items-start gap-4">
        <Link href={"/"} className="flex gap-x-2 justify-center items-center">
          <IconWeb />
          <p className="text-base font-semibold">Ir a inicio</p>
        </Link>
        <button className="flex gap-x-2 justify-center items-center">
          <IconLogOut />
          <p className="text-base font-semibold">Salir</p>
        </button>
      </div>
    </div>
  );
}

export default NavDashboard;
