import React from "react";
import BankCards from "../cards/BankCards";
import s from "@/styles/components/shared/cards/BankCards.module.scss";
import useUserData from "../../../hooks/user/useUserData";
import useBillingData from "../../../hooks/billing/useBillingData";

export default function BankCardsList() {
    const {userData} = useUserData()
    console.log(userData,"userData")
    const {billingData} = useBillingData(userData?.first_name)
    console.log(billingData,"billingData")

  return (
    <div className={s.cards_list}>
      <BankCards />
      <BankCards />
      <BankCards />
      <BankCards />
    </div>
  );
}
