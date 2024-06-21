import React, { useState } from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import EditBulletinBoard from "./modals/EditBulletinBoard";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";

export default function BulletinBoardCards({ bulletin }) {
  const { deleteBulletinBoard, loading } = useBulletinBoard();
  const { bulletins1 } = useBulletinBoardCategory();
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

  const matchingBulletin = bulletins1.find(
    (item) => item.id === bulletin.item_category
  );

  return (
    <>
      {matchingBulletin && (
        <div className={s.card}>
          <div className={s.card_header}>
            <div className={s.flex}>
              <div>
                <h5
                  style={{
                    backgroundColor: `${matchingBulletin.color}`,
                  }}
                >
                  {matchingBulletin.name}
                </h5>
              </div>
              <div className={s.btns}>
                <EditBulletinBoard bulletin={bulletin} />
                <button
                  className={s.delete}
                  onClick={openModal}
                  disabled={loading}
                >
                  <img src="/assets/icons/delete.svg" alt="Удалить" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <span>{bulletin.text}</span>
          </div>
          <span>{bulletin.publication_date}</span>
        </div>
      )}
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
    </>
  );
}
