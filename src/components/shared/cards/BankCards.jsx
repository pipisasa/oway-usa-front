import React from "react";
import s from "@/styles/components/shared/cards/BankCards.module.scss";

export default function BankCards() {
  return (
    <div className={s.card_block}>
      <img src="/assets/icons/visa.svg" alt="" />
      <span>440 43** **** ****</span>
    </div>
  );
}
