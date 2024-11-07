import React from "react";
import s from "@/styles/components/shared/UserNotificationsCard.module.scss";
import { API_URL } from "@/constants";

export default function NotificationsCard({ notification }) {
  return (
    <div className={s.card}>
      <div className={s.card_title}>
        <div className={s.ntf_img}>
          <img
            src={`${API_URL}${notification?.notification?.icon}`}
            alt="Иконка уведомления"
          />
        </div>
        <div className={s.ntf_text}>
          <h3>{notification?.notification?.title}</h3>
          <p>{notification?.notification?.description}</p>
        </div>
      </div>
      <div className={s.card_date}>
        <span>21:32</span>
        <span>01.04</span>
      </div>
    </div>
  );
}
