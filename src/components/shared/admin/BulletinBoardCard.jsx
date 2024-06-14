import React from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";
import EditBulletinBoardCategory from "./modals/EditBulletinBoardCategory";

export default function BulletinBoardCard({ bulletin }) {
  const { deleteBulletinBoard, loading } = useBulletinBoardCategory();

  const handleDelete = async () => {
    await deleteBulletinBoard(bulletin.id);
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
            <button
              className={s.delete}
              onClick={handleDelete}
              disabled={loading}
            >
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
    </div>
  );
}
