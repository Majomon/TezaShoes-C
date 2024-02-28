import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SizeComponent({
  numberSize,
  searchParamsColor,
  searchParamsCategory,
  searchParamsName,
  setSelectSize,
  selectSize,
  indexSize,
}) {
  return (
    <Link
      href={
        !searchParamsColor ? `/search?size=${numberSize}&${searchParamsCategory && !searchParamsName ? `category=${searchParamsCategory}` : `name=${searchParamsName}`}`
          : `/search?size=${numberSize}&color=${encodeURIComponent(
              searchParamsColor
            )}&${searchParamsName && !searchParamsCategory ? `name=${searchParamsName}` : `category=${searchParamsCategory}`}`
      }
      className={`w-[50px] h-[40px] flex items-center justify-center cursor-pointer ${
        selectSize === indexSize
          ? " border-b-1 border-colorGoldSecundary-500"
          : "shadow-buttonSizeShadow"
      } `}
      onClick={() => setSelectSize(indexSize)}
    >
      <p
        className={`${
          selectSize === indexSize
            ? " text-colorGoldSecundary-500"
            : "text-colorGray-100"
        } font-light text-sm`}
      >
        {numberSize}
      </p>
    </Link>
  );
}
