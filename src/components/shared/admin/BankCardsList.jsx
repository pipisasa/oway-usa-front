import React from "react";
import BankCards from "../cards/BankCards";
import s from "@/styles/components/shared/cards/BankCards.module.scss";

export default function BankCardsList() {
  return (
    <div className={s.cards_list}>
      <BankCards />
      <BankCards />
      <BankCards />
      <BankCards />
    </div>
  );
}
