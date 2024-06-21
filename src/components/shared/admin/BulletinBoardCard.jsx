import React, { useState } from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";
import EditBulletinBoardCategory from "./modals/EditBulletinBoardCategory";

export default function BulletinBoardCard({ bulletin }) {
  const { deleteBulletinBoard, loading } = useBulletinBoardCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsModalOpen(false);
    await deleteBulletinBoard(bulletin.id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.flex}>
          <div className={s.db}>
            <h2>{bulletin.name}</h2>
          </div>
          <div className={s.btns}>
            <EditBulletinBoardCategory bulletin={bulletin} />
            <button className={s.delete} onClick={openModal} disabled={loading}>
              <img src="/assets/icons/delete.svg" alt="Удалить" />
            </button>
          </div>
        </div>
      </div>
      <div className={s.df}>
        <div
          className={s.borderradius}
          style={{ backgroundColor: `${bulletin.color}` }}
        ></div>
        <p>{bulletin.color}</p>
      </div>
      <span>{bulletin.publication_date}</span>

      {isModalOpen && (
        <div className={s.modal_overlay}>
          <div className={s.modal}>
            <h2>Подтверждение</h2>
            <p>Вы точно хотите удалить?</p>
            <div className={s.buttons}>
              <button onClick={closeModal}>Отмена</button>
              <button onClick={handleDelete}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
