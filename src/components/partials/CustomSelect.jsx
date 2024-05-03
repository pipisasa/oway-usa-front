import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import s from "./asd.module.scss";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const isAdminWarehousesPage = router.pathname === "/admin/warehouses";

  return (
    <div className={s.customSelect}>
      <div className={s.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        <div className={s.qwe}>
          <p>{value}</p>
          <img
            src="/assets/icons/selecter.svg"
            alt="qwe"
            style={
              isAdminWarehousesPage
                ? { display: "none" }
                : { marginTop: "-25px", marginLeft: "calc(100% - 25px)" }
            }
          />
        </div>
        <div className={`${s.arrow} ${isOpen ? s.open : ""}`}></div>
      </div>
      {isOpen && (
        <ul className={s.options}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
