"use client"
import { capitalize } from "@/utils/capitalize";
import { useStoreProducts, useStoreProductsFilter } from "@/zustand/store";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import bgSearch from "../../../assets/image/backgroundSearchNew.png";
import Card from "../Card/Card";
import ColorComponent from "../ColorComponent/ColorComponent";
import PageRouting from "../PageRouting/PageRouting";
import SizeComponent from "../SizeComponent/SizeComponent";
import NotProducts from "./NotProducts";

const listOrder = [
  {
    value: "mayor",
    name: "Mayor precio",
  },
  {
    value: "menor",
    name: "Menor precio",
  },
];

export default function Search({ product }) {
  const { setProductsFilter, productsFilter, setProducts } = useStoreProducts();
  const {
    productsFilterTwo,
    setProductsFilterTwo,
    selectColor,
    setSelectColor,
    selectSize,
    setSelectSize,
    setSelectOrder,
    selectOrder,
  } = useStoreProductsFilter();

  const [isActiveShow, setIsActiveShow] = useState(false);

  /*querys URL*/
  const searchParamsCategory = async () => {
    const searchParams = useSearchParams();
    await searchParams.ready();
    return searchParams.get("category");
  };

  const searchParamsName = async () => {
    const searchParams = useSearchParams();
    await searchParams.ready();
    return searchParams.get("name");
  };

  const searchParamsColor = async () => {
    const searchParams = useSearchParams();
    await searchParams.ready();
    return searchParams.get("color");
  };

  const searchParamsSize = async () => {
    const searchParams = useSearchParams();
    await searchParams.ready();
    return searchParams.get("size");
  };

  /* useEffect */
  useEffect(() => {
    setProducts(product); //todos//
  }, [product]);

  useEffect(() => {
    const fetchData = async () => {
      const category = await searchParamsCategory();
      const name = await searchParamsName();
      const color = await searchParamsColor();
      const size = await searchParamsSize();

      if (category) {
        loadProductsFilterOne(product);
        loadProductsFilterTwo(product);

        const newProductsFilterTwo = product.filter(
          (item) => item.category === category
        );

        if (color) {
          loadProductsFilterTwoColor(newProductsFilterTwo);
          if (size) {
            loadProductsFilterTwoColorAndSize(newProductsFilterTwo);
          }
        } else if (size) {
          loadProductsFilterTwoSize(newProductsFilterTwo);
        }
      } else if (name) {
        loadProductsFilterParamsNameOne(product);
        loadProductsFilterParamsNameTwo(product);

        const newProductsFilterParamsNameTwo = product.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );

        if (color) {
          loadProductsFilterTwoColor(newProductsFilterParamsNameTwo);
          if (size) {
            loadProductsFilterTwoColorAndSize(newProductsFilterParamsNameTwo);
          }
        } else if (size) {
          loadProductsFilterTwoSize(newProductsFilterParamsNameTwo);
        }
      }

      return () => {
        setProductsFilterTwo(productsFilter);
      };
    };

    fetchData();

  }, []);

  const loadProductsFilterOne = (product) => {
    setProductsFilter(
      product.filter((item) => item.category === searchParamsCategory)
    );
  };

  const loadProductsFilterTwo = (product) => {
    setProductsFilterTwo(
      product.filter((item) => item.category === searchParamsCategory)
    );
  };

  const loadProductsFilterTwoColor = (newProductsFilterTwo) => {
    setProductsFilterTwo(
      newProductsFilterTwo.filter((item) =>
        item.options.some(
          (subItem) => subItem.color.codHexadecimal === searchParamsColor
        )
      )
    );
  };

  const loadProductsFilterTwoSize = (newProductsFilterTwo) => {
    setProductsFilterTwo(
      newProductsFilterTwo.filter((item) =>
        item.options.some((subItem) =>
          subItem.sizes.some(
            (subSubItem) => subSubItem.size.toString() === searchParamsSize
          )
        )
      )
    );
  };

  const loadProductsFilterParamsNameOne = (product) => {
    setProductsFilter(
      product.filter((item) =>
        item.name.toLowerCase().includes(searchParamsName.toLowerCase())
      )
    );
  };

  const loadProductsFilterParamsNameTwo = (product) => {
    setProductsFilterTwo(
      product.filter((item) =>
        item.name.toLowerCase().includes(searchParamsName.toLowerCase())
      )
    );
  };

  const loadProductsFilterTwoColorAndSize = (newProductsFilterTwo) => {
    setProductsFilterTwo(
      newProductsFilterTwo.filter((item) =>
        item.options.some(
          (subItem) =>
            subItem.color.codHexadecimal === searchParamsColor &&
            subItem.sizes.some(
              (subSubItem) => subSubItem.size.toString() === searchParamsSize
            )
        )
      )
    );
  };

  const listNoRepitSize = () => {
    let listSizeNorepite = [];
    ListProductSize.map((item) => {
      item.map((subItem) => {
        subItem.map((subSubItem) => {
          if (!listSizeNorepite.includes(subSubItem.size)) {
            listSizeNorepite.push(subSubItem.size);
          }
        });
      });
    });
    return listSizeNorepite;
  };

  const listNoRepitColor = () => {
    let listcolorsNorepite = [];
    listProductColors.map((item) => {
      item.map((subItem) => {
        const { codHexadecimal, nameColor } = subItem;
        const newListcolorsNorepite = listcolorsNorepite.map(
          (item) => item.codHexadecimal
        );
        if (!newListcolorsNorepite.includes(codHexadecimal)) {
          listcolorsNorepite.push({ codHexadecimal, nameColor });
        }
      });
    });
    return listcolorsNorepite;
  };

  const handleListOrder = (value) => {
    if (value === "mayor") {
      productsFilterTwo.sort((a, b) => b.price - a.price);
    } else if (value === "menor") {
      productsFilterTwo.sort((a, b) => a.price - b.price);
    } else {
      productsFilterTwo(productsFilter);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-full flex flex-col gap-y-5">
        <section className="w-full h-[200px] relative top-0 left-0 flex flex-col items-center justify-center gap-y-5">
          <Image
            src={bgSearch}
            className="w-full h-full absolute top-0 left-0 object-cover object-top -z-10 "
            alt="banner main search"
          />
          {searchParamsCategory && (
            <h1 className="opacity-60 text-center text-white text-3xl md:text-4xl font-normal font-['Martel'] tracking-[6.40px] md:tracking-[14.40px] text-wrap uppercase">
              {searchParamsCategory}
            </h1>
          )}
          {searchParamsName && (
            <h1 className=" opacity-60 text-center text-white text-4xl font-normal font-['Martel'] tracking-[14.40px] uppercase">
              {capitalize(searchParamsName)}
            </h1>
          )}
          {searchParamsName ? (
            <PageRouting currentRuat={"Resultado de busqueda"} />
          ) : (
            <PageRouting currentRuat={searchParamsCategory} />
          )}
        </section>
        <section className="w-11/12 mx-auto flex flex-col md:flex-row px-3 py-10 ">
          <div className=" flex sm:flex-row w-full flex-col pb-4 gap-y-4 flex-wrap items-start sm:justify-between md:w-[35%] xl:w-[20%] h-fit md:sticky md:top-10 ">
            <Accordion>
              <AccordionItem key={1} aria-label="Accordion 1" title="Color">
                <article className="flex flex-row gap-[5px] flex-wrap w-full px-1 pb-2">
                  {listNoRepitColor().map((elem, index) => {
                    return (
                      <ColorComponent
                        key={`${index}+${elem}`}
                        searchParamsSize={searchParamsSize}
                        searchParamsCategory={searchParamsCategory}
                        searchParamsName={searchParamsName}
                        nameColor={elem.nameColor}
                        idColor={elem.codHexadecimal}
                        setSelectColor={setSelectColor}
                        selectColor={selectColor}
                        indexColor={index}
                      />
                    );
                  })}
                </article>
              </AccordionItem>
              <AccordionItem key={2} aria-label="Accordion 2" title="Talle">
                <article className="flex flex-row gap-[5px] flex-wrap w-full px-1 pb-2 ">
                  {listNoRepitSize().map((elem, index) => {
                    return (
                      <SizeComponent
                        key={`${index}+${elem}`}
                        searchParamsColor={searchParamsColor}
                        searchParamsCategory={searchParamsCategory}
                        searchParamsName={searchParamsName}
                        numberSize={elem}
                        setSelectSize={setSelectSize}
                        selectSize={selectSize}
                        indexSize={index}
                      />
                    );
                  })}
                </article>
              </AccordionItem>
              <AccordionItem key={3} aria-label="Accordion 3" title="Orden">
                <article className=" flex flex-col gap-y-[5px]">
                  {listOrder.map((item, index) => {
                    return (
                      <p
                        key={`${index * 2}}`}
                        className={
                          selectOrder === index
                            ? ` text-colorGoldSecundary-500 transition-all duration-250 font-normal text-base cursor-pointer`
                            : `text-colorGray-100 font-normal text-sm cursor-pointer`
                        }
                        onClick={() => {
                          handleListOrder(item.value);
                          setSelectOrder(index);
                        }}
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </article>
              </AccordionItem>
            </Accordion>
            <Link
              href={`/search?${
                searchParamsCategory && !searchParamsName
                  ? `category=${searchParamsCategory}`
                  : `name=${searchParamsName}`
              }`}
              className="w-full h-[40px] text-colorWhite-100 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black uppercase flex items-center justify-center"
              onClick={() => {
                setProductsFilterTwo(productsFilter);
                setSelectOrder(null);
                setSelectColor(null);
                setSelectSize(null);
              }}
            >
              Limpiar
            </Link>
          </div>
          <div className=" md:w-[65%] xl:w-[80%] w-full h-fit">
            <Suspense fallback={<p>Loading...</p>}>
              <section
                className={` grid grid-cols-13Cards items-start sm:justify-center justify-start w-[100%] gap-x-3 transition-all ease-in py-3 ${
                  isActiveShow ? "h-fit" : `min-h-[850px]`
                } overflow-${
                  isActiveShow ? "visible" : "hidden"
                } gap-y-6 place-items-center 
              ${productsFilterTwo.length === 0 ? "w-fit mx-auto " : " "} 
              `}
              >
                {productsFilterTwo.length > 0 ? (
                  productsFilterTwo.map((item) => {
                    const {
                      _id,
                      images,
                      name,
                      price,
                      cantDues,
                      newProduct,
                      category,
                      offer,
                    } = item;
                    return (
                      (isHeightCount += 1),
                      (
                        <Card
                          key={_id}
                          images={images}
                          title={name}
                          price={price}
                          cantDues={cantDues}
                          newProduct={newProduct}
                          id={_id}
                          categori={category}
                          offer={offer.offerActive}
                          offerPrice={offer.offerPrice}
                        />
                      )
                    );
                  })
                ) : (
                  <NotProducts
                    searchParamsCategory={searchParamsCategory}
                    searchParamsName={searchParamsName}
                    setProductsFilterTwo={setProductsFilterTwo}
                    productsFilter={productsFilter}
                    setSelectOrder={setSelectOrder}
                    setSelectColor={setSelectColor}
                    setSelectSize={setSelectSize}
                  />
                )}
              </section>
            </Suspense>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
