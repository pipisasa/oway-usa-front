// hooks/useRegister.js
import React, {useRef, useState} from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import { useBillingAdd } from "../../../../hooks/billing/useBillingAdd";
import useBillingData from "../../../../hooks/billing/useBillingData";

export default function BankCardsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [full_name, setFull_name] = useState("");
  const [cardType, setCardType] = useState("");
  const [cvv, setCvv] = useState("");

  const yearInputRef = useRef()
  const { billingAdd } = useBillingData();

  const toggleModal = () => setIsOpen(!isOpen);

  const formatCardNumber = (value) => {
    let onlyNums = value.replace(/\D/g, "");
    onlyNums = onlyNums.slice(0, 16);

    return onlyNums.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (e) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setNumber(formattedNumber);

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

  const [end_month, setEnd_month] = useState("");
  const [end_year, setEnd_year] = useState("");

  const handleMonthChange = (e) => {
    let month = e.target.value.replace(/\D/g, ""); // Убираем все символы, кроме цифр
    if (month.length > 2) {
      month = month.slice(0, 2); // Ограничиваем длину до двух символов
    }

    if (month.length === 2) {
      // Если введено две цифры, переходим к году
      yearInputRef.current.focus();
    }

    setEnd_month(month);
  };

  const handleYearChange = (e) => {
    let year = e.target.value.replace(/\D/g, ""); // Убираем все символы, кроме цифр
    if (year.length > 4) {
      year = year.slice(0, 4); // Ограничиваем длину до двух символов
    }

    setEnd_year(year);
  };


  const submitBilling = () => {
    const formattedEnd_date = `${end_month}-${end_year}`;
    billingAdd({ number, end_date: formattedEnd_date, full_name , cvv});
    toggleModal()

  };
  return (
      <div className={s.modal}>
        <button onClick={toggleModal} className={s.add_btn}>
          Добавить карту
        </button>
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <h3>Добавить карту</h3>
          <form action="" className={s.cards_form} onSubmit={submitBilling}>
            <div className={s.input_field}>
              <label>Номер карты</label>
              <input
                  type="text"
                  placeholder="Введите номер карты"
                  value={number}
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
                      value={end_month}
                      type="text"
                      placeholder="MM"
                      maxLength="2"
                      onChange={handleMonthChange}
                  />
                  <input
                      ref={yearInputRef}
                      className={s.input_year}
                      type="text"
                      placeholder="YY"
                      maxLength="4"
                      onChange={handleYearChange}
                  />
                </div>
              </div>
              <div className={s.input_field}>
                <label>CVV код</label>
                <input value={cvv} type="text" maxLength="3" onChange={(e) => setCvv(e.target.value)} placeholder="CVV" />
              </div>
            </div>

            <div className={s.input_field}>
              <label>Имя на карте</label>
              <input
                  value={full_name}
                  type="text"
                  placeholder="Введите имя"
                  onChange={(e) => setFull_name(e.target.value)}
              />
            </div>
          </form>
          <div className={s.btn_center}>
            <button onClick={submitBilling} type="submit" className={s.submit_btn}>
              Добавить карту
            </button>
          </div>
        </Modal>
      </div>
  );
}
