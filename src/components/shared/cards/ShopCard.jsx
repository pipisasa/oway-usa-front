import React, { useState } from "react";
import s from "@/styles/components/shared/cards/ShopCard.module.scss";
import Link from "next/link";

export default function ShopCard({ shop, onEdit, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    onDelete(shop?.id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={s.card}>
      <div className={s.cards_img}>
        <img src={`https://api-owayusa.com/${shop?.logo}`} alt={shop.name} />
      </div>
      <div className={s.card_text}>
        <Link target={shop?.url ? "_blank" : ""} href={shop?.url || ""}>
          <h2>{shop.name}</h2>
        </Link>
        <p>{shop.description}</p>
      </div>
      <div className={s.card_btn}>
        <button
          className={s.card_button}
          onClick={() => handleEditClick(shop?.id)}
        >
          <img src="/assets/icons/edit.svg" alt="" />
        </button>
        <button onClick={handleDelete}>
          <img src="/assets/icons/delete.svg" alt="" />
        </button>
      </div>
      {showDeleteModal && (
        <div className={s.modal}>
          <div className={s.modal_content}>
            <p>Вы уверены, что хотите удалить этот сайт?</p>
            <div>
              <button onClick={handleDeleteConfirmed}>Yes</button>
              <button onClick={handleDeleteCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
