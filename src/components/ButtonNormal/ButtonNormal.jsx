import { Button } from "@nextui-org/react";

function ButtonNormal({ text, size, handler }) {
  return (
    <Button
      type="button"
      className={`w-[${size}] text-gray-50  bg-gray-950 py-1 px-1 rounded-sm`}
      onClick={handler}
    >
      {text}
    </Button>
  );
}

export default ButtonNormal;
