import React from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import EditBulletinBoard from "./modals/EditBulletinBoard";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";

export default function BulletinBoardCards({ bulletin }) {
  const { deleteBulletinBoard, loading } = useBulletinBoard();
  const { bulletins1 } = useBulletinBoardCategory();

  const handleDelete = async () => {
    await deleteBulletinBoard(bulletin.id);
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
                  onClick={handleDelete}
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
    </>
  );
}
