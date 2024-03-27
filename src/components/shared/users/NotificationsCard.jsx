import React from "react";
import s from "@/styles/components/shared/UserNotificationsCard.module.scss";

export default function NotificationsCard() {
  return (
    <div className={s.card}>
      <div className={s.card_title}>
        <div className={s.ntf_img}></div>
        <div className={s.ntf_text}>
          <h3>Оформление заказа (был оформлен)</h3>
          <p>Текст для уведомления</p>
        </div>
      </div>
      <div className={s.card_date}>
        <span>21:00</span>
        <span>15.03.2024</span>
      </div>
    </div>
  );
}
