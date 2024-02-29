"use client";
import ItemCardOrder from "@/components/Account/CardOrder/ItemCardOrder";
import ContainerInputPersonalInformation from "@/components/Account/ContainerInputPersonalInformation";
import ContainerInputShipping from "@/components/Account/ContainerInputShipping";
import ModalUpdatePassword from "@/components/Account/Modal/ModalUpdatePassword";
import NavAccount from "@/components/Account/NavAccount";
import { useStoreUsers } from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Edit() {
  const router = useRouter();
  const { userData, fetchPutUserId } = useStoreUsers();
  const [dataEditForm, setDataEditForm] = useState({});
  const [dataShipping, setDataShipping] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSelect, setIsSelect] = useState(0);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")) || "";
    if (!userId) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "day" || name === "month" || name === "year") {
      setDataEditForm({
        ...dataEditForm,
        birthdate: {
          ...dataEditForm.birthdate,
          [name]: value,
        },
      });
    } else {
      setDataEditForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setHasChanges(true);
  };

  const handleChangeShipping = (e) => {
    const { name, value } = e.target;
    setDataShipping((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));

    setHasChanges(true);
  };

  return <>Hola</>;
}

export default Edit;
