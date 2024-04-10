import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useShops from "../../../../hooks/admin/useShops";
import axios from "axios";
import useCategories from "../../../../hooks/admin/useCategories";
import useCountries from "../../../../hooks/admin/useCountries";

export default function EditShopsModal({ isOpen, onClose, shop }) {
  const [name, setName] = useState(shop?.name || "");
  const [url, setUrl] = useState(shop?.url || "");
  const [category, setCategory] = useState(shop?.category || "");
  const [country, setCountry] = useState(shop?.country || "");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState(shop?.description || "");
  const { categories } = useCategories();
  const { countries } = useCountries();
  const { updateShops } = useShops();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("url", url);
      formData.append("description", description);
      formData.append("country", country?.id);
      formData.append("category", category?.id);
      if (logo) {
        formData.append("logo", logo);
      }
      await updateShops(shop.id, formData);
      onClose();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className={s.modal}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h3>Редактировать сайт</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="name">Название сайта</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Введите название"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="url">Ссылка сайта</label>
                <input
                  id="url"
                  type="text"
                  placeholder="Вставьте ссылку"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category">Категория</label>
                <select
                  id="category"
                  name="category"
                  value={category?.id || ""}
                  onChange={(e) => {
                    const selectedCategory = categories.find(
                      (cat) => cat.id === e.target.value
                    );
                    setCategory(selectedCategory || "");
                  }}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="country">Страна</label>
                <select
                  id="country"
                  name="country"
                  value={country?.id || ""}
                  onChange={(e) => {
                    const selectedCountry = countries.find(
                      (c) => c.id === e.target.value
                    );
                    setCountry(selectedCountry || "");
                  }}
                >
                  <option value="">Выберите страну</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={s.second_input_block}>
              <div>
                <label htmlFor="logo">Логотип</label>
                <label className="custom-file-upload">
                  <input
                    id="logo"
                    type="file"
                    placeholder="Вставьте картинку"
                    onChange={(e) => setLogo(e.target.files[0])}
                  />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </label>

                <p>
                  Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ |
                  512x512
                </p>
              </div>
              <div>
                <label htmlFor="description">Комментарий</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Комментарий"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Изменить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
