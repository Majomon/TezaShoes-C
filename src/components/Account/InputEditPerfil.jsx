import React from "react";

/* FALTA OPTIMIZAR */
function InputEditPerfil({ nameLabel, nameInput }) {
  return (
    <div className="py-2 px-4">
      <label>Apellido:</label>
      <input
        className="bg-gray-500 ml-2 pl-2"
        name={"lastName"}
        placeholder={
          dataEditForm.lastName?.length > 0 ? dataEditForm.lastName : ""
        }
        value={dataEditForm.lastName?.length > 0 ? dataEditForm.lastName : ""}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputEditPerfil;
