import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";

export default function AddUsersModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить пользователя
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить пользователя</h3>
        <form>
          <div className={s.forms}>
            <div>
              <label htmlFor="">Имя</label>
              <input type="text" placeholder="Введиье имя" />
            </div>
            <div>
              <label htmlFor="">Фамилия</label>
              <input type="text" placeholder="Ввдите фмилию" />
            </div>
            <div>
              <label htmlFor="">Почта</label>
              <input type="email" placeholder="Введите почту" />
            </div>
            <div>
              <label htmlFor="">Номер телефона</label>
              <input type="number" placeholder="Введите номер телефон" />
            </div>
            <div>
              <label htmlFor="">Пароль</label>
              <input type="password" placeholder="Введите пароль" />
            </div>
            <div>
              <label htmlFor="">Пароль повторно</label>
              <input type="password" placeholder="Введите пароль повторно" />
            </div>
            <div>
              <label htmlFor="">Лицевая сторона паспорта</label>
              <input type="file" placeholder="Введите номер телефон" />
            </div>
            <div>
              <label htmlFor="">Обратная сторона паспорта</label>
              <input type="file" placeholder="Введите номер телефон" />
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Добавить пользователя
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
