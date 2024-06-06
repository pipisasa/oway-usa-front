import React, { useState } from "react";
import s from "@/styles/components/partials/select/TextInputSelect.module.scss";

export default function NumberInputSelect({ placeholder, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(e);
    }
  };

  return (
    <div className={s.container} onClick={handleInputClick}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <img
        src="/assets/icons/search.svg"
        alt="search"
        onClick={handleSearchClick}
      />
    </div>
  );
}
