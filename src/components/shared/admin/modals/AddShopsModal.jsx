import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useShops from "../../../../hooks/admin/useShops";
import useCategories from "@/hooks/admin/useCategories";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";

export default function AddShopsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { categories } = useCategories();
  const { countries } = useCountries();
  const { addShops } = useShops();
  const [logoPreview, setLogoPreview] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const handleChangeCountry = (e) => {
    setSelectedOption(e);
  };

  const [selectedOption1, setSelectedOption1] = useState("");
  const handleChangeCat = (e) => {
    setSelectedOption1(e);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addShops(
        name,
        selectedOption1?.id,
        selectedOption?.id,
        logo,
        description,
        url
      );
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
                <CustomSelect
                  options={categories}
                  selectedOption={selectedOption1}
                  onChange={handleChangeCat}
                  span={"Выберите категорию"}
                />
              </div>

              <div>
                <label htmlFor="country">Страна</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedOption}
                  onChange={handleChangeCountry}
                  span={"Выберите страну"}
                />
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
                    onChange={handleFileChange}
                  />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </label>
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
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
