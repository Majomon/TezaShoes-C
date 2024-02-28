import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ColorComponent({
  nameColor,
  searchParamsSize,
  searchParamsCategory,
  searchParamsName,
  idColor,
  indexColor,
  setSelectColor,
  selectColor,
}) {
  const router = useRouter();

  const handleSearch = (color) => {
    const encodedColor = encodeURIComponent(color);
    router.push(`/search?color=${encodedColor}`);
  };


  return (
    <Link
      href={
        !searchParamsSize ? `/search?color=${encodeURIComponent(idColor)}&${searchParamsCategory && !searchParamsName ? `category=${searchParamsCategory}` : `name=${searchParamsName}`}`
          : `/search?size=${searchParamsSize}&color=${encodeURIComponent(idColor)}&${searchParamsName && !searchParamsCategory ? `name=${searchParamsName}` : `category=${searchParamsCategory}`}`
      }
      onClick={() => {
        setSelectColor(indexColor);
        handleSearch(idColor);
      }}
      className={`flex flex-row gap-x-[5px] justify-center items-center  ${
        selectColor === indexColor
          ? "border-b-1 border-colorGoldSecundary-500"
          : "border-1 border-[#E8E8E8]"
      } w-fit h-full cursor-pointer`}
    >
      <section
        style={{ backgroundColor: idColor }}
        className={`rounded-full w-[18px] h-[18px] border-1 border-colorGray-100`}
      ></section>
      <p
        className={`font-semibold text-xs ${
          selectColor === indexColor
            ? "text-colorGoldSecundary-500"
            : "text-colorGray-100"
        } `}
      >
        {nameColor}
      </p>
    </Link>
  );
}
