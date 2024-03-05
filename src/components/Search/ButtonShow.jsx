import { Button } from "@nextui-org/react";

export default function ButtonShow({
  setIsActiveShows,
  isActiveShow,
  isHeightCount,
}) {
  return (
    <Button
      className={`rounded-none ${
        isHeightCount < 8 ? "hidden" : "block"
      } bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 w-[200px] mx-auto my-5 uppercase`}
      onClick={() => setIsActiveShows(!isActiveShow)}
    >
      {isActiveShow ? "Mostar Menos" : "Mostrar Mas"}
    </Button>
  );
}
