// hooks/useRegister.js
import React, { useRef, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import {useBillingAdd} from "../../../../hooks/billing/useBillingAdd";
import useBillingData from "../../../../hooks/billing/useBillingData";


export default function BankCardsEditModal({isOpen, card, onClose }) {

    const [number, setNumber] = useState(card?.number);
    const [end_month, setEnd_month] = useState(card?.end_date.split("-")[0]);
    const [end_year, setEnd_year] = useState(card?.end_date.split("-")[1]);
    const [full_name, setFull_name] = useState(card?.full_name);
    const [cvv, setCvv] = useState(card?.cvv);
    const [cardType, setCardType] = useState("");

    const yearInputRef = useRef();
    const { updateBilling } = useBillingData();

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

    const handleMonthChange = (e) => {
        let month = e.target.value.replace(/\D/g, "");
        if (month.length > 2) {
            month = month.slice(0, 2);
        }

        if (month.length === 2) {
            yearInputRef.current.focus();
        }

        setEnd_month(month);
    };

    const handleYearChange = (e) => {
        let year = e.target.value.replace(/\D/g, "");
        if (year.length > 4) {
            year = year.slice(0, 4);
        }

        setEnd_year(year);
    };

    const submitBilling = (e) => {
        e.preventDefault();
        const formattedEnd_date = `${end_month}-${end_year}`;
        updateBilling(card.id, { number, end_date: formattedEnd_date, full_name, cvv });
        onClose()
    };

    return (
        <div className={s.modal}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <h3>Редактировать карту</h3>
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
                                    value={end_year}
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
                    <div className={s.btn_center}>
                        <button onClick={(e) => submitBilling(e)}  className={s.submit_btn}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
