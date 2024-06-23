import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import s from "@/styles/admin/modal/ImageModal.module.scss";

export default function ImageModal({ src, onClose, onDelete }) {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  React.useEffect(() => {
    handleOpen("blur");
  }, []);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    closeModal();
  };

  return (
    <>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={closeModal}>
        <div className={s.modal_backdrop}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <button className={s.delete_button} onClick={handleDelete}>
                Удалить
              </button>
            </ModalHeader>
            <ModalBody>
              <img src={src} alt="Zoomed" />
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
