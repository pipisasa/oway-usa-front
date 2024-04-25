import React, { useState, useEffect } from "react";
import s from "@/styles/users/UserData.module.scss";
import useUserData from "@/hooks/user/useUserData";
import Loading from "../../admin/Loading";

export default function UserData() {
  const { userData, loading, error, updateUserData } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    surname: "",
    phone_number: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.first_name || "",
        surname: userData.last_name || "",
        phone_number: userData.phone_number || "",
        email: userData.email || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("first_name", formData.username);
    dataToSend.append("last_name", formData.surname);
    dataToSend.append("phone_number", formData.phone_number);
    dataToSend.append("address", formData.address);
    const frontImageInput = document.querySelector('input[name="front_image"]');
    const backImageInput = document.querySelector('input[name="back_image"]');
    if (frontImageInput.files[0])
      dataToSend.append("front_image", frontImageInput.files[0]);
    if (backImageInput.files[0])
      dataToSend.append("back_image", backImageInput.files[0]);

    await updateUserData(dataToSend, true);
    setIsEditing(false);
  };

  const [selectedFrontImage, setSelectedFrontImage] = useState(null);
const [selectedBackImage, setSelectedBackImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  
    // Проверяем, какое изображение было выбрано
    if (name === "front_image" && files.length > 0) {
      setSelectedFrontImage(files[0]);
    } else if (name === "back_image" && files.length > 0) {
      setSelectedBackImage(files[0]);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <form className={s.form} onSubmit={handleSave}>
      <div className={s.form_inputs}>
        <div>
          <label>Имя</label>
          <input
            type="text"
            name="username"
            value={
              isEditing
                ? formData?.username
                : loading
                ? "Loading..."
                : userData?.first_name
            }
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Фамилия</label>
          <input
            type="text"
            name="surname"
            value={
              isEditing
                ? formData?.surname
                : loading
                ? "Loading..."
                : userData?.last_name
            }
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Номер телефона</label>
          <input
            type="text"
            name="phone_number"
            value={
              isEditing
                ? formData?.phone_number
                : loading
                ? "Loading..."
                : userData?.phone_number
            }
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Электронная почта</label>
          <input
            type="text"
            name="email"
            value={
              isEditing
                ? formData?.email
                : loading
                ? "Loading..."
                : userData?.email
            }
            onChange={handleChange}
            disabled={true}
          />
        </div>
        <div>
          <label>Лицевая сторона паспорта</label>
          <label className="custom-file-upload">
            <input
              type="file"
              name="front_image"
              onChange={handleChange}
              disabled={!isEditing}
            />
            <img src="/assets/icons/selectimg.svg" alt="select img" />
            <span>Выбрать картинку</span>
          </label>
          {selectedFrontImage && (
            <div>
              <img src={URL.createObjectURL(selectedFrontImage)} alt="Front Image" />
              <span>Выбрана лицевая сторона паспорта</span>
            </div>
          )}
        </div>
        <div>
          <label>Обратная сторона паспорта</label>
          <label className="custom-file-upload">
            <input
              type="file"
              name="back_image"
              onChange={handleChange}
              disabled={!isEditing}
            />
            <img src="/assets/icons/selectimg.svg" alt="select img" />
            <span>Выбрать картинку</span>
          </label>
          {selectedBackImage && (
            <div>
              <img src={URL.createObjectURL(selectedBackImage)} alt="Back Image" />
              <span>Выбрана обратная сторона паспорта</span>
            </div>
          )}
        </div>
        <div>
          <label>Адрес</label>
          <input
            type="text"
            name="address"
            value={
              isEditing
                ? formData?.address
                : loading
                ? "Loading..."
                : userData?.address
            }
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      {isEditing ? (
        <div className={s.edit_submit_btns}>
          <button type="button" className={s.exit} onClick={handleCancel}>
            Отмена
          </button>
          <button type="submit" className={s.save}>
            Сохранить
          </button>
        </div>
      ) : (
        <div className={s.edit_btn}>
          <button type="button" onClick={handleEdit}>
            Редактировать
          </button>
        </div>
      )}
    </form>
  );
}
