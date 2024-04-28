import React, { useState } from "react";
import s from "@/styles/admin/RequestsModal.module.scss";
import { RxCross1 } from "react-icons/rx";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WerehousesModal({ onClose, warehouse }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    url: warehouse.url,
    name: warehouse.name,
    articul: warehouse.articul,
    unique_id_user: warehouse.unique_id_user,
    price: warehouse.price,
    weight: warehouse.weight,
    date_sent: warehouse.date_sent,
    date_arrived: warehouse.date_arrived,
    country: warehouse.country.name,
    address: warehouse.address,
    comments: warehouse.comments,
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      url: warehouse.url,
      name: warehouse.name,
      articul: warehouse.articul,
      unique_id_user: warehouse.unique_id_user,
      price: warehouse.price,
      weight: warehouse.weight,
      date_sent: warehouse.date_sent,
      date_arrived: warehouse.date_arrived,
      country: warehouse.country.name,
      address: warehouse.address,
      comments: warehouse.comments,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={s.modal_backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className={s.request_modal}>
        <button onClick={onClose} className={s.exit}>
          <RxCross1 size={22} />
        </button>
        <h2>Информация о посылке</h2>
        <div className={s.request_blocks}>
          <div className={s.left_block}>
            <div className={s.input_label}>
              <label>Фотография</label>
              <img src={API_URL + warehouse.image} alt="img" />
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Статус посылки</label>

              {warehouse.status.name === "Доставлено" ? (
                <button className={s.button_true}>Доставлено</button>
              ) : (
                <button className={s.button_false}>
                  {warehouse.status.name}
                </button>
              )}
            </div>
          </div>
          <form className={s.form} encType="multipart/form-data">
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="url">Ссылка на посылку</label>
                <input
                  id="url"
                  value={editData.url}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="name">Название</label>
                <input
                  id="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="articul">Трек-код </label>
                <input
                  id="articul"
                  value={editData.articul}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="unique_id_user">ID пользователя</label>
              <input
                id="unique_id_user"
                value={`#${warehouse.unique_id_user}`}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="price">Цена ($)</label>
                <input
                  id="price"
                  value={editData.price || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="weight">Вес (кг)</label>
                <input
                  id="weight"
                  value={editData.weight || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="date_sent">Дата отправки</label>
                <input
                  id="date_sent"
                  value={editData.date_sent || "Не указан"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="date_arrived">Дата прибытия</label>
                <input
                  id="date_arrived"
                  value={editData.date_arrived || "Не указан"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="country">Адрес отправки</label>
                <input
                  id="country"
                  value={editData.country.name || "Не указан"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="address">Адрес прибытия</label>
                <input
                  id="address"
                  value={editData.address || "Не указан"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="comments">Комментарий</label>
              <input
                id="comments"
                value={editData.comments || "Не указан"}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            {!isEditing ? (
              <button
                type="button"
                className={s.submit_btn}
                onClick={handleEdit}
              >
                Редактировать
              </button>
            ) : (
              <div className={s.submit_btns}>
                <button
                  className={s.exit_btn}
                  type="button"
                  onClick={handleCancel}
                >
                  Отмена
                </button>
                <button
                  className={s.submit_btn}
                  type="button"
                  onClick={handleSave}
                >
                  Сохранить
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
