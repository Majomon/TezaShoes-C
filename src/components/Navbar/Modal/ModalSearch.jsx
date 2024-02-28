import { useStoreOpenSearch, useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CardSearchResult from "../CardSearchResult";
import CategoriesSearch from "../CategoriesSearch";
import Link from "next/link";

function ModalSearch() {
  const { allProducts } = useStoreProducts();
  const {isOpenSearch,setIsOpenSearch} = useStoreOpenSearch()
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (value) => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handlerChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    if (search !== "") {
      searchHandler(search);
    } else {
      setSearchResults([]);
    }
    if (!isOpenSearch) {
      setSearch("");
      setSearchResults([]);
    }
  }, [search, allProducts]);

  useEffect(() => {
    if (isOpenSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpenSearch]);

  const handleVerTodoClick = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  let displayedResults = searchResults
    .slice()
    .sort((a, b) => b.price - a.price)
    .slice(0, 6);

  return (
    <div className="">
      <button className="mx-1">
        <CiSearch size={25} onClick={() => setIsOpenSearch(!isOpenSearch)} />
      </button>
      <div
        className={`${ isOpenSearch ? "min-h-screen block" : "h-0 hidden"} w-full absolute left-0 top-16 z-10 min-h-screen animate-sidebarUp`}
      >
        <div
          className={`w-full h-full right-0 px-6 flex flex-col justify-center bg-white z-10 animate-sidebarDown`}
        >
          <div className=" sm:w-6/12 w-full h-full mx-auto flex flex-col py-6">
            <div className="w-full flex border-b-2 py-4">
              <input
                placeholder="¿Qué estás buscando?"
                className="w-full pl-6 focus:outline-none"
                onChange={handlerChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                />
              </svg>
            </div>
            {/* Renderizar los resultados */}
            {displayedResults.length !== 0 && (
              <div className="w-full h-full grid grid-cols-13Cards gap-x-2 my-4">
                {displayedResults.map((product) => (
                  <div
                    key={product._id}
                    className="py-1 w-full"
                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                  >
                    <CardSearchResult
                      images={product.images}
                      title={product.name}
                      price={product.price}
                      id={product._id}
                    />
                  </div>
                ))}
              </div>
            )}
            {search !== "" && searchResults.length === 0 && (
              <p>No se encontraron coincidencias</p>
            )}
            {/* Mostrar el botón 'Mostrar más' si hay más de 6 resultados */}
            {searchResults.length > 0 && (
              <Link
                onClick={handleVerTodoClick}
                href={`/search?name=${search}`}
                className="mt-4 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-white py-2 px-4 rounded-md text-center"
              >
                Ver todo
              </Link>
            )}
            <CategoriesSearch
              isOpenSearch={isOpenSearch}
              setIsOpenSearch={setIsOpenSearch}
            />
          </div>
        </div>
        <div
          className={`${isOpenSearch ? "block": "hidden"} w-full h-[50vh] bg-neutral-950/50 backdrop-blur-sm`}
          onClick={() => setIsOpenSearch(!isOpenSearch)}
        ></div>
      </div>
    </div>
  );
}

export default ModalSearch;
