import React, { useState } from "react";
import s from "@/styles/admin/RequestsModal.module.scss";
import { RxCross1 } from "react-icons/rx";
import ImageModal from "./ImageModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OnTheWayModal({ data, onClose }) {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const handleImageClick = () => {
    setIsImageModalVisible(true);
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
        <h2>Информация о товаре</h2>
        <div className={s.request_blocks}>
          <div className={s.left_block}>
            <div className={s.input_label}>
              <label>Фотография</label>
              <img
                src={`${API_URL}${data?.image}`}
                alt=""
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Статус</label>
              <button>{data?.status?.name}</button>
            </div>
          </div>
          <form className={s.form} encType="multipart/form-data">
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="name_of_purchase">Название</label>
                <input id="name_of_purchase" value={data.name || ""} readOnly />
              </div>
            </div>

            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="price">Цена ($)</label>
                <input id="price" name="price" type="text" value={data.price} />
              </div>
              <div className={s.input_label}>
                <label htmlFor="count">Дата покупки</label>
                <input id="count" value={"23.04.2024"} readOnly />
              </div>
            </div>

            <div className={s.input_label}>
              <label htmlFor="">Комментарий к товару</label>
              <div className={s.comments}>
                <p>{data.comments}</p>
              </div>
            </div>
          </form>
        </div>
      </section>
      {isImageModalVisible && (
        <ImageModal
          src={`${API_URL}${data?.image}`}
          isOpen={isImageModalVisible}
          onClose={() => setIsImageModalVisible(false)}
        />
      )}
    </div>
  );
}
