import React from "react";
import s from "@/styles/pages/user/UserNotification.module.scss";
import NotificationsCard from "@/components/shared/users/NotificationsCard";
import NotificationsSettings from "@/components/shared/users/settings/NotificationsSettings";

export default function UserNotificationPage() {
  return (
    <section className={s.notifications_page}>
      <div className={s.notifications_block}>
        <div className={s.notifications_header}>
          <div className={s.notif_tabs}>
            <button className={s.active_tab}>Все уведомления (3)</button>
            <button className={s.not_active_tab}>Непрочитанные (1)</button>
          </div>
          <button className={s.check_all_notif}>
            Отметить все как прочитанные
          </button>
        </div>
        <div className={s.ntf_list}>
          <NotificationsCard />
          <NotificationsCard />
          <NotificationsCard />
        </div>
      </div>
      <NotificationsSettings />
    </section>
  );
}
