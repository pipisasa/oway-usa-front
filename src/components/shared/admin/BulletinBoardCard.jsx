import React from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import EditBulletinBoard from "./modals/EditBulletinBoard";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";

export default function BulletinBoardCard({ bulletin }) {
  const { deleteBulletinBoard, loading } = useBulletinBoard();

  const handleDelete = async () => {
    await deleteBulletinBoard(bulletin.id);
  };
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <h5 style={{ backgroundColor: `${bulletin.color}` }}>
          {bulletin.category}
        </h5>
        <div className={s.btns}>
          <EditBulletinBoard bulletin={bulletin} />
          <button
            className={s.delete}
            onClick={handleDelete}
            disabled={loading}
          >
            <img src="/assets/icons/delete.svg" alt="Удалить" />
          </button>
        </div>
      </div>

      <p>{bulletin.text}</p>
      <span>{bulletin.publication_date}</span>
    </div>
  );
}
