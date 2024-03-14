"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateField, validateForm } from "../../utils/validaciones";
import ButtonLink from "../ButtonLink/ButtonLink";
import ButtonNormal from "../ButtonNormal/ButtonNormal";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { useStoreUsers } from "@/zustand/store";

export default function FormRegister({ url }) {
  const router = useRouter();
  const { fetchAllUsers, users } = useStoreUsers();
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [registerOk, setRegisterOk] = useState(false);
  const [registerFail, setRegisterfail] = useState(false);
  const [inputForm, setInputForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    retryPassword: "",
  });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    /*   const userId = JSON.parse(localStorage.getItem("userId")); */

    if (userId) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (validateForm(error, inputForm)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputForm]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });

    setError((prevError) => ({
      ...prevError,
      [name]: validateField(name, value, inputForm, users),
    }));
  };

  const handlerRetry = () => {
    setRegisterfail(false);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (disabled) {
      toast.warning("Completa el formulario");
    } else {
      try {
        const response = await axios.post(`${url}/users`, inputForm);

        if (response.status === 200) {
          toast.success("Usuario creado");
          setInputForm({
            name: "",
            phone: "",
            email: "",
            password: "",
            retryPassword: "",
          });
          setRegisterOk(true);
        } else {
          toast.warning("Error al crear usuario");
          setRegisterfail(true);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <form onSubmit={handlerSubmit} className="w-full ">
      <div className="w-full h-fit flex flex-col justify-center items-center m-auto">
        {!registerOk && (
          <div className="my-2 w-full">
            <div className="w-full h-full flex flex-col gap-y-4 ">
              {/* Nombre y teléfono */}
              <div className="flex flex-col sm:flex-row justify-between gap-x-2 gap-y-4 w-full ">
                <div className="h-14 flex flex-col sm:w-1/2 w-full">
                  <input
                    type="text"
                    name="name"
                    value={inputForm.name}
                    onChange={handlerChange}
                    placeholder="Nombre"
                    className={` border-colorGoldSecundary-500 border-b-2 p-2 outline-none w-full ${
                      error.name ? "focus:outline-none" : ""
                    }`}
                  />
                  {error.name && (
                    <span className="text-xs  text-red-400">{error.name}</span>
                  )}
                </div>
                <div className="h-14 flex flex-col sm:w-1/2 w-full">
                  <input
                    type="number"
                    name="phone"
                    value={inputForm.phone}
                    onChange={handlerChange}
                    placeholder="Teléfono"
                    className={` border-colorGoldSecundary-500 border-b-2 p-2 outline-none w-full ${
                      error.phone ? "focus:outline-none" : ""
                    }`}
                  />
                  {error.phone && (
                    <span className="text-xs  text-red-400">{error.phone}</span>
                  )}
                </div>
              </div>
              {/* Email */}
              <div className="h-14 ">
                <input
                  type="email"
                  name="email"
                  value={inputForm.email}
                  onChange={handlerChange}
                  placeholder="Email"
                  className={`w-full border-colorGoldSecundary-500 border-b-2 p-2 outline-none ${
                    error.email ? "focus:outline-none" : ""
                  }`}
                />
                {error.email && (
                  <span className="text-xs  text-red-400">{error.email}</span>
                )}
              </div>
              {/* Contraseña */}
              <div className="h-14">
                <input
                  type="password"
                  name="password"
                  value={inputForm.password}
                  onChange={handlerChange}
                  placeholder="Contraseña"
                  className={`w-full border-colorGoldSecundary-500 border-b-2 p-2 outline-none ${
                    error.password ? "focus:outline-none" : ""
                  }`}
                />
                {error.password && (
                  <span className="text-xs  text-red-400">
                    {error.password}
                  </span>
                )}
              </div>
              {/* Repetir contraseña */}
              <div className="h-14">
                <input
                  type="password"
                  name="retryPassword"
                  value={inputForm.retryPassword}
                  onChange={handlerChange}
                  placeholder="Confirmar contraseña"
                  className={`w-full border-colorGoldSecundary-500 border-b-2 p-2 outline-none ${
                    error.retryPassword ? "focus:outline-none" : ""
                  }`}
                />
                {error.retryPassword && (
                  <span className="text-xs  text-red-400">
                    {error.retryPassword}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full h-full">
              <ButtonSubmit text={"Crear usuario"} size={"100%"} />
            </div>
          </div>
        )}
        {registerOk && (
          <div className="w-full flex flex-col justify-center items-center my-6 gap-4">
            <h2>Cuenta creada con exito</h2>
            <ButtonLink text={"Iniciar sesión"} size={"200px"} url={"login"} />
          </div>
        )}
        {registerFail && (
          <div className="w-full flex flex-col justify-center items-center my-6 gap-4">
            <h2>Error al crear la cuenta.</h2>
            <ButtonNormal
              text={"Volver a intentar"}
              size={"200px"}
              handler={handlerRetry}
            />
          </div>
        )}
        {!registerOk && (
          <div className="flex flex-col gap-x-4 items-center justify-center pt-3">
            <h2 className="text-center">O</h2>
            <div className="flex flex-col gap-y-2 sm:flex-row gap-x-4 items-center justify-center">
              <h2 className=" text-base sm:text-xl text-ms min-[420px]:text-lg">
                Ya tenes cuenta?
              </h2>
              <Link href={"/login"}>
                <strong className=" text-colorGoldSecundary-500 underline text-lg sm:text-xl text-ms min-[420px]:text-lg uppercase">
                  Inicia sesión
                </strong>
              </Link>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
