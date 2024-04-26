import React, { useState, useRef, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useLogo from "@/hooks/admin/useLogo";

export default function CompaniesEditModal({ isOpen, onClose, editingLogo }) {
  const [link, setLink] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const logoRef = useRef(null);
  const { updateLogo } = useLogo();

  useEffect(() => {
    if (editingLogo) {
      setLink(editingLogo.link);
      setPreviewImage(editingLogo.logo); // Предполагаем, что logo это URL к изображению
    }
  }, [editingLogo]);

  const handleUpdateLogo = async (event) => {
    event.preventDefault();
    const file = logoRef.current.files[0] || null;
    await updateLogo(editingLogo.id, link, file);
    onClose();
    setLink("");
    setPreviewImage(null);
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <h3>Редактировать логотип</h3>
        <form className={s.notifications_form} onSubmit={handleUpdateLogo}>
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
              <span>Изменить логотип</span>
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
              Обновить логотип
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
