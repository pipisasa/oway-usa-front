import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useShops from "../../../../hooks/admin/useShops";
import useCategories from "@/hooks/admin/useCategories";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";

export default function MyWarehousesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { categories } = useCategories();
  const { countries } = useCountries();
  const { addShops } = useShops();

  // select-country
  const [selectedOption, setSelectedOption] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addShops(
        name,
        selectedOption1?.id,
        selectedOption?.id,
        logo,
        description,
        url
      );
      toggleModal();
    } catch (error) {
      console.error("Ошибка при добавлении сайта:", error);
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить товар
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить сайт</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="warehouse">Склад</label>
                <input
                  id="warehouse"
                  type="text"
                  placeholder="Введите название"
                />
              </div>

              <div>
                <label htmlFor="tracking_number">Трак-код</label>
                <input
                  id="tracking_number"
                  type="number"
                  placeholder="Вставьте трак-код"
                />
              </div>

              <div>
                <label htmlFor="courier_service">Курьерская служба</label>
                <input
                  id="courier_service"
                  type="text"
                  placeholder="Вставьте трак-код"
                />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Сохранить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
