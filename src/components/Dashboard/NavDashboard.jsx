"use client";
import {
  useStoreDashboard,
  useStoreProducts,
  useStoreUserId,
  useStoreUsers,
} from "@/zustand/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconLogOut, IconWeb } from "../../../assets/svg/IconsDashboards";
import ContainerNavLinksDashboard from "./ContainerNavLinksDashboard";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function NavDashboard({ orders, category, allUsers, products }) {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { setAllOrders, allOrders, fetchAllOrders } = useStoreDashboard();
  const { setUsers, users, fetchAllUsers } = useStoreUsers();
  const { setUserId } = useStoreUserId();
  const {
    allProducts,
    fetchAllProducts,
    setProducts,
    setCategories,
    categories,
    fetchAllCategories,
  } = useStoreProducts();

  const router = useRouter();


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

  const logOut = () => {
    console.log("clic");
    if (typeof window !== "undefined") {
      if (Cookies.get("isAdmin")) {
        Cookies.remove("isAdmin");
      }
      window.localStorage.removeItem("userId");
      toast.success("Cerraste sesión");
      setUserId(null);
      setIsOpenUser(!isOpenUser);
      router.push("/");
    }
  };

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
        <button className="flex gap-x-2 justify-center items-center" onClick={() => logOut()}>
          <IconLogOut />
          <p className="text-base font-semibold" >Salir</p>
        </button>
      </div>
    </div>
  );
}

export default NavDashboard;
