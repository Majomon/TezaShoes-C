import Image from "next/image";
import { useEffect, useState } from "react";
import mainImageHomeMaxSize from "../../../assets/image/mainIMageHomeMaxSize.png";
import mainImagePhone from "../../../assets/image/mainImagePhone.webp";

export default function MainImage() {
  const [activeWidth, setActiveWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setActiveWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className=" w-[100%] flex justify-center items-center">
      {activeWidth > 750 ? (
        <Image
          src={mainImageHomeMaxSize}
          width={1920}
          alt="altMain"
          /* className=" w-[100%] max-h-[600px]" */
        />
      ) : (
        <Image
          src={mainImagePhone}
          width={750}
          alt="altMain"
          /* className=" w-[100%] min-h-[450px]" */
        />
      )}
    </div>
  );
}
