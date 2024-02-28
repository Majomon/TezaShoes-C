import { useEffect, useState } from "react";
import DeleteIcon from "../../../assets/svg/deleteIcon";
import Counter from "../Detail/Counter";
import ItemsCart from "./ItemsCart";

export default function CartCards({
  image,
  name,
  count,
  price,
  totalPrice,
  colorHex,
  nameColor,
  size,
  stock,
  setListCartArray,
  listCartArray,
  resultTotal,
  offerActive,
  offerPrice,
  category,
}) {
  const [countCant, setCountCant] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(totalPrice);

  /* useEffect */
  useEffect(() => {
    setCountCant(count);
    setSubTotalPrice(totalPrice); 
  }, [count, totalPrice]);

  /* funciones*/
  const decrementCount = () => {
    if (countCant > 1) {
      setCountCant(countCant - 1);
      const currentListCart = [...listCartArray];

      const indexCardsCart = currentListCart.findIndex(
        (item) =>
          item.name === name && item.color === colorHex && item.size === size
      );
      const newItemCart = currentListCart[indexCardsCart];
      newItemCart.count = countCant - 1;

      if (offerActive) {
        newItemCart.totalPrice = newItemCart.count * newItemCart.offerPrice;
      } else {
        newItemCart.totalPrice = newItemCart.count * newItemCart.price;
      }
      setSubTotalPrice(newItemCart.totalPrice);

      resultTotal();

      localStorage.setItem("cart", JSON.stringify(currentListCart));
    }
  };

  const incrementCount = () => {
    if (countCant < stock) {
      setCountCant(countCant + 1);

      const currentListCart = [...listCartArray];

      const indexCardsCart = currentListCart.findIndex(
        (item) =>
          item.name === name && item.color === colorHex && item.size === size
      );
      const newItemCart = currentListCart[indexCardsCart];
      newItemCart.count = countCant + 1;

      if (offerActive) {
        newItemCart.totalPrice = newItemCart.count * newItemCart.offerPrice;
      } else {
        newItemCart.totalPrice = newItemCart.count * newItemCart.price;
      }
      setSubTotalPrice(newItemCart.totalPrice);

      resultTotal();

      localStorage.setItem("cart", JSON.stringify(currentListCart));
    }
  };

  const hancleClickDelete = () => {
    const listCardsCart = JSON.parse(localStorage.getItem("cart"));

    const indexListCard = listCardsCart.findIndex(
      (item) =>
        item.name === name && item.color === colorHex && item.size === size
    );
    listCardsCart.splice(indexListCard, 1);
    localStorage.setItem("cart", JSON.stringify(listCardsCart));

    if (listCardsCart.length === 0) {
      localStorage.removeItem("cart");
    }
    setListCartArray(listCardsCart);
  };

  return (
    <li
      className={`w-full h-[170px] border-b-1 flex flex-row items-center justify-between relative`}
    >
      <div className="flex gap-x-[2px] sm:gap-x-[8px] w-fit h-fit">
        <img
          src={image}
          alt={name}
          className="w-[85px] sm:w-[100px] h-[100px] object-contain border-1 border-gray-200"
        />
        <section className="flex flex-col justify-between h-[100px]">
          <h2 className=" text-neutral-950 text-[16px] font-bold truncate max-w-[100px]">{name}</h2>
          <h4 className="text-stone-300 text-[12px] font-light">{category}</h4>
          <section className=" flex flex-row gap-x-[3px] items-center">
            <div
              className={`w-[16px] h-[16px] border-gray-300 border-1 rounded-full`}
              style={{ backgroundColor: colorHex }}
            ></div>
            <p className="text-neutral-950 text-[12px] font-light truncate w-[50px] sm:w-fit">
              {nameColor}
            </p>
          </section>
          <p className="text-[12px] text-neutral-950">Talle:{size}</p>
          {offerActive ? <p className="text-xs sm:hidden">${offerPrice}</p> : <p className="text-xs sm:hidden">${price}</p>}
        </section>
      </div>
      {offerActive && offerActive ? (
        <div className="sm:flex sm:flex-col gap-y-2 items-center hidden">
          <p className=" text-colorGray-100 line-through text-sm sm:text-base">${price}</p>
          <p className=" text-neutral-950 text-sm sm:text-base" >${offerPrice}</p>
        </div>
      ) : (
        <p className=" text-colorGray-100 text-sm sm:text-base hidden sm:block">${price}</p>
      )}
      <Counter
        count={countCant}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
      />
      <p className=" font-bold text-sm sm:text-base">${subTotalPrice}</p>
      <button
        className=" cursor-pointer w-[20px] absolute top-5 right-0"
        onClick={hancleClickDelete}
      >
        <DeleteIcon />
      </button>
    </li>
  );
}
