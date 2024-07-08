import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import s from "@/styles/admin/modal/ImageModal.module.scss";

export default function ImageModal({ src, isOpen, onClose, onDelete }) {
  const [backdrop, setBackdrop] = useState("opaque");

  useEffect(() => {
    if (isOpen) {
      setBackdrop("blur");
    }
  }, [isOpen]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
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
  );
}
