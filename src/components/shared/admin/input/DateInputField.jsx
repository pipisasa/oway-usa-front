import React from "react";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";

export const DateInputField = ({ label, name, value, onChange }) => {
  return (
    <div className={c.input}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder="ММ.ДД.ГГГГ"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
