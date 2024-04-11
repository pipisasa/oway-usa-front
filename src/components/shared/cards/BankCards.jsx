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
       <div className={s.card_block_number}>
          <img src={`/assets/icons/${getCardType(card.number)}.svg`} alt="" />
          <span>{formatCardNumber(card.number)}</span>
      </div>
      <div>
        <button onClick={handleEditClick} className={s.card_button}>
          <img src="/assets/icons/edit.svg" alt="" />
        </button>
        <button onClick={handleDelete}>
          <img src="/assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

const formatCardNumber = (value) => {
  let onlyNums = value.toString().replace(/\D/g, ""); 
  onlyNums = onlyNums.slice(0, 16); 
  let maskedNumber = onlyNums.substring(0, 4) + " " + onlyNums.substring(4, 6) + "** **** ****"; 
  return maskedNumber;
};


function getCardType(number) {
  const cardNumber = number.toString(); 
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
