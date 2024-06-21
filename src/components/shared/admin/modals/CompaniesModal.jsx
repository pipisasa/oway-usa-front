import React, { useState, useRef } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useLogo from "@/hooks/admin/useLogo";
import Arrow from "../../ui/Arrow";

export default function CompaniesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const logoRef = useRef(null);
  const { addLogo } = useLogo();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setPreviewImage(null);
  };

  const handleAddLogo = async (event) => {
    event.preventDefault();
    const file = logoRef.current.files[0];
    if (file) {
      await addLogo(link, file);
      toggleModal();
      setLink("");
    } else {
      alert("Пожалуйста, выберите файл логотипа.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить логотип <Arrow />
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить логотип</h3>
        <form className={s.notifications_form} onSubmit={handleAddLogo}>
          <div>
            <label htmlFor="link">Ссылка на сайт</label>
            <input
              id="link"
              type="text"
              placeholder="https://"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="logoFile">Логотип</label>
            <label className="custom-file-upload">
              <input type="file" ref={logoRef} onChange={handleFileChange} />
              <img src="/assets/icons/selectimg.svg" alt="select img" />
              <span>Выбрать логотип</span>
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className={s.previewImage}
              />
            )}
          </div>
          <p>
            Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
          </p>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Добавить логотип
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
