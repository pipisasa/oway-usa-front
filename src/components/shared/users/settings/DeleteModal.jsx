import React from "react";
import s from "@/styles/users/Address.module.scss";
import CloseModal from "../../ui/CloseModal";

const DeleteModal = ({ isModalOpen, toggleModal, handleDelete, deleteId }) => {
  if (!isModalOpen) return null;

  const confirmDelete = () => {
    handleDelete(deleteId);
    toggleModal();
  };

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2>Удалить адрес</h2>
        <p>Вы точно хотите удалить этот адрес?</p>
        <div className={s.buttonGroup}>
          <button
            type="button"
            onClick={toggleModal}
            className={s.cancelButton}
          >
            <CloseModal /> Отменить
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className={s.submitButton}
          >
            Удалить
          </button>
        </div>
        <button className={s.closeButton} onClick={toggleModal}>
          <img src="/assets/icons/ui/closemodal.svg" alt="closemoadal" />
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
