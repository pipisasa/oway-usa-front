import React, {useEffect, useState} from "react";
import BankCards from "../cards/BankCards";
import s from "@/styles/components/shared/cards/BankCards.module.scss";
import useBillingData from "../../../hooks/billing/useBillingData";
import BankCardsEditModal from "../users/modals/BankCardsEditModal";

export default function BankCardsList() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const {billingData, deleteBilling, fetchUserData} = useBillingData()

    useEffect(() => {
        if (!billingData) {
            fetchUserData();
        }
    }, [billingData]);
    console.log(billingData,"billingData23")
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

  return (
    <div className={s.cards_list}>
        {billingData?.map((card) => (
            <BankCards key={card.id} card={card} onUpdate={() => handleEdit(card)} onDelete={handleDelete}/>
        ))}
        {isEditModalOpen && <BankCardsEditModal isOpen={isEditModalOpen} card={selectedCard} onClose={() => setIsEditModalOpen(false)} />}
    </div>
  );
}
