import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

function DashboardModalClient({ isOpenModalClient, setIsOpenModalClient }) {
  return (
    <Modal
      isOpen={isOpenModalClient}
      placement="top-center"
      scrollBehavior="inside"
      backdrop="blur"
      onClose={() => setIsOpenModalClient(false)}
    >
      <ModalContent>
        <ModalHeader>
          <h1 className=" font-semibold text-xl text-colorBlack-400">
            Detalles del cliente
          </h1>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DashboardModalClient;
