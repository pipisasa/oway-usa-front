import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { BsCheck } from "react-icons/bs";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";

export default function AddBulletinCategoryBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [selectedColor, setSelectedColor] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const { createBulletinBoard, loading, error } = useBulletinBoard();

  const colors = [
    { color: "gray", hex: "#808080" },
    { color: "blue", hex: "#414BB2" },
    { color: "gold", hex: "#ECC819" },
    { color: "black", hex: "#1A1A1A" },
    { color: "brown", hex: "#57480E" },
    { color: "turquoise", hex: "#10A689" },
    { color: "red", hex: "#F14725" },
    { color: "pink", hex: "#F2439B" },
    { color: "purple", hex: "#652CB3" },
    { color: "sky", hex: "#6AD9E6" },
    { color: "yellow", hex: "#FEF445" },
    { color: "white", hex: "#ffffff" },
    { color: "light-gray", hex: "#F2F2F2" },
    { color: "olive-green", hex: "#708238" },
    { color: "coral", hex: "#FF7F50" },
    { color: "teal", hex: "#008080" },
    { color: "maroon", hex: "#800000" },
    { color: "navy", hex: "#000080" },
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
