import React from "react";
import s from "@/styles/components/shared/TableTabs.module.scss";

export default function TableTabs({ onTabClick, activeTab }) {
  return (
    <div className={s.tabs}>
      <button
        className={activeTab === "onTheWay" ? s.active_tabs : s.not_active_tabs}
        onClick={() => onTabClick("onTheWay")}
      >
        В пути (3)
      </button>
      <button
        className={
          activeTab === "readyIssued" ? s.active_tabs : s.not_active_tabs
        }
        onClick={() => onTabClick("readyIssued")}
      >
        Готов к выдаче (1)
      </button>
      <button
        className={
          activeTab === "delivered" ? s.active_tabs : s.not_active_tabs
        }
        onClick={() => onTabClick("delivered")}
      >
        Доставлено (2)
      </button>
    </div>
  );
}
