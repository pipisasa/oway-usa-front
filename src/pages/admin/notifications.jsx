import React from "react";
import s from "@/styles/pages/admin/AdminNotificationsPage.module.scss";

export default function AdminNotificationPage() {
  return (
    <main className={s.noti_page}>
      <div className={s.notification}>
        <div className={s.img}></div>
        <div className={s.text}>
          <h3>Оформление заказа (был оформлен)</h3>
          <p>Текст для уведомления</p>
        </div>
      </div>
      <div className={s.notification}>
        <div className={s.img}></div>
        <div className={s.text}>
          <h3>Оформление заказа (был оформлен)</h3>
          <p>Текст для уведомления</p>
        </div>
      </div>
      <div className={s.notification}>
        <div className={s.img}></div>
        <div className={s.text}>
          <h3>Оформление заказа (был оформлен)</h3>
          <p>Текст для уведомления</p>
        </div>
      </div>
      <div className={s.notification}>
        <div className={s.img}></div>
        <div className={s.text}>
          <h3>Оформление заказа (был оформлен)</h3>
          <p>Текст для уведомления</p>
        </div>
      </div>
    </main>
  );
}
