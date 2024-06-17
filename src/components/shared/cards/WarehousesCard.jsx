import React, { useState } from "react";
import s from "@/styles/components/shared/cards/WarehousesCard.module.scss";
import EditWarehouses from "../admin/modals/EditWarehouses";
import { useRouter } from "next/router";

export default function WarehousesCard({ warehouse, deleteWarehouse }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const success = await deleteWarehouse(warehouse.id);
    if (success) {
      setConfirmModalIsOpen(false);
      setModalIsOpen(false);
    } else {
    }
  };

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
  };

  const closeAllModals = () => {
    setConfirmModalIsOpen(false);
    setModalIsOpen(false);
  };

  return (
    <div className={s.card}>
      <div className={s.card_info}>
        <h2>{warehouse.name}</h2>
        <div className={s.btns}>
          <EditWarehouses warehouse={warehouse} />
          <button className={s.delete} onClick={() => setModalIsOpen(true)}>
            <img src="/assets/icons/delete.svg" alt="Delete" />
          </button>
        </div>
      </div>
      <button
        className={s.view}
        onClick={() => router.push(`/admin/warehouses/${warehouse.name}`)}
      >
        Посмотреть
      </button>
      {modalIsOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <h2>Вы уверены, что хотите удалить склад {warehouse.name}?</h2>
            <div className={s.modal_buttons}>
              <button onClick={openConfirmModal}>Да</button>
              <button onClick={() => setModalIsOpen(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
      {confirmModalIsOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <h2>
              Вы точно-точно уверены, что хотите удалить склад {warehouse.name}?
            </h2>
            <div className={s.modal_buttons}>
              <button onClick={handleDelete}>Да, точно</button>
              <button onClick={closeAllModals}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
