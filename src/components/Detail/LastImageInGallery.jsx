export default function LastImageInGallery({
  index,
  image,
  handlerImgModal,
  lengthDetailImage,
}) {
  return (
    <div
      className=" w-full max-w-[120px] h-[120px] relative cursor-pointer"
      onClick={handlerImgModal}
    >
      <div className=" bg-colorBlack-400 absolute top-0 left-0 w-full h-full opacity-50 flex items-center justify-center" />
      <p className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-normal text-colorWhite-100 text-[32px]">
        +{lengthDetailImage}
      </p>
      <img
        key={index}
        src={image}
        alt={`Image ${index + 1}`}
        className="w-full h-full rounded-sm object-contain"
      />
    </div>
  );
}
