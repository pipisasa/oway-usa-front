import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { BsCheck } from "react-icons/bs";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";

export default function AddBulletinBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [selectedColor, setSelectedColor] = useState(null);
  const [text, setText] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { bulletins1 } = useBulletinBoardCategory();
  const { createBulletinBoard, loading, error, bulletins } = useBulletinBoard();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBulletinBoard(
      text,
      itemCategory,
      selectedColor,
      city
    );
    if (result) {
      toggleModal();
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true);
  };

  const handleCitySelect = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
  };

  const filteredCities = bulletins
    .map((bulletin) => bulletin.city)
    .filter(
      (c, index, self) =>
        c.toLowerCase().startsWith(city.toLowerCase()) &&
        self.indexOf(c) === index
    );

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button style={{ padding: "24px" }} onClick={toggleModal}>
          <img src="/assets/icons/add_board.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить объявление</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.second_input_block}>
              <div>
                <label htmlFor="">Название объявления</label>
                <input
                  type="text"
                  placeholder="Введите название"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className={c.selectcontainer}>
                <label htmlFor="">Категория</label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  {bulletins1.map((bulletin) => (
                    <option key={bulletin.id} value={bulletin.id}>
                      {bulletin.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={s.position_relative}>
                <label htmlFor="">Город</label>
                <input
                  type="text"
                  placeholder="Введите город"
                  value={city}
                  onChange={handleCityChange}
                />
                {city && showSuggestions && filteredCities.length > 0 && (
                  <ul className={c.suggestions}>
                    {filteredCities.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleCitySelect(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn} disabled={loading}>
              {loading ? "Добавление..." : "Добавить"}
            </button>
          </div>
          {error && <p className={s.error_msg}>{error}</p>}
        </form>
      </Modal>
    </div>
  );
}
