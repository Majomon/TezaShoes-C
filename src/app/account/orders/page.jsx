"use client";
import { useStoreUsers } from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Banner from "../../../../public/Banner.png";

function Orders() {
  const router = useRouter();
  const { userData } = useStoreUsers();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")) || [];

    if (!userId) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {!userData ? (
        <Card className=" w-11/12 mx-auto h-[80vh] p-2 mt-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[80vh] rounded-sm bg-default-300"></div>
          </Skeleton>
        </Card>
      ) : (
        <div>
          <Image src={Banner} alt="banner" className="w-full h-32" />
          <div>
            <h1>Pedidos</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;
