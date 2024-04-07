import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useCategories from "../../../../hooks/admin/useCategories";

export default function ShopsCategoryModal({ isOpen, onClose, editCategory }) {
    const [name, setName] = useState("");
    const { categories, addCategories, updateCategories } = useCategories();

    useEffect(() => {
        if (editCategory) {
            setName(editCategory.name);
        } else {
            setName("");
        }
    }, [editCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editCategory) {
                await updateCategories(editCategory.id, { name });
            } else {
                await addCategories(name);
            }
            onClose();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div className={s.modal}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <h3>{editCategory ? "Редактировать категорию" : "Создать категорию"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className={s.shops_form}>
                        <div className={s.second_input_block}>
                            <div>
                                <label htmlFor="description">Название категории</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Создать категорию"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.btn_center}>
                        <button type="submit" className={s.submit_btn}>
                            {editCategory ? "Сохранить изменения" : "Создать"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
