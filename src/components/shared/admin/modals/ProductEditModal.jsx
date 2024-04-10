import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useProducts from "@/hooks/admin/useProducts";

export default function EditProductsModal({ isOpen, toggleModal, product }) {
  const { updateProduct } = useProducts();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setLink(product.link);
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (selectedImage instanceof File) {
      formData.append("image", selectedImage);
    }
    await updateProduct(product.id, formData);
    toggleModal();
  };
  return (
    <div className={s.modal}>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div className={s.modalContent}>
          <h3>Редактировать товар</h3>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={s.notifications_form}
          >
            <div>
              <label htmlFor="productTitle">Название товара</label>
              <input
                id="productTitle"
                type="text"
                placeholder="Введите название товара"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productLink">Ссылка</label>
              <input
                id="productLink"
                type="text"
                placeholder="Вставьте ссылку"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="productImage">Картинка</label>
              <div class="custom-file-upload">
                <input
                  id="productImage"
                  type="file"
                  onChange={handleImageChange}
                />
                <img src="/assets/icons/selectimg.svg" alt="select img" />
                <span>Выбрать картинку</span>
              </div>
            </div>
            <p>
              Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
            </p>
            <div className={s.btn_center}>
              <button type="submit" className={s.submit_btn}>
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
