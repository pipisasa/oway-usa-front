import ShopCard from "@/components/shared/cards/ShopCard";
import React, {useState} from "react";
import s from "@/styles/components/shared/cards/ShopCard1.module.scss";
import useShops from "../../../../hooks/admin/useShops";
import ShopCard1 from "../../cards/ShopCard1";


export default function ShopsList1({ selectedCategory, selectedCountry }) {
    const {products, isLoading, deleteShops, updateShops} = useShops()
    const [isEditing, setIsEditing] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(products,"45")



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
        return <div>Загрузка...</div>;
    }

    return (
      <section className={s.cards_list}>
          {products?.results
              ?.filter(
          (shop) =>
            (!selectedCategory || shop.category.id === selectedCategory.id) &&
            (!selectedCountry || shop.country.name === selectedCountry.name) // Фильтрация по стране
        )
              .map((shop, index) => (
                  <ShopCard1 key={index} shop={shop} onDelete={handleDelete} onEdit={handleUpdate} />
              ))}
      </section>
  );
}
