import React from "react";
import s from "@/styles/users/Address.module.scss";
import Arrow from "../../ui/Arrow";
import CloseModal from "../../ui/CloseModal";

const EditModal = ({
  isModalOpen,
  toggleModal,
  handleSubmit,
  handleChange,
  formData,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2>Редактировать адрес</h2>
        <form onSubmit={handleSubmit}>
          <div className={s.input}>
            <label>ФИО</label>
            <input
              type="text"
              name="full_name"
              placeholder="Введите имя"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={s.df}>
            <div className={s.input}>
              <label>Страна</label>
              <input
                type="text"
                name="country"
                placeholder="Выберите страну"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className={s.input}>
              <label>Город</label>
              <input
                type="text"
                name="city"
                placeholder="Сначала выберите страну"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={s.input}>
            <label>Адрес</label>
            <input
              type="text"
              name="address"
              placeholder="Напишите домашний адрес или ближайщий ПВЗ СДЭК"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={s.df}>
            <div className={s.input}>
              <label>Номер телефона</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Введите номер телефона"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className={s.input}>
              <label>Электронная почта</label>
              <input
                type="email"
                name="email"
                placeholder="Введите электронную почту"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={s.buttonGroup}>
            <button
              type="button"
              onClick={toggleModal}
              className={s.cancelButton}
            >
              <CloseModal /> Отклонить
            </button>
            <button type="submit" className={s.submitButton}>
              Принять <Arrow />
            </button>
          </div>
        </form>
        <button className={s.closeButton} onClick={toggleModal}>
          <img src="/assets/icons/ui/closemodal.svg" alt="closemoadal" />
        </button>
      </div>
    </div>
  );
};

export default EditModal;
