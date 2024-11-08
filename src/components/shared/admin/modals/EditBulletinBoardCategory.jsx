import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { BsCheck } from "react-icons/bs";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";

export default function EditBulletinBoardCategory({ bulletin }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [name, setName] = useState(bulletin.name);
  const [selectedColor, setSelectedColor] = useState(bulletin.color);

  const { updateBulletinBoard, loading, error } = useBulletinBoardCategory();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateBulletinBoard(bulletin.id, name, selectedColor);
    if (result) {
      toggleModal();
    }
  };

  useEffect(() => {
    setName(bulletin.name);
    setSelectedColor(bulletin.color);
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
                <label htmlFor="">Название категории</label>
                <input
                  type="text"
                  placeholder="Введите название"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
              {loading ? "Редактирование..." : "Редактировать"}
            </button>
          </div>
          {error && <p className={s.error_msg}>{error}</p>}
        </form>
      </Modal>
    </div>
  );
}
