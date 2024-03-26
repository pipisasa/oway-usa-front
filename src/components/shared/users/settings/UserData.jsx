import React, { useState, useEffect } from "react";
import s from "@/styles/users/UserData.module.scss";

export default function UserData() {
  const defaultUserData = {
    username: "Akbar",
    surname: "Kudaibergenov",
    phone_number: "+996990777820",
    email: "akbar@gmail.com",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultUserData);

  useEffect(() => {
    setFormData(defaultUserData);
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(defaultUserData);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form className={s.form} onSubmit={handleSave}>
      <div className={s.form_inputs}>
        <div>
          <label>Имя</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Фамилия</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Номер телефона</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Электронная почта</label>
          <input
            type="text"
            name="email"
            value={formData.email}
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
