"use client";
import {
  validateFieldContact,
  validateFormContact,
} from "@/utils/validaciones";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InputForm from "../InputForm/InputForm";

function FormContact() {
  const [disabled, setDisabled] = useState(true);
  const options = {
    name: "Nombre",
    email: "Email",
    phone: "Telefono",
    message: "Mensaje",
  };
  const [error, setError] = useState({});
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (validateFormContact(error, inputForm)) {
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
      [name]: validateFieldContact(name, value, inputForm),
    }));
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (disabled) {
      toast.warning("Completa el formulario");
    } else {
      try {
        const response = await axios.post(
          "/resendEmail",
          inputForm
        );

        if (response.status === 200) {
          toast.success("Email enviado");
          setInputForm({
            name: "",
            phone: "",
            email: "",
            message: "",
          });
        } else {
          toast.warning("Error al enviar el mail. Contactate por Whatapp");
        }
      } catch (error) {
        toast.warning("Error al enviar el mail. Contactate por Whatapp");
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handlerSubmit}
      className=" md:w-[450px] w-2/3 mb-12 flex flex-col gap-y-[30px]"
    >
      <div className="flex flex-col gap-y-4 w-full">
        {Object.keys(inputForm).map((fieldName, index) => (
          <InputForm
            key={index}
            handlerChange={handlerChange}
            inputForm={inputForm}
            error={error}
            name={fieldName}
            options={options}
          />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <button className="py-2 px-6 text-gray-100 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black w-full">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default FormContact;
