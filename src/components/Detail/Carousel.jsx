"use client";
import { useStoreProducts } from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CarouselModal from "./CarouselModal";
import LastImageInGallery from "./LastImageInGallery";
import MobileResponsiveCarousel from "./MobileResponsiveCarousel";

export default function Carousel() {
  /* useStates */
  const [firstImage, setFirstImage] = useState(null);
  const [imgSelected, setImgSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrayImg, setArrayImg] = useState([]);
  const [newArrayImg, setNewArrayImg] = useState([]);
  /* variables */
  const filteredImages = arrayImg.filter((image) => image !== imgSelected);
  const maxItems = 4;
  let contItems = 0;
  /* destructuring */
  const { detail } = useStoreProducts();
  /* useEffect */
  useEffect(() => {
    if (imgSelected) {
      setNewArrayImg([imgSelected, ...filteredImages]);
    }
  }, [imgSelected]);

  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      setFirstImage(detail.images[0]);
      detail.images.forEach((image) => {
        setArrayImg((prevArrayImg) => [...prevArrayImg, image]);
      });
    }
  }, [detail.images]);

  /* funciones */
  const handlerSelectImg = (image) => {
    setImgSelected(image);
  };

  const handlerImgModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const lengthDetailImage = (detail) => {
    return detail.images.length;
  };

  return (
    <div className="w-full h-fit flex flex-col-reverse gap-y-4 md:flex-row gap-x-[30px] ">
      {!detail.images ? (
        <div className="w-2/12 h-full flex flex-col gap-2 px-2">
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
          <Card className="w-[50px] h-[50px] flex flex-col p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-[50px] h-[50px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
      ) : (
        <div className="md:w-2/12 w-full h-full flex-row justify-between md:flex-col gap-y-2 hidden min-[570px]:flex">
          {/* Galeria de imagenes */}
          {detail.images?.map(
            (image, index) => (
              (contItems += 1),
              contItems < maxItems && contItems !== 5 ? (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-[120px] h-[120px] rounded-sm  cursor-pointer hover:shadow-md hover:shadow-gray-600 border-1 object-contain"
                  onClick={() => handlerSelectImg(image)}
                />
              ) : index === maxItems ? (
                <LastImageInGallery
                  key={index}
                  index={index}
                  image={image}
                  handlerImgModal={handlerImgModal}
                  lengthDetailImage={lengthDetailImage(detail)}
                />
              ) : (
                ""
              )
            )
          )}
        </div>
      )}
      {!firstImage ? (
        <div className="w-md:10/12 w-full h-full  ">
          <Card className="w-full h-full p-2" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="w-full h-[400px] rounded-sm bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
      ) : (
        <div className="w-full md:w-10/12 md:mx-auto h-[505px]  ">
          {/* Imagen del producto principal */}
          <MobileResponsiveCarousel
            imagens={detail.images}
            handlerImgModal={handlerImgModal}
            imgSelected={imgSelected}
          />
          {imgSelected ? (
            <img
              src={imgSelected}
              alt="Descripción de la imagen"
              className=" hidden min-[570px]:block w-full mx-auto h-full rounded-sm cursor-pointer object-contain border-1"
              onClick={handlerImgModal}
            />
          ) : (
            <img
              src={firstImage}
              alt="Descripción de la imagen"
              className=" hidden min-[570px]:block w-full mx-auto h-full rounded-sm cursor-pointer object-contain border-1"
              onClick={handlerImgModal}
            />
          )}
        </div>
      )}

      {isModalOpen && (
        <CarouselModal
          images={arrayImg}
          closeModal={closeModal}
          newArrayImg={newArrayImg}
        />
      )}
    </div>
  );
}
