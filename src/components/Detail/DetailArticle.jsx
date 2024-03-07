"use client";
import {
  useStoreCartLocalStorage,
  useStoreOpenCart,
  useStoreProducts,
} from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SizeGuideShoes from "../SizeGuideShoes/SizeGuideShoes";
import ColorComponentDetail from "./ColorComponentDetail/ColorComponentDetail";
import InfoTopDetailArticle from "./InfoTopDetailArticle";
import ModalContinue from "./ModalContinue";
import SizeComponentDetail from "./SizeComponentDetail/SizeComponentDetail";

export default function DetailArticle() {
  const startTime = Cookies.get("timePurchase");
  const { isOpenCart, setIsOpenCart } = useStoreOpenCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalBuy, setModalBuy] = useState(false);
  const [productAdd, setProductAdd] = useState("");
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [isOpenSizeGuide, setIsOpenSizeGuide] = useState(false);
  const { detail } = useStoreProducts();
  const [showCartReminder, setShowCartReminder] = useState(false);
  const { setCartLocalStorage } = useStoreCartLocalStorage();

  useEffect(() => {
    if (detail && detail.options && detail.options.length > 0) {
      setSelectedColor(detail.options[0]);
    }
    return () => {
      setSelectedSize(null);
      setSelectedColor(null);
    };
  }, [detail]);


  useEffect(() => {
    const cartAbandoned = Cookies.get("cartAbandoned");
    if (cartAbandoned) {
      // Verificar si el carrito ha sido abandonado por más de 1 minuto
      const abandonedTime = new Date(cartAbandoned);
      const currentTime = new Date();
      const timeDifference = currentTime - abandonedTime;
      const timeLimit = 0.5 * 60 * 1000;

      if (timeDifference >= timeLimit) {
        setShowCartReminder(true);
      } else {
        const timeoutId = setTimeout(() => {
          setShowCartReminder(true);
        }, timeLimit - timeDifference);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, []);

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption);
    setSelectedSize(null);
    setMaxCount(0);
    setCount(0);

    // Obtener la opción de color seleccionada con sus tamaños
    const colorOption = detail.options.find(
      (option) => option.color === selectedOption.color
    );
    if (colorOption) {
      const initialSize = colorOption.sizes.find((size) => size.stock > 0);
      if (initialSize) {
        /* setSelectedSize(initialSize); */
        setMaxCount(initialSize.stock);
      }
    }
  };

  const handleSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize);
    setMaxCount(selectedSize.stock);
    setCount(1);
  };

  const closeModal = () => {
    setModalBuy(false);
    // Habilitar el scroll del cuerpo cuando se cierra el modal
    document.body.style.overflow = "visible";
  };
  const closeModalOpenCart = () => {
    setModalBuy(false);
    setIsOpenCart(!isOpenCart);
    document.body.style.overflow = "visible";
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.dismiss();
      toast.warning("Selecciona un tamaño antes de agregar al carrito");
      return;
    }

    const selectedColorOption = detail.options.find(
      (option) => option.color === selectedColor.color
    );

    const selectedSizeInColor = selectedColorOption.sizes.find(
      (size) => size.size === selectedSize.size
    );

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.product_id === detail._id &&
        item.colorId === selectedColorOption._id &&
        item.sizeId === selectedSizeInColor._id
    );

    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
      if (count == 0) {
        toast.dismiss();
        toast.warning("Seleccionar un opcion");
        return;
      }
      if (existingItem.count + count > selectedSizeInColor.stock) {
        toast.dismiss(); // Limpiar la alerta existente si hay alguna
        toast.warning(
          `No hay suficiente stock disponible, solo quedan ${
            selectedSizeInColor.stock - existingItem.count
          } unidades. Revisa tu carrito :D`
        );
        return;
      }
      existingItem.count += 1;
      existingItem.totalPrice = existingItem.count * existingItem.price;
    } else {
      if (count == 0) {
        /* alert("poner cantidad"); */
        toast.dismiss();
        toast.warning("Seleccionar un opcion");
        return;
      }
      const selectedVariant = {
        product_id: detail._id,
        name: detail.name,
        category: detail.category,
        image: detail.images[0],
        color: selectedColorOption.color.codHexadecimal,
        nameColor: selectedColorOption.color.nameColor,
        colorId: selectedColorOption._id,
        size: selectedSizeInColor.size,
        sizeId: selectedSizeInColor._id,
        count,
        stock: selectedSizeInColor.stock,
        price: detail.price,
        totalPrice: count * detail.price,
        offerActive: detail.offer.offerActive,
        offerPrice: detail.offer.offerPrice,
      };
      setProductAdd(selectedVariant.name);
      cartItems.push(selectedVariant);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const listCart = JSON.parse(localStorage.getItem("cart"));
    setCartLocalStorage(listCart);

    Cookies.set("cartAbandoned", new Date());
    setModalBuy(true);

    // Mover al inicio de la página
    window.scrollTo(0, 0);
    // Deshabilitar el scroll del cuerpo cuando se muestra el modal
    document.body.style.overflow = "hidden";
  };

  const handleDismissReminder = () => {
    setShowCartReminder(false);
    Cookies.remove("cartAbandoned");
  };

  return (
    <div className=" w-full lg:w-[650px] border-b-1 border-colorGoldSecundary-500 min-h-[500px]">
      <InfoTopDetailArticle />
      <div className="py-2">
        <h5 className="py-2 text-left text-neutral-950 text-sm font-semibold">
          Seleccionar Color:
        </h5>
        {!detail.options ? (
          <div>
            <Skeleton className="flex rounded-full w-8 h-8 p-4" />
          </div>
        ) : (
          <div className="flex gap-x-4 gap-y-[10px] flex-wrap py-2 h-fit">
            {detail &&
              detail.options &&
              detail.options.map((option, index) => (
                <ColorComponentDetail
                  key={index}
                  selectedColor={selectedColor}
                  hexaColor={option.color.codHexadecimal}
                  nameColor={option.color.nameColor}
                  handleColorChange={handleColorChange}
                  option={option}
                />
              ))}
          </div>
        )}

        <div>
          <div className="flex flex-row items-center justify-between py-2">
            <h5 className="py-2 text-left text-neutral-950 text-sm font-semibold">
              Seleccionar Talle:
            </h5>
            {detail.category !== "Carteras" && (
              <button
                className="py-2 text-neutral-950 text-sm font-semibold cursor-pointer underline-offset-2 "
                onClick={() => setIsOpenSizeGuide(!isOpenSizeGuide)}
              >
                Guía de talles
              </button>
            )}
          </div>
          <div className="py-2 flex flex-row gap-[11px] flex-wrap">
            {!detail.options ? (
              <Card className="w-[140px] h-full p-2 my-2" radius="lg">
                <Skeleton className="w-full rounded-lg">
                  <div className="h-5  w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
              </Card>
            ) : (
              selectedColor &&
              selectedColor.sizes &&
              selectedColor.sizes.map((size, idx) =>
                size.stock > 0 ? (
                  <SizeComponentDetail
                    key={idx}
                    valueSize={size.size}
                    size={size}
                    handleSizeChange={handleSizeChange}
                    selectedSize={selectedSize}
                  />
                ) : (
                  <button
                    key={idx}
                    className="w-[55px] h-11 flex items-center justify-center px-[20px] py-[10px] relative"
                    disabled
                  >
                    {size.size}
                    <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl font-light text-red-500">
                      /
                    </div>
                  </button>
                )
              )
            )}
          </div>
        </div>
        <SizeGuideShoes
          isOpenSizeGuide={isOpenSizeGuide}
          setIsOpenSizeGuide={setIsOpenSizeGuide}
        />
        {detail.offer?.offerActive && detail.offer?.offerActive ? (
          <div className="py-4 flex flex-row items-center justify-between ">
            <h3 className=" text-left text-colorGray-100 text-xl font-normal line-through">
              ${detail.price}
            </h3>
            <p className=" text-left text-colorBlack-400 text-xl font-semibold">
              ${detail.offer.offerPrice}
            </p>
          </div>
        ) : (
          <div className="py-4">
            <h3 className=" text-left text-neutral-950 text-xl font-semibold">
              ${detail.price}
            </h3>
          </div>
        )}
        {!startTime && (
          <div className="w-full flex justify-between items-center">
            <button
              className="w-full text-base font-normal py-4 px-6 bg-gradient-to-r from-zinc-600 via-zinc-800 to-black text-colorWhite-100 uppercase "
              onClick={addToCart}
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
      {/* Modal */}
      {modalBuy && (
        <ModalContinue
          productAdd={productAdd}
          closeModal={closeModal}
          closeModalOpenCart={closeModalOpenCart}
        />
      )}
    </div>
  );
}
