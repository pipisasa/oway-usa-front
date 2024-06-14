import React from "react";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";

export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className={c.input}>
      <label htmlFor={name}>{label}</label>
      <input
        type={
          name === "price" ||
          name === "articul" ||
          name === "weight" ||
          name === "track_number"
            ? "number"
            : "text"
        }
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
