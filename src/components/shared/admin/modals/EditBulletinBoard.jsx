import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";

export default function EditBulletinBoard({ bulletin }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [text, setText] = useState(bulletin.text);
  const [category, setCategory] = useState(bulletin.category);
  const [city, setCity] = useState(bulletin.city);
  const [itemCategory, setItemCategory] = useState(
    bulletin.item_category || ""
  );

  const { updateBulletinBoard, loading, error } = useBulletinBoard();
  const { bulletins1 } = useBulletinBoardCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateBulletinBoard(
      bulletin.id,
      text,
      itemCategory,
      city
    );
    if (result) {
      toggleModal();
    }
  };

  useEffect(() => {
    setText(bulletin.text);
    setCategory(bulletin.category);
    setCity(bulletin.city);
    setItemCategory(bulletin.item_category || "");
  }, [bulletin]);

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button onClick={toggleModal} className={c.edit}>
          <img src="/assets/icons/edit.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Редактировать</h3>
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
              {loading ? "Редактирование..." : "Редактировать"}
            </button>
          </div>
          {error && <p className={s.error_msg}>{error}</p>}
        </form>
      </Modal>
    </div>
  );
}
