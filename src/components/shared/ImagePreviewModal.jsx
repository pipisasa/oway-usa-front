import React, { useState } from "react";
import styles from "./ImagePreviewModal.module.scss";

const ImagePreviewModal = ({ previewImage, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        Посмотреть картинку
      </button>
      {modalIsOpen && (
        <div className={styles.image_preview_modal_overlay}>
          <div className={styles.modal_content}>
            {previewImage && (
              <>
                <div>
                  <p>Выбранная картинка:</p>
                  <button className={styles.close_button} onClick={closeModal}>
                    Закрыть
                  </button>
                </div>
                <img src={previewImage} alt="preview" />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModal;
