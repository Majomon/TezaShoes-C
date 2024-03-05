export default function ContainerInputPersonalInformation({
  handleSubmit,
  handleChange,
  dataEditForm,
  hasChanges,
}) {
  const listDataInput = [
    {
      nameLabel: "Nombre",
      nameInput: "name",
      dataFormValue: dataEditForm?.name,
    },
    {
      nameLabel: "Apellido",
      nameInput: "lastName",
      dataFormValue: dataEditForm?.lastName,
    },
    {
      nameLabel: "Telefono",
      nameInput: "phone",
      dataFormValue: dataEditForm?.phone,
    },
    {
      nameLabel: "Email",
      nameInput: "Email",
      dataFormValue: dataEditForm?.email,
    },
    {
      nameLabel: "Documento",
      nameInput: "document",
      dataFormValue: dataEditForm?.document,
    },
    {
      nameLabel: "Nacionalidad",
      nameInput: "nationality",
      dataFormValue: dataEditForm?.nationality,
    },
  ];

  console.log(listDataInput);
  return (
    <form className="w-full h-fit" onSubmit={handleSubmit}>
      <div className="w-fit flex flex-wrap items-center justify-center px-10 py-10 gap-4">
        {listDataInput?.map((item, index) => {
          const { nameLabel, nameInput, dataFormValue } = item;
          return (
            <div className="py-2 flex flex-col items-start" key={index}>
              <label className="text-center text-stone-300 text-sm font-normal">
                {nameLabel}
              </label>
              {nameLabel === "Email" ? (
                <input
                  className="bg-colorGoldSecundary-500 w-[210px] px-3 text-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow"
                  name={"email"}
                  placeholder={dataFormValue || ""}
                  value={dataFormValue || ""}
                  disabled
                />
              ) : (
                <input
                  className="bg-white border border-colorGoldSecundary-500 text-center h-[40px] shadow-inputPerfilShadow"
                  name={nameInput}
                  placeholder={dataFormValue?.length > 0 ? dataFormValue : ""}
                  value={dataFormValue?.length > 0 ? dataFormValue : ""}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}
      </div>
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
  );
}
