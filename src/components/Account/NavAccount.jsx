"use client";
import { useStoreUsers } from "@/zustand/store";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconAddress,
  IconEmailAndPassword,
  IconOrder,
  IconPersonalInformation,
} from "../../../assets/PerfilUser/IconPefilUser";

function NavAccount({ isSelect, setIsSelect }) {
  const router = useRouter();
  const { setUserId } = useStoreUsers();
  /*   const [selectedKeys, setSelectedKeys] = useState(0); */
  const [userDataId, setUserDataId] = useState("");

  const listLinkPerfil = [
    {
      name: "Informacion Personal",
      icon: <IconPersonalInformation />,
      linkDisplacement: "#personalInformation",
    },
    {
      name: "Direccion",
      icon: <IconAddress />,
      linkDisplacement: "#address",
    },
    {
      name: "Email y Contraseña",
      icon: <IconEmailAndPassword />,
      linkDisplacement: "#emailAndPassword",
    },
    {
      name: "Pedidos",
      icon: <IconOrder />,
      linkDisplacement: "#order",
    },
  ];

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")) || [];

    if (!userId) {
      router.push("/login");
    } else {
      setUserDataId(userId.id);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userDataId}`);
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userDataId) {
      fetchUserData();
    }
  }, []);

  return (
    <>
      {!userDataId || userDataId.length <= 0 ? (
        <Card className=" w-[300px] h-[300px] mx-auto p-2 mt-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[80vh] rounded-sm bg-default-300"></div>
          </Skeleton>
        </Card>
      ) : (
        <section className="full">
          <div className=" max-w-[710px] border-2 px-5 lg:w-[300px] min-h-[150px] py-10 lg:h-[300px] lg:flex flex-col gap-8 overflow-hidden shadow-cardPerfilShadow rounded-lg lg:sticky top-10 hidden ">
            <ul className="w-full flex flex-wrap items-center justify-center sm:justify-between lg:flex-col flex-row gap-8 lg:items-start m-auto">
              {listLinkPerfil.map((item, index) => {
                const { name, icon, linkDisplacement } = item;
                return (
                  <li className="" key={name}>
                    <a
                      /* href={linkDisplacement} */ className="flex flex-col lg:flex-row gap-6 items-center cursor-pointer w-[150px] sm:w-fit"
                      onClick={() => setIsSelect(index)}
                    >
                      {icon}
                      <p
                        className={` ${
                          isSelect === index
                            ? "text-colorGoldSecundary-500"
                            : "text-black"
                        } md:text-left text-center text-sm font-semibold `}
                      >
                        {name}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className=" block lg:hidden w-full ">
            <Dropdown className="w-full">
              <DropdownTrigger className="w-full">
                <Button
                  variant="bordered"
                  className="capitalize w-full border-colorGoldSecundary-500"
                >
                  {listLinkPerfil[isSelect]?.icon}
                  {listLinkPerfil[isSelect]?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="shadow"
                disallowEmptySelection
                selectionMode="single"
                color="warning"
              >
                {listLinkPerfil.map((item, index) => {
                  const { icon, name } = item;
       
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => setIsSelect(index)}
                    >
                      <p className=" flex gap-x-2 items-center justify-start text-sm">
                        {icon} {name}
                      </p>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
      )}
    </>
  );
}

export default NavAccount;
