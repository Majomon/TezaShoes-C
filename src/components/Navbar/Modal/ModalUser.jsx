"use client";
import { useStoreOpenSearch, useStoreUserId } from "@/zustand/store";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CiEdit, CiLogout, CiUser } from "react-icons/ci";
import { toast } from "sonner";

function ModalUser({ isOpenUser, setIsOpenUser }) {
  const { setIsOpenSearch } = useStoreOpenSearch();
  const { userId, setUserId } = useStoreUserId();
  const router = useRouter();

  useEffect(() => {
    const userIdFromStorage = window.localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, [router, userId]);

  const logOut = () => {
    if (Cookies.get("isAdmin")) {
      Cookies.remove("isAdmin");
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("userId");
    }
    toast.success("Cerraste sesión");
    setUserId(null);
    setIsOpenUser(!isOpenUser);
    router.push("/");
  };

  return (
    <div>
      <button className="mx-1">
        <CiUser
          size={25}
          onClick={() => {
            setIsOpenSearch(false);
            setIsOpenUser(!isOpenUser);
          }}
        />
      </button>

      {isOpenUser ? (
        !userId ? (
          <div className="w-[200px] h-fit absolute top-16 right-0 px-6 flex flex-col justify-center bg-white border-1 border-white rounded-bl shadow-lg z-10">
            <Link
              href={"/login"}
              className="w-full h-12 flex items-center gap-4"
              onClick={() => {
                setIsOpenSearch(false);
                setIsOpenUser(!isOpenUser);
              }}
            >
              <CiUser size={25} />
              <h2>Iniciar sesión</h2>
            </Link>
            <Link
              href={"/register"}
              className="w-full h-12 flex items-center gap-4"
              onClick={() => {
                setIsOpenSearch(false);
                setIsOpenUser(!isOpenUser);
              }}
            >
              <CiEdit size={25} />
              <h2>Crear cuenta</h2>
            </Link>
          </div>
        ) : (
          <div className="w-[200px] h-fit absolute top-16 right-0 py-2 flex flex-col justify-center items-center bg-white rounded-bl-md border-l-1 border-b-1 z-10 gap-2">
            {userId.isAdmin ? (
              <Link
                href={"/dashboard/sale/salesList"}
                onClick={() => setIsOpenUser(!isOpenUser)}
              >
                Ir al <strong>Dashboard!</strong>
              </Link>
            ) : (
              <Link
                href={"/account"}
                onClick={() => setIsOpenUser(!isOpenUser)}
              >
                Ingresa a tu <strong>Cuenta!</strong>
              </Link>
            )}
            <div className="flex gap-2">
              <CiLogout size={20} />
              <button onClick={() => logOut()}>Cerrar sesión</button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default ModalUser;
