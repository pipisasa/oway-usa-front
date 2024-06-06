import React from "react";
import s from "@/styles/components/partials/select/ChoiceInputSelect.module.scss";

const ChoiceInputSelect = ({ title }) => {
  return (
    <div className={s.container}>
      <div>{title}</div>
    </div>
  );
};

export default ChoiceInputSelect;
