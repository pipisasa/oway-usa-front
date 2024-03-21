import React from "react";
import s from "@/styles/admin/Modal.module.scss";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={s.modal_overlay} onClick={onClose}>
      <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={s.btn_center}>
          <button onClick={onClose} className={s.close_btn}>
            <RxCross2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
