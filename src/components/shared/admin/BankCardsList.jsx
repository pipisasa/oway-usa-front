import React, {useState} from "react";
import BankCards from "../cards/BankCards";
import s from "@/styles/components/shared/cards/BankCards.module.scss";
import useUserData from "../../../hooks/user/useUserData";
import useBillingData from "../../../hooks/billing/useBillingData";
import BankCardsEditModal from "../users/modals/BankCardsEditModal";

export default function BankCardsList() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const {userData} = useUserData()
    console.log(userData,"userData")
    const {billingData, deleteBilling} = useBillingData(userData?.first_name)
    console.log(billingData,"billingData")
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
