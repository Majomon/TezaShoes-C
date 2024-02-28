function ModalContinue({ productAdd, closeModal, closeModalOpenCart }) {
  return (
    <div className="w-full min-h-screen absolute top-16 left-0 flex justify-center bg-gray-100/50 z-10">
      <div className="w-[300px] md:w-4/12 md:mx-auto h-fit flex flex-col gap-y-2 justify-around items-center bg-white shadow-cardPurchaseShadow p-4 rounded-br-lg rounded-bl-lg transition-all duration-300 ">
        <h2 className=" text-base font-normal text-center">
          ¡Producto {productAdd} agregado al carrito
        </h2>
        <section className="flex flex-col gap-2 md:flex-row w-full">
          <button
            className="w-full md:w-1/2 text-base text-black rounded-sm bg-colorGoldSecundary-250 hover:bg-colorGoldSecundary-500 hover:text-white p-2"
            onClick={closeModal}
          >
            Continuar comprando
          </button>
          <button
            className="w-full md:w-1/2 text-base p-2 bg-colorGoldSecundary-250 hover:bg-colorGoldSecundary-500 hover:text-white"
            onClick={closeModalOpenCart}
          >
            Ver el carrito
          </button>
        </section>
      </div>
    </div>
  );
}

export default ModalContinue;
