import React, { useState } from "react";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";
import Link from "next/link";
import ImageModal from "../admin/modals/ImageModal";

const ProductsCard = ({ title, link, image, editProduct, deleteProduct }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirmed = () => {
    deleteProduct();
    setShowDeleteModal(false);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className={s.card_block}>
      <div className={s.data}>
        <div className={s.card_img}>
          <img
            src={image}
            alt=""
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={s.card_text}>
          <h2>{title}</h2>
          <Link href={link}>{link}</Link>
        </div>
      </div>
      <div className={s.btns}>
        <button onClick={editProduct} className={s.edit}>
          <img src="/assets/icons/edit.svg" alt="Edit" />
        </button>
        <button onClick={handleDeleteConfirmation} className={s.delete}>
          <img src="/assets/icons/delete.svg" alt="Delete" />
        </button>
      </div>
      {showDeleteModal && (
        <div className={s.modal}>
          <div className={s.modal_content}>
            <p>Вы уверены, что хотите удалить этот товар?</p>
            <h2>{title}</h2>
            <div>
              <button onClick={handleDeleteConfirmed}>ДА</button>
              <button onClick={handleDeleteCancel}>Нет</button>
            </div>
          </div>
        </div>
      )}
      {isImageModalOpen && <ImageModal src={image} onClose={closeModal} />}
    </div>
  );
};

export default ProductsCard;
