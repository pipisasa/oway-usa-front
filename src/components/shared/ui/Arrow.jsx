import React from "react";
import s from "./Arrow.module.scss";

export default function Arrow() {
  return (
    <div className={s.arrow}>
      <img src="/assets/icons/ui/arrows.svg" alt="Arrow" />
    </div>
  );
}
