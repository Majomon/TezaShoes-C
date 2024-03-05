import React from "react";
import InputShipping from "./InputShipping";

function ContainerInputShipping({ handleChange, dataShipping }) {
  const address = dataShipping?.address || {};
  return (
    <div className="w-fit flex flex-wrap px-6 py-4 gap-y-4  items-center justify-center">
      {/* Calle */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Calle"}
        nameInput={"street"}
        dataShipping={address}
      />
      {/* Altura */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Altura"}
        nameInput={"number"}
        dataShipping={address}
      />
      {/* Piso */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Piso"}
        nameInput={"floor"}
        dataShipping={address}
      />
      {/* Departamento */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Departamento"}
        nameInput={"department"}
        dataShipping={address}
      />
      {/* Entre calles */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Entre calles"}
        nameInput={"betweenStreets"}
        dataShipping={address}
      />
      {/* Ciudad */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Ciudad"}
        nameInput={"city"}
        dataShipping={address}
      />
      {/* Código postal */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Código postal"}
        nameInput={"postalCode"}
        dataShipping={address}
      />
      {/* Provincia */}
      <InputShipping
        handleChange={handleChange}
        nameLabel={"Provincia"}
        nameInput={"province"}
        dataShipping={address}
      />
    </div>
  );
}

export default ContainerInputShipping;
