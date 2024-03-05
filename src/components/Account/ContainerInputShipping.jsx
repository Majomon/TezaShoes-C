import React from "react";
import InputShipping from "./InputShipping";

function ContainerInputShipping({ handleChange, dataShipping }) {
  const address = dataShipping?.address || {};
  console.log("Data shipping", dataShipping);
  return (
    <div className="w-fit flex flex-wrap px-6 py-4 gap-y-4  items-center justify-center">
      {/* Calle */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Calle"}
        nameInput={"street"}
        dataShipping={dataShipping}
      />
      {/* Altura */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Altura"}
        nameInput={"number"}
        dataShipping={dataShipping}
      />
      {/* Piso */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Piso"}
        nameInput={"floor"}
        dataShipping={dataShipping}
      />
      {/* Departamento */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Departamento"}
        nameInput={"department"}
        dataShipping={dataShipping}
      />
      {/* Entre calles */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Entre calles"}
        nameInput={"betweenStreets"}
        dataShipping={dataShipping}
      />
      {/* Ciudad */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Ciudad"}
        nameInput={"city"}
        dataShipping={dataShipping}
      />
      {/* Código postal */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Código postal"}
        nameInput={"postalCode"}
        dataShipping={dataShipping}
      />
      {/* Provincia */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Provincia"}
        nameInput={"province"}
        dataShipping={dataShipping}
      />
    </div>
  );
}

export default ContainerInputShipping;
