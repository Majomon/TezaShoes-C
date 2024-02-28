"use client";
import { Carousel } from "flowbite-react";
import { IconCloseModal } from "../../../assets/ModalDetail/IconsModal";

export default function CarouselModal({ images, closeModal, newArrayImg }) {
  return (
    <div className="">
      <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 z-40 bg-neutral-950/50 backdrop-blur-sm flex justify-center items-center animate-modalImageScaleIn"></div>
      <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 z-40 flex justify-center items-center  ">
        <div className=" absolute z-50 top-6 right-6">
          <h2
            className="text-gray-100 p-2 rounded-full cursor-pointer"
            onClick={() => closeModal()}
          >
            <IconCloseModal />
          </h2>
        </div>
        <Carousel>
          {newArrayImg.length > 0
            ? newArrayImg.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={image}
                  className=" w-[80%] md:w-5/12 md:h-4/5 rounded-md z-50 object-contain animate-imageOpacityIn"
                />
              ))
            : images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={image}
                  className=" w-[80%] md:w-6/12 md:h-4/5 rounded-md z-50 object-contain animate-imageOpacityIn"
                />
              ))}
        </Carousel>
      </div>
    </div>
  );
}
