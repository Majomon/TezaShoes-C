import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import TablesGuide from "./TablesGuide";

export default function SizeGuideShoes({
  isOpenSizeGuide,
  setIsOpenSizeGuide,
  categoryDetailId,
}) {
  return (
    <Modal
      isOpen={isOpenSizeGuide}
      placement="center"
      scrollBehavior="inside"
      backdrop="blur"
      onClose={() => setIsOpenSizeGuide(false)}
    >
      <ModalContent>
        <ModalHeader>
          <h1 className=" font-semibold text-xl text-colorBlack-400">
            Guia de talles
          </h1>
        </ModalHeader>
        <ModalBody>
          <TablesGuide categoryDetailId={categoryDetailId} />
          <section className="flex flex-col gap-y-2">
            <h3 className=" font-semibold text-base uppercase">Como medir</h3>
            <p className=" font-normal text-sm text-colorBlack-400">
              Lorem ipsum dolor sit amet consectetur. Purus tortor curabitur
              lectus lacinia risus volutpat enim elementum mollis. Diam sed
              pellentesque vehicula quisque fusce lacus sapien ullamcorper.
              Libero ut eu integer iaculis blandit sit.
            </p>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
