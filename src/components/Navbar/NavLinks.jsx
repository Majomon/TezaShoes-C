"use client";
import { useStoreOpenSearch } from "@/zustand/store";
import Link from "next/link";
import listLinkNavbar from "@/utils/listLinksNavbar";


export default function NavLinks() {
  const { setIsOpenSearch } = useStoreOpenSearch();
  return (
    <div className=" hidden flex-1 justify-center md:flex md:flex-1">
      <ul className="flex">
        {listLinkNavbar.map((item) => {
          const {name,url} = item;
          return (
            <Link
              key={name}
              className="uppercase text-sm  mx-2 cursor-pointer hover:font-bold"
              href={url}
              onClick={() => setIsOpenSearch(false)}
            >{name}</Link>
          );
        })}
      </ul>
    </div>
  );
}
