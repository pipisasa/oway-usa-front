import React from "react";
import s from "@/styles/components/shared/cards/WarehousesCard.module.scss";
import EditWarehouses from "../admin/modals/EditWarehouses";
import { useWarehouses } from "@/hooks/admin/warehouses/useWarehouses";

export default function WarehousesCard({ warehouse }) {
  const { deleteWarehouse } = useWarehouses();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Вы уверены, что хотите удалить склад "${warehouse.name}"?`
    );
    if (confirmed) {
      const success = await deleteWarehouse(warehouse.id);
      if (success) {
        alert("Склад удалён");
      } else {
        alert("Ошибка при удалении склада");
      }
    }
  };

  return (
    <div className={s.card}>
      <div className={s.card_info}>
        <h2>{warehouse.name}</h2>
        <div className={s.btns}>
          <EditWarehouses warehouse={warehouse} />
          <button className={s.delete} onClick={handleDelete}>
            <img src="/assets/icons/delete.svg" alt="" />
          </button>
        </div>
      </div>
      <button className={s.view}>Посмотреть</button>
    </div>
  );
}
