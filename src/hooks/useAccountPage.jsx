import ItemCardOrder from "@/components/Account/CardOrder/ItemCardOrder";
import ContainerInputPersonalInformation from "@/components/Account/ContainerInputPersonalInformation";
import ContainerInputShipping from "@/components/Account/ContainerInputShipping";
import { useStoreUsers } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAccountPage = () => {
  const router = useRouter();
  const { userData, fetchPutUserId } = useStoreUsers();
  const [dataEditForm, setDataEditForm] = useState({});
  const [dataShipping, setDataShipping] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userDataId, setUserDataId] = useState("");
  const [isSelect, setIsSelect] = useState(0);

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
        ...(prevState?.address || {}),
        [name]: value,
      },
    }));

    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasChanges) {
      const requestData = {
        ...dataEditForm,
        address: dataShipping.address,
      };
      await fetchPutUserId(userDataId, requestData);

      setHasChanges(false);
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")) || [];

    if (!userId) {
      router.push("/");
    } else {
      setUserDataId(userId.id);
    }
  }, [router]);

  useEffect(() => {
    setDataEditForm(userData);
    setDataShipping(userData?.address);
    setHasChanges(false);
  }, [userData, userData?.address]);

  const listForms = [
    {
      name: "Informacion Personal",
      data: (
        <section
          className={`flex flex-col w-full max-w-[750px] animate-fadeInLogin transition-all`}
          id="personalInformation"
        >
          <h2 className=" text-center uppercase">Informacion personal</h2>
          <ContainerInputPersonalInformation
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            dataEditForm={dataEditForm}
            hasChanges={hasChanges}
          />
        </section>
      ),
    },
    {
      name: "Direccion",
      data: (
        <section
          className={`flex flex-col w-full max-w-[750px] animate-fadeInLogin transition-all`}
          id="address"
        >
          <h2 className=" text-center uppercase">Direccion</h2>
          <form className="w-full h-full " onSubmit={handleSubmit}>
            <ContainerInputShipping
              handleChange={handleChangeShipping}
              dataShipping={dataShipping}
              addressUserData={userData?.address}
              setDataShipping={setDataShipping}
            />
            {hasChanges && hasChanges ? (
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-zinc-600 via-zinc-800 to-black uppercase"
                  disabled={!hasChanges}
                >
                  Guardar cambios
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </section>
      ),
    },
    {
      name: "Email y Contraseña",
      data: (
        <section
          className={`flex flex-col w-full max-w-[750px] animate-fadeInLogin transition-all `}
          id="emailAndPassword"
        >
          <h2 className=" text-center uppercase">Email y Contraseña</h2>
          <form className="w-full h-full " onSubmit={handleSubmit}>
            <div className="w-full flex flex-wrap justify-center gap-x-10 items-center px-10 py-4 gap-y-4 ">
              <div className="py-2 flex flex-col items-start">
                <label className="text-center text-stone-300 text-sm font-normal">
                  Email:
                </label>
                <input
                  className="bg-colorGoldSecundary-500 text-white border border-colorGoldSecundary-500 text-center w-full sm:w-[300px] h-[40px] shadow-inputPerfilShadow"
                  name={"email"}
                  placeholder={dataEditForm?.email || ""}
                  value={dataEditForm?.email || ""}
                  disabled
                />
              </div>
              <div className="py-2 flex flex-col items-start">
                <label className="text-center text-stone-300 text-sm font-normal">
                  Password:
                </label>
                <input
                  type="password"
                  className="bg-colorGoldSecundary-500 text-white border border-colorGoldSecundary-500 text-center w-full sm:w-[300px] h-[40px] shadow-inputPerfilShadow"
                  name={"email"}
                  placeholder={dataEditForm?.password || ""}
                  value={dataEditForm?.password || ""}
                  disabled
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-zinc-600 via-zinc-800 to-black uppercase w-[210px] sm:w-[300px]"
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                Cambiar contraseña
              </button>
            </div>
          </form>
        </section>
      ),
    },
    {
      name: "Pedidos",
      data: (
        <section
          className={`flex flex-col w-full max-w-[750px] gap-y-5 animate-fadeInLogin transition-all h-full `}
          id="order"
        >
          <h2 className=" text-center uppercase">Pedidos</h2>
          <div className=" flex flex-col gap-y-5 overflow-auto h-full py-5 px-5">
            {userData.orders?.length === 0 ? (
              <p className=" text-center text-base font-regular">
                No se hizo ningun pedido{" "}
                <Link
                  href={"/"}
                  className=" text-colorGoldSecundary-500 text-base font-semibold"
                >
                  Mira nuestros productos
                </Link>
              </p>
            ) : (
              userData?.orders?.map((item, index) => {
                const {
                  numberOrder,
                  date,
                  cart,
                  totalCart,
                  status,
                  paymentMethod,
                  dataPurchase,
                  statusDelivery,
                } = item;
                return (
                  <ItemCardOrder
                    key={index}
                    statusDelivery={statusDelivery}
                    numberOrder={numberOrder}
                    date={date}
                    status={status}
                    totalCart={totalCart}
                    cantCart={cart?.length}
                    cart={cart}
                    paymentMethod={paymentMethod}
                    address={dataPurchase?.address}
                  />
                );
              })
            )}
          </div>
        </section>
      ),
    },
  ];

  return {
    userDataId,
    userData,
    isSelect,
    setIsSelect,
    listForms,
    setIsOpenModal,
    isOpenModal,
    dataEditForm,
  };
};
