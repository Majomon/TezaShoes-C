import { useState } from "react";
import { IconCart } from "../../../assets/Card/IconCard";

export default function ItemCardCart({ hoverAction }) {
  const [hoverCart, setHoverCart] = useState(false);

  return (
    <div>
      {hoverAction ? (
        <section
          className=" absolute w-[45px] h-[45px] bg-gradient-to-bl from-white from-60% to-stone-200 to-100% rounded-full right-[25px] top-[257px] flex items-center justify-center shadow-ItemShadowCard"
          onMouseEnter={() => setHoverCart(false)}
          onMouseLeave={() => setHoverCart(true)}
        >
          <IconCart color={"#CECECE"} />
        </section>
      ) : (
        <section className=" absolute w-[45px] h-[45px] bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 rounded-full right-[25px] top-[257px] flex items-center justify-center shadow-ItemShadowCardHover">
          <IconCart color={"#EAA724"} />
        </section>
      )}
    </div>
  );
}
