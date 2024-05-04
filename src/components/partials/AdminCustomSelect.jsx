import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./AdminCustomSelect.module.scss";

const AdminCustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([
    { id: 3, name: "США" },
    { id: 4, name: "Турция" },
  ]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const getNameById = (id) => {
    const country = countries.find((country) => country.id === id);
    return country ? country.name : country; 
  };

  const displayedValue =
    value && value.name
      ? value.name
      : getNameById(value) || value; 
      
  return (
    <div className={s.customSelect}>
      <div className={s.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        <span>{displayedValue}</span>
        <img src="/assets/icons/selecter.svg" alt="qwe" />
        {isOpen && (
          <ul className={s.options}>
            {options.map((option, index) => (
              <li
                key={index}
                value={option.id}
                onClick={() => handleSelect(option)}
              >
                {option.name ? option.name : option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

AdminCustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ name: PropTypes.string }),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdminCustomSelect;

