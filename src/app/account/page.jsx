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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasChanges) {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const requestData = {
        ...dataEditForm,
        address: dataShipping.address,
      };
      await fetchPutUserId(userId.id, requestData);

      setHasChanges(false);
    }
  };

  useEffect(() => {
    setDataEditForm(userData);
    setHasChanges(false);
  }, [userData]);

  return (
    <div className=" min-h-screen h-full">
      <section className=" w-full h-[200px] relative top-0 left-0 flex flex-col items-center justify-center gap-y-5">
        <h1 className="opacity-60 text-center text-white text-2xl sm:text-4xl font-normal font-['Martel'] tracking-[8.40px] sm:tracking-[14.40px] uppercase">
          Bienvenido {userData.name}
        </h1>
        <img
          src="./Banner.png"
          className="w-full h-full absolute top-0 left-0 object-cover object-top -z-10 "
          alt="banner main search"
        />
      </section>
      <div className=" h-full flex items-center lg:px-10 lg:items-start flex-col gap-y-20 lg:flex-row lg:justify-between pt-16  w-full max-w-[1440px] mx-auto ">
        <NavAccount isSelect={isSelect} setIsSelect={setIsSelect} />
        <div className="flex flex-col items-center gap-y-52 pb-5 w-full ">
          {listForms[isSelect]?.data}
        </div>
      </div>
      <ModalUpdatePassword
        userId={userId}
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
      />
    </div>
  );
}

export default Edit;
