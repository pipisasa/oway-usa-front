import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";

import useNotification from "../../../../hooks/admin/useNotification";

import CustomFileInput from "@/components/partials/SelectPhoto";
import Arrow from "../../ui/Arrow";
import ImageModal from "./ImageModal";

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleImageModal = () => setIsImageModalOpen(!isImageModalOpen);

  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNotification(title, description, icon);
      toggleModal();
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setIcon(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
  };

  const handleDeleteImage = () => {
    setIcon(null);
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Создать уведомление
        <Arrow />
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
              <input type="file" onChange={handleImageChange} />
              <img src="/assets/icons/selectimg.svg" alt="select img" />
              <span>Выбрать картинку</span>
            </label>
          </div>
          {selectedImage && (
            <button
              type="button"
              onClick={toggleImageModal}
              className={s.view_btn}
            >
              Посмотреть на картинку
            </button>
          )}
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
      {isImageModalOpen && selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={toggleImageModal}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
}
