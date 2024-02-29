import { IconWhatsappClient } from "../../../assets/svg/IconsDashboards";

export default function DataClient({ userId }) {
  const { address } = userId;
  const { name, lastName, email, phone, document } = userId;
  return (
    <div className="bg-white p-[10px] border-1 border-colorGray-100 rounded-lg w-full max-w-[470px] h-fit">
      <div className=" w-full flex justify-between items-center pb-2">
        <h2 className=" text-lg font-bold">Datos de cliente</h2>
        <a href={`https://wa.me/+54${phone}`} target="_blank">
          <IconWhatsappClient />
        </a>
      </div>
      <article className=" flex flex-col gap-y-1">
        <section className="flex gap-x-1">
          <p className=" text-sm font-normal">{name}</p>
          <p className=" text-sm font-normal">{lastName}</p>
        </section>
        <section className="flex flex-col gap-1">
          <p className=" text-sm font-normal">{email}</p>
          <p className=" text-sm font-normal">Tel:{phone}</p>
          <p className=" text-sm font-normal">DNI:{document}</p>
          {address?.street !== "" &&
          address?.number !== "" &&
          address?.city !== "" &&
          address?.postalCode &&
          address?.province !== "" ? (
            <section className="flex flex-col gap-1">
              <p className=" text-sm font-normal">
                {address?.street}, {address?.number}
              </p>
              <p className=" text-sm font-normal">{address?.betweenStreets}</p>
              <p className=" text-sm font-normal">{address?.postalCode}</p>
              {address?.floor && address.departament && (
                <p className=" text-sm font-normal">
                  {address?.floor},{address.departament}
                </p>
              )}
              <p className=" text-sm font-normal">{address?.city}</p>
              <p className=" text-sm font-normal">{address?.province}</p>
            </section>
          ) : (
            "sin datos de direccion"
          )}
        </section>
      </article>
    </div>
  );
}
