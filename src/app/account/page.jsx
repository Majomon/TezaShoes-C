"use client";
import ContainerInputShipping from "@/components/Account/ContainerInputShipping";
import { useStoreUsers } from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Banner from "../../../public/Banner.png";

function Edit() {
  const router = useRouter();
  const { userData, fetchPutUserId } = useStoreUsers();
  const [dataShipping, setDataShipping] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
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
      await fetchPutUserId(userId.id, dataShipping);

      setHasChanges(false);
    }
  };

  useEffect(() => {
    setDataShipping(userData);
    setHasChanges(false);
  }, [userData]);

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
            <h1>Editar datos de envio</h1>
            <form className="w-full h-full" onSubmit={handleSubmit}>
              {/* Nombre, apellido, teléfono, email, documento y nacionalidad*/}
              <ContainerInputShipping
                handleChange={handleChange}
                dataShipping={dataShipping}
              />
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className={`${
                    hasChanges
                      ? "bg-primary-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } px-4 py-2 rounded-md`}
                  disabled={!hasChanges}
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Edit;
