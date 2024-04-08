import React, { useState } from "react";
import s from "@/styles/admin/CategoryBlock1.module.scss";
import { Checkbox, Modal } from "@nextui-org/react";
import useCategories from "../../../../hooks/admin/useCategories";
import ShopsCategoryModal from "../modals/ShopCategoryModal";

export default function ShopsCategory1({ setSelectedCategory }) {
    const { categories, deleteCategory } = useCategories();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    const handleCreateCategoryClick = () => {
        setShowModal(true);
        setEditCategory(null);
    };

    const handleEditCategoryClick = (category) => {
        setEditCategory(category);
        setShowModal(true);
    };

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
        setSelectedCategories([...selectedCategories, category]);
    }
    setSelectedCategory(selectedCategories); // Обновление выбранных категорий
};


    return (
        <div className={s.category_block}>
            <h3>Категории</h3>
            <div className={s.checkboxes}>
                {categories.map((category) => (
                    <div className={s.checkboxes_block} key={category.id}>
                        <Checkbox
                            size="md"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category)}
                        >
                            {category.name}
                        </Checkbox>
                    </div>
                ))}
            </div>
        </div>
    );
}
