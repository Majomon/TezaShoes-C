"use client";
import ModalUpdatePassword from "@/components/Account/Modal/ModalUpdatePassword";
import NavAccount from "@/components/Account/NavAccount";
import { useAccountPage } from "@/hooks/useAccountPage";
import { Card, Skeleton } from "@nextui-org/react";

function Info() {
  const {
    userDataId,
    userData,
    isSelect,
    setIsSelect,
    listForms,
    setIsOpenModal,
    isOpenModal,
  } = useAccountPage();


  return (
    <>
      {!userDataId || userData.length <= 0 ? (
        <Card className=" w-11/12 mx-auto h-[80vh] p-2 mt-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="w-full h-[80vh] rounded-sm bg-default-300"></div>
          </Skeleton>
        </Card>
      ) : (
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
          <div className=" h-full flex items-center lg:px-10 lg:items-start flex-col gap-y-20 gap-x-5 lg:flex-row lg:justify-between pt-16  w-full max-w-[1440px] mx-auto ">
            <NavAccount isSelect={isSelect} setIsSelect={setIsSelect} />
            <div className="flex flex-col items-center gap-y-52 pb-5 w-full ">
              {listForms[isSelect]?.data}
            </div>
          </div>
          <ModalUpdatePassword
            userDataId={userDataId}
            setIsOpenModal={setIsOpenModal}
            isOpenModal={isOpenModal}
          />
        </div>
      )}
    </>
  );
}

export default Info;
