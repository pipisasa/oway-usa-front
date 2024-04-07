import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useShops from "../../../../hooks/admin/useShops";
import useCategories from "@/hooks/admin/useCategories";
import useCountries from "@/hooks/admin/useCountries";

export default function AddShopsModal() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const {categories} = useCategories()
  const {countries} = useCountries()
  const {addShops} = useShops()

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addShops(name,category,country,logo,description, url);
      toggleModal();
    } catch (error) {
      console.error("Ошибка при добавлении сайта:", error);
    }
  };

  return (
      <div className={s.modal}>
        <button onClick={toggleModal} className={s.add_btn}>
          Добавить сайт
        </button>
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <h3>Добавить сайт</h3>
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
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                         <option key={category.id} value={category.id}>{category.name}</option>
                     ))}
                  </select>
                </div>


                <div>
                  <label htmlFor="country">Страна</label>
                  <select
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Выберите страну</option>
                    {countries.map((country) => (
                         <option key={country.id} value={country.id}>{country.name}</option>
                     ))}
                  </select>
                </div>
              </div>
              <div className={s.second_input_block}>
                <div>
                  <label htmlFor="logo">Логотип</label>
                  <input
                      id="logo"
                      type="file"
                      placeholder="Вставьте картинку"
                      onChange={(e) => setLogo(e.target.files[0])}
                  />
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
                Добавить сайт
              </button>
            </div>
          </form>
        </Modal>
      </div>
  );
}
