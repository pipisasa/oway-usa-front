import React from "react";
import s from "@/styles/components/shared/TableTabs.module.scss";
import useWarehousesUser from "@/hooks/user/useWarehousesUser";

export default function TableTabs({ onTabClick, activeTab }) {
  const { warehouses } = useWarehousesUser();
  const countByStatus = (statusName) => {
    return (
      warehouses.results?.filter((item) => item.status.name === statusName)
        ?.length || 0
    );
  };

  return (
    <div className={s.tabs}>
      <button
        className={activeTab === "onTheWay" ? s.active_tabs : s.not_active_tabs}
        onClick={() => onTabClick("onTheWay")}
      >
        Все заказы ({warehouses?.count})
      </button>

      <button
        className={
          activeTab === "delivered" ? s.active_tabs : s.not_active_tabs
        }
        onClick={() => onTabClick("delivered")}
      >
        Доставлено ({countByStatus("Отправлено курьерской службой")})
      </button>
    </div>
  );
}
