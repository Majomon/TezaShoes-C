import { useStoreResetPassword, useStoreUsers } from "@/zustand/store";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ModalUpdatePassword({
  userData,
  setIsOpenModal,
  isOpenModal,
}) {
  const {
    fetchPutResetPassword,
    errorMessage,
    okChange,
    setOkChange,
    setErrorMessage,
  } = useStoreResetPassword();
  const [dataPassword, setDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fieldCompleted, setFieldCompleted] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (okChange) {
      setIsOpenModal(!isOpenModal);
      setDataPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setOkChange(false);
      setErrorMessage(null);
    }
  }, [okChange]);

  const handlerChangePassword = (e) => {
    const { name, value } = e.target;
    setDataPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFieldCompleted((prevState) => ({
      ...prevState,
      [name]: value.trim() !== "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchPutResetPassword(userData._id, dataPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const isConfirmButtonDisabled =
    !fieldCompleted.currentPassword ||
    !fieldCompleted.newPassword ||
    !fieldCompleted.confirmPassword;

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={() => setIsOpenModal(!isOpenModal)}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalBody>
          <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="py-2 flex flex-col items-center ">
              <label className="text-center text-stone-300 text-sm font-normal">
                Contraseña actual:
              </label>
              <input
                type="password"
                className="bg-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow w-full sm:w-[300px]"
                name={"currentPassword"}
                onChange={handlerChangePassword}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="py-2 flex flex-col items-center">
              <label className="text-center text-stone-300 text-sm font-normal">
                Nueva contraseña:
              </label>
              <input
                type="password"
                className="bg-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow w-full sm:w-[300px]"
                name={"newPassword"}
                onChange={handlerChangePassword}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="py-2 flex flex-col items-center ">
              <label className="text-center text-stone-300 text-sm font-normal">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                className="bg-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow w-full sm:w-[300px]"
                name={"confirmPassword"}
                onChange={handlerChangePassword}
                onKeyDown={handleKeyDown}
              />
            </div>

            {errorMessage && (
              <div className="py-2 flex flex-col items-start ">
                <p className="w-10/12 mx-auto text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              </div>
            )}
            <article className="flex flex-col sm:flex-row items-center justify-center gap-2 py-6 mx-auto w-full">
              <button
                className="border-1 border-red-600 rounded-[5px] uppercase text-red-600 px-2 py-1 w-full sm:w-fit"
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                cancelar
              </button>
              <button
                className={`bg-gradient-to-r from-zinc-600 via-zinc-800 to-black rounded-[5px] uppercase text-white px-2 py-1 w-full sm:w-fit ${
                  isConfirmButtonDisabled && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={isConfirmButtonDisabled}
              >
                confirmar
              </button>
            </article>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
