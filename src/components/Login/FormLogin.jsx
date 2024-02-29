import { validateFieldLogin, validateFormLogin } from "@/utils/validaciones";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FormLogin({ url }) {
  const router = useRouter();

  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (validateFormLogin(error, inputForm)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputForm]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setInputForm((prevInputForm) => ({
      ...prevInputForm,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: validateFieldLogin(name, value),
    }));
  };

/*   const handlerSubmit = async (e) => {
    e.preventDefault();
    if (disabled) {
      toast.warning("Completa el formulario");
    } else {
      try {
        const response = await axios.post(`${url}/login`, inputForm);
        if (response.status === 200) {
          localStorage.setItem(
            "userId",
            JSON.stringify({
              id: response.data.user._id,
              isAdmin: response.data.user.isAdmin,
            })
          );

          if (response.data.user.isAdmin) {
            Cookies.set("isAdmin", true);
          }
          toast.success("Logeado");
          setInputForm({
            email: "",
            password: "",
          });
          router.push("/");
        } else {
          toast.warning("Error al intentar logearse");
        }
      } catch (error) {
        toast.warning("Error al intentar logearse");
        console.error(error);
      }
    }
  }; */

  return (
    <div className="w-full h-full ">
      <div className="w-full h-full mx-auto flex flex-col justify-center gap-5 mb-4 ">
        {/* <h2 className="text-lg font-bold">Iniciar sesión</h2> */}
     
        <h2 className="text-center">O</h2>
        <div className="flex flex-col gap-y-2 sm:flex-row gap-x-4 items-center justify-center">
          <h2 className=" text-base sm:text-xl text-ms min-[420px]:text-lg">
            No tenes cuenta?
          </h2>
          <Link href={"/register"}>
            <strong className=" text-colorGoldSecundary-500 underline text-lg sm:text-xl text-ms min-[420px]:text-lg uppercase">
              Registrate
            </strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
