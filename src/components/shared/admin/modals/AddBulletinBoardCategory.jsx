import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { BsCheck } from "react-icons/bs";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";

export default function AddBulletinCategoryBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const { createBulletinBoard, loading, error } = useBulletinBoardCategory();

  const colors = [
    { color: "orange", hex: "#FF7C02" },
    { color: "blue", hex: "#4169E1" },
    { color: "gold", hex: "#FFD832" },
    { color: "black", hex: "#FF5E97" },
    { color: "brown", hex: "#00B4AC" },
    { color: "turquoise", hex: "#FF3A3A" },
    { color: "red", hex: "#652CB3" },
    { color: "pink", hex: "#1400FF" },
    { color: "purple", hex: "#21E8FF" },
    { color: "sky", hex: "#40FA12" },
    { color: "yellow", hex: "#1AFFAD" },
    { color: "white", hex: "#E16C00" },
    { color: "light-gray", hex: "#07BE45" },
    { color: "olive-green", hex: "#FFFFFF" },
  ];

  const isDark = (hex) => {
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 150;
  };

  const selectColor = (color) => {
    setSelectedColor(color.hex);
    setCategory(color.hex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBulletinBoard(name, selectedColor);
    if (result) {
      toggleModal();
    }
  };

  useEffect(() => {
    if (category) {
      setSelectedColor(category);
    }
  }, [category]);

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button style={{ padding: "24px" }} onClick={toggleModal}>
          <img src="/assets/icons/add_board.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить категорию</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.second_input_block}>
              <div>
                <label htmlFor="">Название категории</label>
                <input
                  type="text"
                  placeholder="Введите название"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={c.category_color}>
                <div>
                  <label htmlFor="">Цвет</label>
                  <input
                    type="text"
                    placeholder="#FD23FR"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div
                  className={c.color_box}
                  style={{ backgroundColor: selectedColor }}
                ></div>
              </div>
              <div className={c.colors}>
                <label htmlFor="">Цвет</label>
                <div className={c.hex_colors}>
                  {colors.map((color) => (
                    <button
                      key={color.color}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => selectColor(color)}
                      type="button"
                    >
                      {selectedColor === color.hex && (
                        <BsCheck
                          size={23}
                          color={isDark(color.hex) ? "white" : "black"}
                        />
                      )}
                    </button>
                  ))}
                </div>
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
