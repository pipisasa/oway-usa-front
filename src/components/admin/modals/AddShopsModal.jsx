import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../shared/Modal";

export default function AddShopsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить сайт
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить сайт</h3>
        <form>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="">Название сайта</label>
                <input type="text" placeholder="Введите название" />
              </div>
              <div>
                <label htmlFor="">Ссылка сайта</label>
                <input type="text" placeholder="Вставьте ссылку" />
              </div>
              <div>
                <label htmlFor="">Категория</label>
                <input type="text" placeholder="Укажите категорию" />
              </div>
              <div>
                <label htmlFor="">Страна</label>
                <input type="text" placeholder="Выберите страну" />
              </div>
            </div>
            <div className={s.second_input_block}>
              <div>
                <label htmlFor="">Логотип</label>
                <input type="file" placeholder="Вставьте картинку" />
                <p>
                  Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ |
                  512x512
                </p>
              </div>
              <div>
                <label htmlFor="">Комментарий</label>
                <input type="password" placeholder="Комментарий" />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Добавить сайт
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
