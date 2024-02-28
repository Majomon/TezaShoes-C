import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import TablesGuide from "./TablesGuide";

export default function SizeGuideShoes({
  isOpenSizeGuide,
  setIsOpenSizeGuide,
}) {
  return (
    <Modal
      isOpen={isOpenSizeGuide}
      placement="top-center"
      scrollBehavior="inside"
      backdrop="blur"
      onClose={() => setIsOpenSizeGuide(false)}
    >
      <ModalContent>
        <ModalHeader>
          <h1 className=" font-semibold text-xl text-colorBlack-400">Guia de talles</h1>
        </ModalHeader>
        <ModalBody>
          <TablesGuide />
          <section className="flex flex-col gap-y-2">
            <h3 className=" font-semibold text-base uppercase">Como medir</h3>
            <p className=" font-normal text-sm text-colorBlack-400">
              Lorem ipsum dolor sit amet consectetur. Purus tortor curabitur
              lectus lacinia risus volutpat enim elementum mollis. Diam sed
              pellentesque vehicula quisque fusce lacus sapien ullamcorper.
              Libero ut eu integer iaculis blandit sit. Tristique in mattis
              senectus blandit lacinia commodo lectus. Lacus mus eu orci enim
              eget varius libero sagittis. Ipsum augue nunc adipiscing et at
              congue senectus nisi. Leo ac arcu nunc eu vel. Aliquam sed massa
              velit risus. Fermentum porttitor leo ut vitae. Lorem ipsum dolor
              sit amet consectetur. Purus tortor curabitur lectus lacinia risus
              volutpat enim elementum mollis. Diam sed pellentesque vehicula
              quisque fusce lacus sapien ullamcorper. Libero ut eu integer
              iaculis blandit sit. Tristique in mattis senectus blandit lacinia
              commodo lectus. Lacus mus eu orci enim eget varius libero
              sagittis. Ipsum augue nunc adipiscing et at congue senectus nisi.
              Leo ac arcu nunc eu vel. Aliquam sed massa velit risus. Fermentum
              porttitor leo ut vitae.{" "}
            </p>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
