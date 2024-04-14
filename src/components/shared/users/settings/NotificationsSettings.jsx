import React from "react";
import s from "@/styles/components/shared/NotificationsSettings.module.scss";
import { Switch } from "@nextui-org/react";

export default function NotificationsSettings() {
  return (
    <div className={s.settings_block}>
      <h3>Настройки уведомлений</h3>
      <div className={s.ntf_btns}>
        <div>
          <button>Прибытие</button>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div>
          <button>Новости компании</button>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
      </div>
    </div>
  );
}
