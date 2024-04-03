import React, { useState } from "react";
import s from "@/styles/pages/user/UserNotification.module.scss";
import NotificationsCard from "@/components/shared/users/NotificationsCard";
import NotificationsSettings from "@/components/shared/users/settings/NotificationsSettings";
import useNotification from "../../hooks/user/useNotification";

export default function UserNotificationPage() {
  const { products, updateCheckAllNotification } = useNotification();
  const [showAllNotifications, setShowAllNotifications] = useState(true);

  return (
    <section className={s.notifications_page}>
      <div className={s.notifications_block}>
        <div className={s.notifications_header}>
          <div className={s.notif_tabs}>
            <button
              className={showAllNotifications ? s.active_tab : s.not_active_tab}
              onClick={() => setShowAllNotifications(true)}
            >
              Все уведомления ({products?.total_notifications})
            </button>
            <button
              className={
                !showAllNotifications ? s.active_tab : s.not_active_tab
              }
              onClick={() => setShowAllNotifications(false)}
            >
              Непрочитанные ({products?.total_not_checked_notifications})
            </button>
          </div>
          <button
            onClick={() => updateCheckAllNotification()}
            className={s.check_all_notif}
          >
            Отметить все как прочитанные
          </button>
        </div>
        <div className={s.ntf_list}>
          {showAllNotifications
            ? products?.all_notifications?.map((notification, index) => (
                <NotificationsCard key={index} notification={notification} />
              ))
            : products?.not_checked_notifications?.map(
                (notification, index) => (
                  <NotificationsCard key={index} notification={notification} />
                )
              )}
        </div>
      </div>
      <NotificationsSettings />
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
