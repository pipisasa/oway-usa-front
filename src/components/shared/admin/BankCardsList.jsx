import React, { useEffect, useState } from "react";
import BankCards from "../cards/BankCards";
import s from "@/styles/components/shared/cards/BankCards.module.scss";
import useBillingData from "../../../hooks/billing/useBillingData";
import BankCardsEditModal from "../users/modals/BankCardsEditModal";
import BankCardsModal from "../users/modals/BankCardsModal";
import Loading from "./Loading";

export default function BankCardsList() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const { billingData, deleteBilling, fetchUserData, loading } =
    useBillingData();

  useEffect(() => {
    if (!billingData) {
      fetchUserData();
    }
  }, [billingData]);

  const handleDelete = async (cardId) => {
    try {
      await deleteBilling(cardId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const handleEdit = (card) => {
    setSelectedCard(card);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={s.cards_list}>
      <div className={s.mobile_btn}>
        <span>Оплата</span>
        <BankCardsModal />
      </div>
      {billingData?.map((card) => (
        <BankCards
          key={card.id}
          card={card}
          onUpdate={() => handleEdit(card)}
          onDelete={handleDelete}
        />
      ))}
      {isEditModalOpen && (
        <BankCardsEditModal
          isOpen={isEditModalOpen}
          card={selectedCard}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
