import React from "react";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";

export default function Step2({
  formData,
  handleChange,
  nextStep,
  currentStep,
  setCurrentStep,
  selectedOption,
  setSelectedOption,
}) {
  const status = [
    { id: 6, name: "Получен на складе," },
    { id: 5, name: "Отправлен," },
    { id: 4, name: "Получен в ПВЗ," },
    { id: 3, name: "Готов к выдаче," },
    { id: 7, name: "Отправлено курьерской службой," },
    { id: 8, name: "Доставлено," },
  ];

  const handleSelectChange = (e) => {
    const newSelectedId = e.target.value;
    setSelectedOption(newSelectedId);
    handleChange({
      target: { name: "status", value: newSelectedId },
    });
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
      <form action="" className={c.first_block}>
        <div className={c.input}>
          <label htmlFor="status">Выберите статус посылки</label>
          <select
            id="status"
            name="status"
            value={selectedOption}
            onChange={handleSelectChange}
            className={c.select}
          >
            <option value="">Выберите статус</option>
            {status.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className={c.input}>
          <label htmlFor="price">Стоимость ( $ )</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Стандартная стоимость"
            value={formData.price}
            readOnly
          />
        </div>

        <div className={c.flex}>
          <div className={c.input}>
            <label htmlFor="date_sent">Дата отправки</label>
            <input
              type="text"
              name="date_sent"
              id="date_sent"
              value={formData.date_sent}
              placeholder="дд.мм.гггг"
              onChange={handleChange}
            />
          </div>
          <div className={c.input}>
            <label htmlFor="date_arrived">Дата прибытия</label>
            <input
              type="text"
              name="date_arrived"
              id="date_arrived"
              value={formData.date_arrived}
              placeholder="дд.мм.гггг"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
    </div>
  );
}
