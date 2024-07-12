import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useUsers from "../../../../hooks/admin/useUsers";
import Arrow from "../../ui/Arrow";
import ImageModal from "./ImageModal";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

export default function AddUsersModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [imageModal, setImageModal] = useState({
    src: null,
    isOpen: false,
  });
  const { addUsers } = useUsers();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
    front_image: "",
    back_image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name) errors.first_name = "Имя обязательно";
    if (!formData.last_name) errors.last_name = "Фамилия обязательна";
    if (!formData.email) {
      errors.email = "Почта обязательна";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Некорректный формат почты";
    }
    if (!formData.phone_number)
      errors.phone_number = "Номер телефона обязателен";
    if (!formData.password) errors.password = "Пароль обязателен";
    if (!formData.password2) {
      errors.password2 = "Повторите пароль";
    } else if (formData.password !== formData.password2) {
      errors.password2 = "Пароли не совпадают";
    }
    return errors;
  };

  const formatPhoneNumber = (number) => {
    const asYouType = new AsYouType();
    asYouType.input(number);
    return asYouType.number ? asYouType.number.formatInternational() : number;
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;
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
    } else if (name === "phone_number") {
      let formattedNumber = value;
      if (!formattedNumber.startsWith("+")) {
        formattedNumber = "+" + formattedNumber;
      }
      formattedNumber = formatPhoneNumber(formattedNumber);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedNumber,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
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
        front_image: "",
        back_image: "",
      });
      setImagePreviews({});
    } else {
      setFormErrors(errors);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  const openImageModal = (src) => {
    setImageModal({ src, isOpen: true });
  };

  const closeImageModal = () => {
    setImageModal({ src: "", isOpen: false });
  };

  const deleteImage = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: "",
    }));
    setImagePreviews((prevPreviews) => ({
      ...prevPreviews,
      [name]: "",
    }));
    closeImageModal();
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить пользователя <Arrow />
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h4>Добавить пользователя</h4>
        <form onSubmit={handleSubmit}>
          <div className={s.forms}>
            <div>
              <label htmlFor="first_name">Имя</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Введите имя"
                value={formData.first_name}
                onChange={handleChange}
              />
              {formErrors.first_name && (
                <p className={s.error}>{formErrors.first_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name">Фамилия</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Введите фамилию"
                value={formData.last_name}
                onChange={handleChange}
              />
              {formErrors.last_name && (
                <p className={s.error}>{formErrors.last_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Почта</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введите почту"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className={s.error}>{formErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone_number">Номер телефона</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Введите номер телефона"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {formErrors.phone_number && (
                <p className={s.error}>{formErrors.phone_number}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">Пароль</label>
              <div className={s.password_wrapper}>
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <img
                    src={
                      showPassword.password
                        ? "/assets/icons/eyes-open.svg"
                        : "/assets/icons/eyes-close.svg"
                    }
                    alt="view password"
                  />
                </button>
              </div>
              {formErrors.password && (
                <p className={s.error}>{formErrors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="password2">Пароль повторно</label>
              <div className={s.password_wrapper}>
                <input
                  type={showPassword.password2 ? "text" : "password"}
                  id="password2"
                  name="password2"
                  placeholder="Повторите пароль"
                  value={formData.password2}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password2")}
                >
                  <img
                    src={
                      showPassword.password2
                        ? "/assets/icons/eyes-open.svg"
                        : "/assets/icons/eyes-close.svg"
                    }
                    alt="view password"
                  />
                </button>
              </div>
              {formErrors.password2 && (
                <p className={s.error}>{formErrors.password2}</p>
              )}
            </div>
            <div>
              <label htmlFor="front_image">Лицевая сторона паспорта</label>
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
              {imagePreviews.front_image && (
                <div onClick={() => openImageModal(imagePreviews.front_image)}>
                  Посмотреть выбранную картинку
                </div>
              )}
            </div>
            <div>
              <label htmlFor="back_image">Обратная сторона паспорта</label>
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
              {imagePreviews.back_image && (
                <div onClick={() => openImageModal(imagePreviews.back_image)}>
                  Посмотреть выбранную картинку
                </div>
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
      {imageModal.isOpen && (
        <ImageModal
          src={imageModal.src}
          isOpen={imageModal.isOpen}
          onClose={closeImageModal}
          onDelete={() =>
            deleteImage(
              imageModal.src.includes("front") ? "front_image" : "back_image"
            )
          }
        />
      )}
    </div>
  );
}
