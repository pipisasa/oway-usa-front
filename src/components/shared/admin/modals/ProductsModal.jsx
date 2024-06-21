import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useProducts from "@/hooks/admin/useProducts";
import Arrow from "../../ui/Arrow";

export default function ProductsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);
  const { addProduct, error, isSuccess, isLoading } = useProducts();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title || !link || !image) {
      alert("Все поля должны быть заполнены");
      return;
    }

    try {
      await addProduct(title, link, image);
      setIsOpen(false);
      setTitle("");
      setLink("");
      setImage(null);
      setImagePreviewUrl("");
    } catch (error) {
      console.error("Ошибка при добавлении продукта: ", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Создать товар <Arrow />
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Создать товар</h3>
        <form className={s.notifications_form} onSubmit={handleAddProduct}>
          <div>
            <label htmlFor="">Название товара</label>

            <input
              type="text"
              placeholder="Введите название товара"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Ссылка</label>

            <input
              type="text"
              placeholder="Вставьте ссылку"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <label>Картинка</label>
            <label className="custom-file-upload">
              <input type="file" onChange={handleImageChange} />

              <img src="/assets/icons/selectimg.svg" alt="select img" />
              <span>Выбрать картинку</span>
            </label>
          </div>
          {selectedImage && (
            <div>
              <label>Выбранная картинка:</label>
              <img src={selectedImage} alt="Выбранная картинка" />
            </div>
          )}
          <p>
            Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
          </p>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Создать товар
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isPreviewOpen} onClose={togglePreview}>
        <img src={selectedImage} alt="Full preview" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}
