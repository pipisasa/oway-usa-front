import React, { useEffect } from "react";
import s from "@/styles/shared/main/Purchase.module.scss";
import usePurchase from "@/hooks/usePurchase";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Purchase() {
  const { handleChange, submitPurchase, isSubmitted } = usePurchase();
  const { isOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPurchase();
  };

  useEffect(() => {
    if (isSubmitted) {
      onClose();
    }
  }, [isSubmitted, onClose]);

  return (
    <>
      <Modal isOpen={isSubmitted} onClose={onClose} backdrop="blur">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Ваша заявка на выкуп принята!
            </ModalHeader>
            <ModalBody>
              <p>
                Она будет рассмотрена в течении 24 часов, пожалуйста ожидайте
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <form className={`${s.purchase} container`} onSubmit={handleSubmit}>
        <div className={s.purchase_container}>
          <div className={s.purchase_header}>
            <p>Заявка на выкуп</p>
            <h1>
              Уникальная возможность приобретения товаров по выгодным ценам!
            </h1>
          </div>
          <div className={s.purchase_inner}>
            <div className={s.purchase_inner_froms}>
              <div className={s.purchase_inner_froms_inputs}>
                <div className={s.purchase_inner_froms_label}>
                  <label>ФИО</label>
                </div>
                <input
                  id="full_name"
                  type="text"
                  placeholder="Введите ФИО"
                  onChange={handleChange}
                />
              </div>
              <div className={s.purchase_inner_froms_inputs}>
                <label>
                  Ссылка на товар <span>*</span>
                </label>
                <input
                  id="url"
                  type="text"
                  placeholder="https://"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={s.purchase_inner_froms}>
              <div className={s.purchase_inner_froms_inputs}>
                <label>
                  Название товара, как в магазине<span>*</span>
                </label>
                <input
                  id="name_of_purchase"
                  type="text"
                  placeholder="Введите название товара"
                  onChange={handleChange}
                />
              </div>
              <div className={s.purchase_inner_froms_inputs}>
                <div className={s.purchase_inner_froms_label}>
                  <label>Артикул товара</label>
                  <img src="assets/icons/questionGrey.svg" alt="" />
                </div>
                <input
                  id="articul"
                  type="text"
                  placeholder="Введите артикул товара"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.purchase_inner_froms}>
              <div className={s.purchase_inner_froms_inputs}>
                <label>
                  Количество <span>*</span>
                </label>
                <input
                  id="count"
                  type="text"
                  placeholder="Введите количество"
                  onChange={handleChange}
                />
              </div>
              <div className={s.purchase_inner_froms_inputs}>
                <label>Цвет</label>
                <input
                  id="color"
                  type="text"
                  placeholder="Введите цвет"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.purchase_inner_form}>
              <label>
                Комментарий к товару <span>*</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="Введите комментарий"
                onChange={handleChange}
              />
            </div>
            <div className={s.purchase_inner_froms}>
              <div className={s.purchase_inner_froms_inputs}>
                <label>
                  Telegram<span>*</span>
                </label>
                <input
                  id="telegram"
                  type="text"
                  placeholder="Введите @username"
                  onChange={handleChange}
                />
              </div>
              <div className={s.purchase_inner_froms_inputs}>
                <div className={s.purchase_inner_froms_label}>
                  <label>Номер телефона</label>
                </div>
                <input
                  id="phone_number"
                  type="text"
                  placeholder="Введите номер телефона"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.purchase_inner_from}>
              <label>Добавьте скриншот</label>
              <input id="purchase_image" type="file" onChange={handleChange} />
              <p>
                Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
              </p>
            </div>
          </div>
          <div>
            <button type="submit" className={s.button}>
              <span>Далее</span>
              <img src="/assets/icons/rightIcon.svg" alt="logo" />
            </button>
          </div>
        </div>
        <div className={s.purchase_img}>
          <img src="assets/images/busket.png" width={510} height={510} alt="" />
        </div>
      </form>
    </>
  );
}
