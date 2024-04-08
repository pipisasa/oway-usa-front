import React, { useState } from "react";
import s from "@/styles/partials/SelectOptions.module.scss";

export default function SelectOptions() {
  const [isOpen, setIsOpen] = useState();
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.select}>
      <label htmlFor="">Выбор страны отправки *</label>
      <div className={s.options}>
        <span>Выберите страну</span>
        <button onClick={toggleOptions}>
          <img src="/assets/icons/icon-right.svg" alt="open" />
        </button>
      </div>
      {isOpen ? (
        <div className={s.options_var}>
          <button>США</button>
          <button>Турция</button>
        </div>
      ) : null}
    </div>
  );
}
