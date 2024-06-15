import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import SearchSelect from "@/components/partials/SearchSelect";

export default function Step3({
  handleChange,
  handleSubmit,
  currentStep,
  setCurrentStep,
}) {
  const { warehouses, fetchWarehouses } = useWarehousesFull();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputValue.trim() !== "") {
      fetchWarehouses(inputValue);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    } else {
      setSuggestions(warehouses?.results || []);
    }
  }, [warehouses]);

  const handleSelectWarehouse = (warehouse) => {
    handleChange({
      target: { name: "unique_id_user", value: warehouse.unique_id },
    });
    setInputValue(warehouse.unique_id);
    setSuggestions([]);
  };

  return (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 1 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(1)}
        >
          1
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 2 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(2)}
        >
          2
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 3 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(3)}
        >
          3
        </button>
        <div className={c.line}></div>
      </div>
      <form action="" className={s.step_form}>
        <div className={c.input}>
          <label htmlFor="comments">Выбор клиента</label>
          <div className={s.search_container}>
            <input
              type="text"
              name="unique_id_user"
              id="unique_id_user"
              placeholder="Напишите ID"
              value={inputValue}
              onChange={handleInputChange}
            />
            <img
              src="/assets/icons/search.svg"
              alt=""
              onClick={handleSearchClick}
            />
          </div>
          <SearchSelect
            suggestions={suggestions}
            handleSelectWarehouse={handleSelectWarehouse}
          />
        </div>
      </form>
      <button className={c.submit_btn} onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
}
