import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useUsers from "../../../../hooks/admin/useUsers";

export default function AddUsersModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState();
  const { addUsers } = useUsers();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
    front_image: null,
    back_image: null,
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "front_image" || name === "back_image") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
  
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const { value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addUsers(
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.phone_number,
      formData.password,
      formData.password2,
      formData.front_image,
      formData.back_image
    );
    toggleModal();
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      password2: "",
      front_image: null,
      back_image: null,
    });
    setImagePreviews({
      front_image: null,
      back_image: null,
    });
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить пользователя
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить пользователя</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.forms}>
            <div>
              <label htmlFor="">Имя</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Введите имя"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Фамилия</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Введите фамилию"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Почта</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введите почту"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Номер телефона</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Введите номер телефона"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Пароль повторно</label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Повторите пароль"
                value={formData.password2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Лицевая сторона паспорта</label>
              <label className="custom-file-upload">
                <input
                  type="file"
                  id="front_image"
                  name="front_image"
                  onChange={handleChange}
                />
                <img src="/assets/icons/selectimg.svg" alt="select img" />
                <span>Выбрать картинку</span>
              </label>
              {imagePreviews && (
                <img src={imagePreviews.front_image} alt="Front Image Preview" />
              )}
            </div>
            <div>
              <label htmlFor="">Обратная сторона паспорта</label>
              <label className="custom-file-upload">
                <input
                  type="file"
                  id="back_image"
                  name="back_image"
                  onChange={handleChange}
                />
                <img src="/assets/icons/selectimg.svg" alt="select img" />
                <span>Выбрать картинку</span>
              </label>
              {imagePreviews && (
                <img src={imagePreviews.back_image} alt="Back Image Preview" />
              )}
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Добавить пользователя
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
