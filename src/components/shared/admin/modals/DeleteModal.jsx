import React from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";

const DeleteModal = ({ warehouse, onDelete, onCancel }) => (
  <>
    <div className={s.modalBackdrop}></div>
    <div className={s.confirmDeleteModal}>
      <p>Вы уверены, что хотите удалить этот товар?</p>
      <div>
        <button onClick={onDelete}>Да</button>
        <button onClick={onCancel}>Отмена</button>
      </div>
    </div>
  </>
);

export default DeleteModal;
