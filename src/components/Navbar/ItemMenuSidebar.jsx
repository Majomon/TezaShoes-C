import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { ShoesManu } from "../../../assets/svg/IconsManuSidebar";
/* import shoesMenu from "../../../assets/svg/shoesMenu.svg" */

export default function ItemMenuSidebar({
  name,
  categories,
  url,
  setSelectColor,
  setSelectSize,
  setSelectOrder,
  setIsMenuOpen,
  isMenuOpen,
}) {
  return (
    <li className="cursor-pointer px-6 my-4 ">
      {name === "Categorias" ? (
        <Accordion className=" px-0 py-[1px]">
          <AccordionItem key={1} aria-label="AllCategories" title={name} indicator={<ShoesManu />}>
            {categories?.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer px-6 my-4 hover:font-bold hover:underline"
              >
                <Link
                  className="w-full text-lg "
                  href={`/search?category=${item.name}`}
                  onClick={() => {
                    setSelectColor(null);
                    setSelectSize(null);
                    setSelectOrder(null);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          className="w-full text-lg hover:font-bold hover:underline"
          href={url}
          onClick={() => {
            setSelectColor(null);
            setSelectSize(null);
            setSelectOrder(null);
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {name}
        </Link>
      )}
    </li>
  );
}
