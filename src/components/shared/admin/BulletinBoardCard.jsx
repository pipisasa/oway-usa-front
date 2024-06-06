import React from "react";
import s from "@/styles/admin/BulletinBoardCard.module.scss";
import EditBulletinBoard from "./modals/EditBulletinBoard";

export default function BulletinBoardCard() {
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <h5>Категория</h5>
        <div className={s.btns}>
          <EditBulletinBoard />
          <button className={s.delete}>
            <img src="/assets/icons/delete.svg" alt="" />
          </button>
        </div>
      </div>

      <p>
        NASA отменила запуск Boeing Starliner из-за технических неисправностей
      </p>
      <span>03.22.2023</span>
    </div>
  );
}
