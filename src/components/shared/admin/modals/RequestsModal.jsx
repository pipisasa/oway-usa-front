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
import ImageModal from "@/components/shared/admin/modals/ImageModal";
import { API_URL } from "@/constants";

export default function RequestsModal({ data, onClose }) {
  const { updateRequest } = useRequests();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [price, setPrice] = useState(data.price || "");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(data.payment_status);
  const [showPaymentStatusOptions, setShowPaymentStatusOptions] =
    useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("price", price);
    formData.append("status_request", paymentStatus);

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

  const handleImageClick = (src) => {
    setImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentStatusClick = (status) => {
    setPaymentStatus(status);
    setShowPaymentStatusOptions(false);
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
        <h2>Информация о заявке</h2>
        <div className={s.request_blocks}>
          <div className={s.left_block}>
            <div className={s.input_label}>
              <label>Фотография</label>
              <img
                src={`${API_URL}${data.purchase_image}`}
                alt=""
                onClick={() =>
                  handleImageClick(`${API_URL}${data.purchase_image}`)
                }
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Статус</label>
              <button
                onClick={() =>
                  setShowPaymentStatusOptions(!showPaymentStatusOptions)
                }
                className={s.button_default}
              >
                {data.status_request ? (
                  <p style={{ color: "#06DB02" }}>Обработан</p>
                ) : (
                  <p style={{ color: "red" }}>В ожидании</p>
                )}
              </button>
              {showPaymentStatusOptions && (
                <div className={s.select_status}>
                  <button
                    className={s.green}
                    onClick={() => handlePaymentStatusClick(true)}
                  >
                    Обработан
                  </button>
                  <button
                    className={s.red}
                    onClick={() => handlePaymentStatusClick(false)}
                  >
                    Не ожидании
                  </button>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="ID">ID пользователя</label>
              <h4 style={{ marginTop: "10px" }}>#OW00{data.user}</h4>
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
                <label className="custom-file-upload">
                  <input
                    id="payment_confirmation"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </label>
              </div>
              {data.payment_confirmation ? (
                <button className={s.chek_btn} type="button" onClick={onOpen}>
                  Посмотреть
                </button>
              ) : null}
            </div>
            {selectedImageSrc && (
              <div className={s.input_label}>
                <button
                  className={s.view_selected_image_btn}
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  Посмотреть выбранную картинку
                </button>
              </div>
            )}
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
      {isImageModalOpen && (
        <ImageModal src={selectedImageSrc} onClose={closeModal} />
      )}
    </div>
  );
}
