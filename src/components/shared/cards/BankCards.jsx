import React from "react";
import s from "@/styles/components/shared/cards/BankCards.module.scss";

export default function BankCards({ card, onDelete, onUpdate }) {
    const handleDelete = () => {
        onDelete(card.id);
    };
    const handleEditClick = () => {
        onUpdate();
    };
    return (
        <div className={s.card_block}>
            <img src={`/assets/icons/${getCardType(card.number)}.svg`} alt="" />
            <span>{formatCardNumber(card.number)}</span>
            <button onClick={handleEditClick} className={s.card_button}>
                <img src="/assets/icons/edit.svg" alt=""/>
            </button>
            <button onClick={handleDelete}>
                <img src="/assets/icons/delete.svg" alt=""/>
            </button>
        </div>
    );
}

const formatCardNumber = (value) => {
    let onlyNums = value.toString().replace(/\D/g, ""); // Преобразовать в строку и удалить все нецифровые символы
    onlyNums = onlyNums.slice(0, 16); // Ограничить длину до 16 символов

    return onlyNums.replace(/(\d{4})(?=\d)/g, "$1 "); // Разделить номер карты на блоки по 4 цифры
};
function getCardType(number) {
    console.log(number,"number")
    const cardNumber = number.toString(); // Преобразуем в строку, чтобы использовать метод startsWith
    if (cardNumber?.startsWith("4")) {
        return "visa";
    } else if (cardNumber.startsWith("5")) {
        return "mastercard";
    } else if (cardNumber.startsWith("3")) {
        return "americanexpress";
    } else {
        return "default";
    }
}