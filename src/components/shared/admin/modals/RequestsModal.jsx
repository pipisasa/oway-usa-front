import React, { useState } from "react";
import s from "@/styles/admin/RequestsModal.module.scss";
import { RxCross1 } from "react-icons/rx";
import useRequests from "@/hooks/admin/useRequests";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RequestsModal({ data, onClose }) {
  const { updateRequest } = useRequests();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [price, setPrice] = useState(data.price || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("price", price);

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

  return (
    <div
      className={s.modal_backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className={s.request_modal}>
        <button onClick={onClose} className={s.exit}>
          <RxCross1 size={22} />
        </button>
        <h2>Информация о запросе</h2>
        <div className={s.request_blocks}>
          <div className={s.left_block}>
            <div className={s.input_label}>
              <label>Фотография</label>
              <img src={`${API_URL}${data.purchase_image}`} alt="" />
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Статус запроса</label>
              <button>В ожидании</button>
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
                <label htmlFor="articul">Артикул</label>
                <input id="articul" value={data.articul || ""} readOnly />
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
                <label htmlFor="color">Цвет</label>
                <input id="color" value={data.color || ""} readOnly />
              </div>
              <div className={s.input_label}>
                <label htmlFor="price">Цена</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="payment_confirmation">
                  Подтверждение оплаты
                </label>
                <div className="custom-file-upload">
                  <input id="payment_confirmation" type="file" />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </div>
              </div>
              {data.payment_confirmation ? (
                <Button onPress={onOpen}>Посмотреть</Button>
              ) : null}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Чек подтверждение оплаты
                    </ModalHeader>
                    <ModalBody>
                      <img
                        src={`${API_URL}${data.payment_confirmation}`}
                        alt="Чек подтверждение оплаты"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Закрыть
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
            <button type="submit" className={s.submit_btn}>
              Сохранить
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
