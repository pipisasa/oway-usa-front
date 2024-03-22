import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";

export default function ProductsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Создать товар
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Создать товар</h3>
        <form action="" className={s.notifications_form}>
          <div>
            <label htmlFor="">Назавние товара</label>
            <input type="text" placeholder="Введите название товара" />
          </div>
          <div>
            <label htmlFor="">Ссылку</label>
            <input type="text" placeholder="Вставьте ссылку" />
          </div>
          <div>
            <label htmlFor="">Картинка</label>
            <input type="file" placeholder="Вставьте картинку" />
          </div>
          <p>
            Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
          </p>
        </form>
        <div className={s.btn_center}>
          <button type="submit" className={s.submit_btn}>
            Создать товар
          </button>
        </div>
      </Modal>
    </div>
  );
}
