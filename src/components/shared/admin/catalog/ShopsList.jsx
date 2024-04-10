import ShopCard from "@/components/shared/cards/ShopCard";
import React, { useState } from "react";
import s from "@/styles/components/shared/cards/ShopCard.module.scss";
import useShops from "../../../../hooks/admin/useShops";
import EditShopsModal from "../modals/EditShopsModal";
import Loading from "../Loading";

export default function ShopsList({ selectedCategory, selectedCountry }) {
   const {products, isLoading, deleteShops, updateShops} = useShops(selectedCategory, selectedCountry?.id)
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (productId) => {
    try {
      await deleteShops(productId);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      setSelectedNotification(
        products?.results?.find((product) => product.id === productId)
      );
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      setIsEditing(false);
      setSelectedNotification(null);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className={s.cards_list}>
      {products?.results?.map((shop, index) => (
        <ShopCard
          key={index}
          shop={shop}
          onDelete={handleDelete}
          onEdit={handleUpdate}
        />
      ))}
      {isEditing && (
        <EditShopsModal
          onUpdate={(formData) => {
            updateShops(selectedNotification.id, formData);
            toggleModal(false);
          }}
          isOpen={isModalOpen}
          onClose={() => toggleModal(false)}
          shop={selectedNotification}
        />
      )}
    </section>
  );
}
