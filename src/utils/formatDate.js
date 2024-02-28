export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
  const year = date.getFullYear();

  // Formateamos el día y el mes para asegurarnos de tener dos dígitos
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // Retornamos la fecha formateada en el formato "dd/mm/aaaa"
  return `${formattedDay}/${formattedMonth}/${year}`;
}
