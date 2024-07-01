import React from "react";
import s from "./Arrow.module.scss";

export default function CloseModal() {
  return (
    <div className={s.arrow}>
      <img src="/assets/icons/ui/closeone.svg" alt="Arrow" />
    </div>
  );
}
