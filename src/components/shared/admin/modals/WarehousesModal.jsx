import React from "react";
import s from "@/styles/admin/RequestsModal.module.scss";
import { RxCross1 } from "react-icons/rx";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WerehousesModal({ onClose, warehouse }) {
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
            {/* <div className={s.input_label}>
              <label htmlFor="">Статус оплаты</label>

              {warehouse.status_payment !== null ? (
                <button className={s.button_true}>Оплачено</button>
              ) : (
                <button className={s.button_false}>Не оплачено</button>
              )}
            </div> */}
          </div>
          <form className={s.form} encType="multipart/form-data">
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="url">Ссылка на посылку</label>
                <input id="url" value={warehouse.url} readOnly />
              </div>
              <div className={s.input_label}>
                <label htmlFor="name">Название</label>
                <input id="name" value={warehouse.name} readOnly />
              </div>
              <div className={s.input_label}>
                <label htmlFor="articul">Трек-код </label>
                <input id="articul" value={warehouse.articul} readOnly />
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="unique_id_user">ID пользователя</label>
              <input
                id="unique_id_user"
                value={`#${warehouse.unique_id_user}`}
                readOnly
              />
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="price">Цена ($)</label>
                <input id="price" value={warehouse.price || ""} readOnly />
              </div>
              <div className={s.input_label}>
                <label htmlFor="weight">Вес (кг)</label>
                <input id="weight" value={warehouse.weight || ""} readOnly />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="date_sent">Дата отправки</label>
                <input
                  id="date_sent"
                  value={warehouse.date_sent || "Не указан"}
                  readOnly
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="date_arrived">Дата прибытия</label>
                <input
                  id="date_arrived"
                  value={warehouse.date_arrived || "Не указан"}
                  readOnly
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="country">Адрес отправки</label>
                <input
                  id="country"
                  value={warehouse.country.name || "Не указан"}
                  readOnly
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="address">Адрес прибытия</label>
                <input
                  id="address"
                  value={warehouse.address || "Не указан"}
                  readOnly
                />
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Комментарий к посылке</label>
              <div className={s.comments}>
                <p>{warehouse.comments}</p>
              </div>
            </div>
            {/* <button type="submit" className={s.submit_btn}>
              Сохранить
            </button> */}
          </form>
        </div>
      </section>
    </div>
  );
}
