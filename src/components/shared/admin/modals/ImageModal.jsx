import React from "react";
import s from "@/styles/admin/modal/ImageModal.module.scss";
import { RxCross1 } from "react-icons/rx";

export default function ImageModal({ src, onClose }) {
  return (
    <div
      className={s.modal_backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={s.image_modal}>
        <button onClick={onClose} className={s.exit}>
          <RxCross1 size={22} />
        </button>
        <img src={src} alt="Zoomed" />
      </div>
    </div>
  );
}
