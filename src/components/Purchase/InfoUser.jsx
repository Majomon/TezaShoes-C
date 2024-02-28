function InfoUser({ storedData }) {
  return (
    <div>
      <h2>Información personal</h2>
      <ul>
        <li className="flex gap-x-2">
          <h3>Nombre y apellido:</h3>
          <p>
            {storedData.name} {storedData.lastName}
          </p>
        </li>
        <li className="flex gap-x-2">
          <h3>Dni:</h3>
          <p>{storedData.document}</p>
        </li>
        <li className="flex gap-x-2">
          <h3>Teléfono:</h3>
          <p>{storedData.phone}</p>
        </li>
        <li className="flex flex-col gap-x-2">
          <h3>Domicilio:</h3>
          <div>
            <p className="">
              {storedData.address.street} {storedData.address.number},
              {storedData.address.city}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default InfoUser;
