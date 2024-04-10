import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useNotification from "../../../../hooks/admin/useNotification";
import CustomFileInput from "@/components/partials/SelectPhoto";

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [icon1, setIcon1] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);
  const { addNotification } = useNotification();
  const handle = (e) => {
    console.log(e, 43);
    e.preventDefault();
    e.stopPropagation();
    setIcon(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNotification(title, description, icon);
      toggleModal(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };
  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Создать уведомление
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Создать уведомление</h3>
        <form action="" className={s.notifications_form}>
          <div>
            <label htmlFor="">Заголовок</label>
            <input
              type="text"
              placeholder="Введите заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Описание</label>
            <input
              type="text"
              placeholder="Добавьте описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Картинка</label>
            <label className="custom-file-upload">
              <input type="file" onChange={(e) => setIcon(e.target.files[0])} />
              <img src="/assets/icons/selectimg.svg" alt="select img" />
              <span>Выбрать картинку</span>
            </label>

            {/* <CustomFileInput onChange={(e) => handle(e)}/> */}
          </div>
          <p>
            Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
          </p>
        </form>
        <div className={s.btn_center}>
          <button onClick={handleSubmit} className={s.submit_btn}>
            Создать уведомление
          </button>
        </div>
      </Modal>
    </div>
  );
}
