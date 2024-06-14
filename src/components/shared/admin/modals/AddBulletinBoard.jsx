import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { BsCheck } from "react-icons/bs";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";

export default function AddBulletinBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [selectedColor, setSelectedColor] = useState(null);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const { createBulletinBoard, loading, error } = useBulletinBoard();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBulletinBoard(
      text,
      category,
      selectedColor,
      city
    );
    if (result) {
      toggleModal();
    }
  };

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
              <div>
                <label htmlFor="">Категория</label>
                <input
                  type="text"
                  placeholder="Введите категорию"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Город</label>
                <input
                  type="text"
                  placeholder="Введите город"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
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
