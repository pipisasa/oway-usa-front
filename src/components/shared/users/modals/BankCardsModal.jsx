import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";

export default function BankCardsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);

  const formatCardNumber = (value) => {
    let onlyNums = value.replace(/\D/g, "");
    onlyNums = onlyNums.slice(0, 16);

    return onlyNums.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (e) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedNumber);

    if (formattedNumber.startsWith("4")) {
      setCardType("Visa");
    } else if (formattedNumber.startsWith("5")) {
      setCardType("MasterCard");
    } else if (formattedNumber.startsWith("3")) {
      setCardType("American Express");
    } else {
      setCardType("");
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить карту
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить карту</h3>
        <form action="" className={s.cards_form}>
          <div className={s.input_field}>
            <label>Номер карты</label>
            <input
              type="text"
              placeholder="Введите номер карты"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            {cardType && <p>Тип карты: {cardType}</p>}
          </div>
          <div className={s.flex}>
            <div>
              <label>Срок действия</label>
              <div className={s.cards_period}>
                <input
                  className={s.input_month}
                  type="number"
                  placeholder="MM"
                />
                <input
                  className={s.input_year}
                  type="number"
                  placeholder="YY"
                />
              </div>
            </div>
            <div className={s.input_field}>
              <label>CVV код</label>
              <input type="text" placeholder="CVV" />
            </div>
          </div>

          <div className={s.input_field}>
            <label>Имя на карте</label>
            <input type="text" placeholder="Введите имя" />
          </div>
        </form>
        <div className={s.btn_center}>
          <button type="submit" className={s.submit_btn}>
            Добавить карту
          </button>
        </div>
      </Modal>
    </div>
  );
}
