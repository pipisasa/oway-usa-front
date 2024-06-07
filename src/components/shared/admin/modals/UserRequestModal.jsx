import React, { useState } from "react";
import s from "@/styles/admin/RequestsModal.module.scss";
import { RxCross1 } from "react-icons/rx";
import useRequests from "@/hooks/admin/useRequests";
import ImageModal from "./ImageModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserRequestsModal({ data, onClose }) {
  const { updateRequest } = useRequests();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (event.target.payment_confirmation.files[0]) {
      formData.append(
        "payment_confirmation",
        event.target.payment_confirmation.files[0]
      );
    }

    await updateRequest(data.id, formData);
    onClose();
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <div
        className={s.modal_backdrop}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <section className={s.request_modal}>
          <button onClick={onClose} className={s.exit}>
            <RxCross1 size={22} />
          </button>
          <h2>Информация о заявке</h2>
          <div className={s.request_blocks}>
            <div className={s.left_block}>
              <div className={s.input_label}>
                <label>Фотография</label>
                <img
                  src={`${API_URL}${data.purchase_image}`}
                  alt=""
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="">Статус запроса</label>

                {data.payment_confirmation === null ? (
                  <button className={s.button_false}>В ожидании</button>
                ) : (
                  <button className={s.button_true}>Обработан</button>
                )}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className={s.form}
              encType="multipart/form-data"
            >
              <div className={s.flex_inputs}>
                <div className={s.input_label}>
                  <label htmlFor="url">Ссылка на товар</label>
                  <input id="url" value={data.url || ""} readOnly />
                </div>
                <div className={s.input_label}>
                  <label htmlFor="name_of_purchase">Название</label>
                  <input
                    id="name_of_purchase"
                    value={data.name_of_purchase || ""}
                    readOnly
                  />
                </div>
                <div className={s.input_label}>
                  <label htmlFor="email">Почта</label>
                  <input id="email" value={data.email || ""} readOnly />
                </div>
              </div>
              <div className={s.input_label}>
                <label htmlFor="full_name">ФИО</label>
                <input id="full_name" value={data.full_name || ""} readOnly />
              </div>
              <div className={s.flex_inputs}>
                <div className={s.input_label}>
                  <label htmlFor="count">Кол-во</label>
                  <input id="count" value={data.count || ""} readOnly />
                </div>
                <div className={s.input_label}>
                  <label htmlFor="price">Цена ($)</label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={data.price || "---"}
                    readOnly
                    onChange={handlePriceChange}
                  />
                </div>
              </div>

              <div className={s.flex_inputs}>
                <div className={s.input_label}>
                  <label htmlFor="telegram">Telegram</label>
                  <input id="telegram" value={data.telegram || ""} readOnly />
                </div>
                <div className={s.input_label}>
                  <label htmlFor="phone_number">Номер телефона</label>
                  <input
                    id="phone_number"
                    value={data.phone_number || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className={s.input_label}>
                <label htmlFor="">Комментарий к товару</label>
                <div className={s.comments}>
                  <p>{data.description}</p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      {isImageModalOpen && (
        <ImageModal
          src={`${API_URL}${data.purchase_image}`}
          onClose={closeModal}
        />
      )}
    </>
  );
}
