import React from "react";
import s from "@/styles/components/shared/NotificationsSettings.module.scss";

export default function NotificationsSettings() {
  return (
    <div className={s.settings_block}>
      <h3>Настройки уведомлений</h3>
      <div className={s.ntf_btns}>
        <div>
          <button>Прибытие</button>
        </div>
        <div>
          <button>Новости компании</button>
        </div>
        <div>
          <button>Push-уведомления</button>
        </div>
      </div>
    </div>
  );
}
