"use client";
import { useStoreCartLocalStorage } from "@/zustand/store";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { AllDeleteCart } from "../../../assets/Cart/IconsCart";
import CartCards from "./CartCards";
import TotalCart from "./TotalCart";

function ItemsCart({ setIsOpenCart, isOpenCart }) {
  const { cartLocalStorage, setCartLocalStorage, totalCart, setTotalCart } =
    useStoreCartLocalStorage();

  useEffect(() => {
    const listCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLocalStorage(listCart);
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      if (cartLocalStorage) {
        const updatedCart = await Promise.all(
          cartLocalStorage.map(async (item) => {
            const updatedProduct = await axios.get(
              `/products/${item.product_id}`
            );

            if (updatedProduct && updatedProduct.data.price !== item.price) {
              const totalPrice = item.count * updatedProduct.data.price;
              console.log(totalPrice);
              const updatedItem = {
                ...item,
                price: updatedProduct.data.price,
                totalPrice,
              };
              const updatedLocalStorageCart = cartLocalStorage.map((cartItem) => {
                if (cartItem.product_id === updatedItem.product_id) {
                  return updatedItem;
                }
                return cartItem;
              });
              // Guarda el carrito actualizado en el local storage
              localStorage.setItem(
                "cart",
                JSON.stringify(updatedLocalStorageCart)
              );

              console.log("Algo se modifico");

              // Devuelve el elemento del carrito con el precio actualizado
              return updatedItem;
            }

            console.log("Nada de modifico");

            return item; // Retorna los datos actualizados del producto
          })
        );
        setCartLocalStorage(updatedCart);
      }
    };

    updateCart();
  }, [isOpenCart, totalCart]);

  useEffect(() => {
    resultTotal();
  }, [cartLocalStorage]);

  const resultTotal = () => {
    const result = cartLocalStorage?.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);
    setTotalCart(result);
    localStorage.setItem("TotalCart", result);
  };

  const handleClickAllDelete = () => {
    console.log("Borrar");
    Cookies.remove("cartAbandoned");
    setCartLocalStorage([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="w-full max-h-[750px] py-6 px-2 ">
      {!cartLocalStorage || cartLocalStorage.length === 0 ? (
        <p className=" text-center">Carrito vacio 😥</p>
      ) : (
        <div>
          <button
            className="flex items-center justify-center w-fit px-2 py-3 text-[#F60909] font-semibold"
            onClick={handleClickAllDelete}
          >
            <AllDeleteCart /> Borrar todo
          </button>
          <ul className="w-full overflow-auto max-h-[500px]">
            {cartLocalStorage?.map((item, index) => {
              const {
                image,
                name,
                color,
                nameColor,
                price,
                count,
                totalPrice,
                size,
                stock,
                offerActive,
                offerPrice,
                category,
              } = item;

              return (
                <CartCards
                  key={index}
                  name={name}
                  image={image}
                  colorHex={color}
                  nameColor={nameColor}
                  price={price}
                  count={count}
                  totalPrice={totalPrice}
                  offerPrice={offerPrice}
                  offerActive={offerActive}
                  size={size}
                  stock={stock}
                  listCartArray={cartLocalStorage}
                  setListCartArray={setCartLocalStorage}
                  resultTotal={resultTotal}
                  category={category}
                />
              );
            })}
          </ul>
          <TotalCart setIsOpenCart={setIsOpenCart} />
        </div>
      )}
      {/* RECORDATORIO - HACER UN TABLA EN LUGAR DE TODO ESTE CHOCLO */}
    </div>
  );
}

export default ItemsCart;
