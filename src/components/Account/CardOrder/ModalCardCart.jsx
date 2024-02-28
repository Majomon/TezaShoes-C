import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ItemModal from "./ItemModal/ItemModal";
import ItemPayment from "./ItemPayment";

export default function ModalCardCart({
  numberOrder,
  isOpenModalCard,
  setIsOpenModalCard,
  cart,
  paymentMethod,
  address,
}) {
  let cantTotal = 0;
  let priceTotalOrder = 0;
  const { street, number, city, postalCode, province } = address;
  return (
    <Modal
      isOpen={isOpenModalCard}
      onClose={() => setIsOpenModalCard(!isOpenModalCard)}
      backdrop="blur"
      placement="center"
      scrollBehavior="inside"
      isDismissable={false}
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader>
          <h4>id: {numberOrder}</h4>
        </ModalHeader>
        <ModalBody>
          {cart.map((item, index) => {
            const {
              name,
              category,
              image,
              nameColor,
              size,
              price,
              count,
              totalPrice,
            } = item;
            cantTotal += count;
            priceTotalOrder += totalPrice;
            return (
              <ItemModal
                key={index}
                name={name}
                category={category}
                image={image}
                colorName={nameColor}
                size={size}
                price={price}
                count={count}
                totalPrice={totalPrice}
              />
            );
          })}
        </ModalBody>
        <ModalFooter className=" border-t-1 border-colorGoldSecundary-500 flex flex-col gap-y-4">
          <div className="w-full">
            <section className="flex justify-between items-center">
              <p className="text-stone-300">Envio</p>
              <p>$0</p>
            </section>
            <section className="flex justify-between items-center">
              <p className="text-stone-300">Cantidad</p>
              <p>{cantTotal}</p>
            </section>
            <section className="flex justify-between items-center">
              <p className="text-stone-300">Total</p>
              <p className=" font-semibold text-colorBlack-400">
                ${priceTotalOrder}
              </p>
            </section>
          </div>
          <div className=" flex flex-col">
            <h3 className="text-neutral-950 text-ms font-bold">
              Metodo de pago
            </h3>
            {paymentMethod && paymentMethod === "Transferencia" ? (
              <ItemPayment paymentMethod={paymentMethod} />
            ) : (
              <ItemPayment paymentMethod={paymentMethod} />
            )}
          </div>
          <div>
            <h3 className="text-neutral-950 text-ms font-bold">Direccion</h3>
            <section className="flex justify-between items-center">
              <p>
                {street},{number}
              </p>
              <p>{postalCode}</p>
            </section>
            <section className="flex justify-between items-center">
              <p>{city}</p>
              <p>{province}</p>
            </section>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
