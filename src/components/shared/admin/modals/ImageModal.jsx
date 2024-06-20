import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import s from "@/styles/admin/modal/ImageModal.module.scss";

export default function ImageModal({ src, onClose }) {
  const { isOpen, onOpen, onClose: close } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  React.useEffect(() => {
    handleOpen("blur");
  }, []);

  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <div className={s.modal_backdrop}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <img src={src} alt="Zoomed" />
            </ModalBody>
          </>
        </ModalContent>
      </div>
    </Modal>
  );
}
