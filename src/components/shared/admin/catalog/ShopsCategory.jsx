import React, { useState } from "react";
import s from "@/styles/admin/CategoryBlock.module.scss";
import { Checkbox } from "@nextui-org/react";
import useCategories from "../../../../hooks/admin/useCategories";
import ShopsCategoryModal from "../modals/ShopCategoryModal";

export default function ShopsCategory({
  setSelectedCategory,
  selectedCategory,
}) {
  const { categories, deleteCategories, setCategories } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const handleCreateCategoryClick = () => {
    setShowModal(true);
    setEditCategory(null);
  };

  const handleEditCategoryClick = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category.id)) {
      setSelectedCategory(selectedCategory.filter((id) => id !== category.id));
    } else {
      setSelectedCategory([...selectedCategory, category.id]);
    }
  };

  const handleDeleteCategoryClick = (categoryId) => {
    setShowDeleteModal(true);
    setDeletingCategoryId(categoryId);
  };

  const handleDeleteConfirmation = () => {
    deleteCategories(deletingCategoryId);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={s.category_block}>
      <h3>Категории</h3>
      <div className={s.checkboxes}>
        {categories.map((category) => (
          <div className={s.checkboxes_block} key={category.id}>
            <Checkbox
              size="md"
              checked={selectedCategory.includes(category.id)}
              onChange={() => handleCategoryChange(category)}
            >
              {category.name}
            </Checkbox>
            <div>
              <button className={s.card_button}>
                <img
                  src="/assets/icons/edit.svg"
                  alt=""
                  onClick={() => handleEditCategoryClick(category)}
                />
              </button>
              <button onClick={() => handleDeleteCategoryClick(category.id)}>
                <img src="/assets/icons/delete.svg" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className={s.checkboxes_btn} onClick={handleCreateCategoryClick}>
        Создать категорию
      </button>
      {showModal && (
        <ShopsCategoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          editCategory={editCategory}
        />
      )}
      {showDeleteModal && (
        <div className={s.modal}>
          <div className={s.modal_content}>
            <p>Вы уверены, что хотите удалить эту категорию?</p>
            <div>
              <button onClick={handleDeleteConfirmation}>Да</button>
              <button onClick={handleDeleteCancel}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
