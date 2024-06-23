import React, { useState } from "react";
import styles from "./ImagePreviewModal.module.scss";

const ImagePreviewModal = ({ previewImage, onClose, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const deleteImage = () => {
    if (onDelete) {
      onDelete();
    }
    closeModal();
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        Посмотреть картинку
      </button>
      {modalIsOpen && (
        <div className={styles.image_preview_modal_overlay}>
          <div className={styles.modal_content}>
            {previewImage ? (
              <>
                <div className={styles.qwe}>
                  <p>Выбранная картинка:</p>
                  <button className={styles.close_button} onClick={closeModal}>
                    Закрыть
                  </button>
                  <button
                    className={styles.delete_button}
                    onClick={deleteImage}
                  >
                    Удалить
                  </button>
                </div>
                <img src={previewImage} alt="preview" />
              </>
            ) : (
              <p>Картинка не выбрана.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModal;
