import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";

export const IllinoisModalEdit = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={s.qwemodalBackdrop}>
      <div className={s.qwemodalContent}>
        <h2>Редактирование данных</h2>
        <p>ФИО</p>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <p>Адрес</p>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <p>Номер телефона</p>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <p>Вес груза</p>
        <input
          type="number"
          name="cargo_weight"
          value={formData.cargo_weight}
          onChange={handleChange}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <p>Telegram</p>
        <input
          type="text"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
        />
        <p>Whatsapp</p>
        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <button onClick={() => onSave(formData)}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div className={s.qwemodalBackdrop}>
      <div className={s.qwemodalContent}>
        <h2>Вы уверены, что хотите удалить эту запись?</h2>
        <div className="flex gap-2">
          <button onClick={onDelete}>Да</button>
          <button onClick={onClose}>Нет</button>
        </div>
      </div>
    </div>
  );
};
