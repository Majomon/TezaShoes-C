import Link from "next/link";
import { useState } from "react";
import InputFormPurchase from "../../InputFormPurchase/InputFormPurchase";

function MainLeft({ dataForm, handlerChange }) {
  const [errors, setErrors] = useState({});
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  const handleContinue = () => {
    localStorage.setItem("dataPurchase", JSON.stringify(dataForm));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    // Validar el email
    if (!validateEmail(dataForm?.email)) {
      newErrors.email = "Ingrese un email válido";
      isValid = false;
    }

    // Validar el nombre y el apellido
    if (dataForm?.name.length < 2 || dataForm.name.length > 20) {
      newErrors.name = "El nombre debe tener entre 2 y 20 caracteres";
      isValid = false;
    }

    if (dataForm?.lastName.length < 2 || dataForm.lastName.length > 20) {
      newErrors.lastName = "El apellido debe tener entre 2 y 20 caracteres";
      isValid = false;
    }

    // Validar el documento
    const documentRegex = /^[0-9]{2,20}$/;
    if (!documentRegex.test(dataForm.document)) {
      newErrors.document =
        "El documento debe tener entre 2 y 20 dígitos y no contener caracteres especiales";
      isValid = false;
    }

    // Validar el teléfono
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (!phoneRegex.test(dataForm?.phone)) {
      newErrors.phone =
        "El teléfono debe tener entre 8 y 15 dígitos y no contener caracteres especiales (excepto '+')";
      isValid = false;
    }

    // Validar los campos de dirección
    if (dataForm?.address) {
      if (
        dataForm.address.street.length < 2 ||
        dataForm.address.street.length > 20
      ) {
        newErrors.street = "La calle debe tener entre 2 y 20 caracteres";
        isValid = false;
      }

      if (
        dataForm.address.number.length < 2 ||
        dataForm.address.number.length > 20
      ) {
        newErrors.number = "La altura debe tener entre 2 y 20 caracteres";
        isValid = false;
      }

      if (
        dataForm.address.city.length < 2 ||
        dataForm.address.city.length > 20
      ) {
        newErrors.city = "La ciudad debe tener entre 2 y 20 caracteres";
        isValid = false;
      }

      if (
        dataForm.address.postalCode.length < 2 ||
        dataForm.address.postalCode.length > 20
      ) {
        newErrors.postalCode =
          "El código postal debe tener entre 2 y 20 caracteres";
        isValid = false;
      }

      if (
        dataForm.address.province.length < 2 ||
        dataForm.address.province.length > 25
      ) {
        newErrors.province = "La provincia debe tener entre 2 y 25 caracteres";
        isValid = false;
      }
    }

    setIsContinueEnabled(isValid);
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    handlerChange(e);
    validateInputs();
  };
  return (
    <div className="max-w-[460px] pb-10 flex flex-col gap-y-5">
      {/*Email */}
      <div className="border-1 border-colorGray-100 rounded-lg">
        <InputFormPurchase
          dataForm={dataForm}
          handlerChange={handleChange}
          name={"email"}
          place={"Gmail"}
          errors={errors}
        />
      </div>
      {/* Info personal */}
      <div className="grid grid-cols-1 border-1 border-colorGray-100 rounded-lg">
        <h2 className="py-4 text-center text-base font-semibold">
          Información personal
        </h2>
        <div>
          {/* Nombre */}
          <section className="flex flex-col w-full min-[450px]:flex-row">
            <InputFormPurchase
              dataForm={dataForm}
              handlerChange={handleChange}
              name={"name"}
              place={"Nombre"}
              errors={errors}
            />
            {/* Apellido */}
            <InputFormPurchase
              dataForm={dataForm}
              handlerChange={handleChange}
              name={"lastName"}
              place={"Apellido"}
              errors={errors}
            />
          </section>
          {/* Documento */}
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"document"}
            place={"Documento"}
            errors={errors}
          />
          {/* Teléfono */}
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"phone"}
            place={"Teléfono"}
            errors={errors}
          />
        </div>
      </div>
      {/* Dirección de envio */}
      <div className="grid grid-cols-1 border-1 border-colorGray-100 rounded-lg w-full">
        <h2 className="py-4 text-center text-base font-semibold">
          Dirección de envio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full ">
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"street"}
            place={"Calle"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"number"}
            place={"Altura"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"betweenStreets"}
            place={"Entre calles"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"floor"}
            place={"Piso"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"department"}
            place={"Departamento"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"city"}
            place={"Ciudad"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"postalCode"}
            place={"Codigo postal"}
            address={true}
            errors={errors}
          />
          <InputFormPurchase
            dataForm={dataForm}
            handlerChange={handleChange}
            name={"province"}
            place={"Provincia"}
            address={true}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-end w-full ">
        <Link href={"/purchase/deliveryMode"} className="w-full">
          <button
            className={`w-full text-sm font-normal py-2 px-6 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase ${
              isContinueEnabled ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleContinue}
            disabled={!isContinueEnabled}
          >
            Continuar
          </button>
        </Link>
      </div>
      {/*   <div>
        <p>{errors}</p>
      </div> */}
    </div>
  );
}

export default MainLeft;
