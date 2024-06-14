import React from "react";
import TextInputSelect from "../select/all/TextInputSelect";
import ChoiceInputSelect from "../select/all/ChoiceInputSelect";
const options = {
  status: [
    { id: false, name: "В ожидании" },
    { id: true, name: "Обработан" },
  ],
  is_paid: [
    { id: false, name: "Не оплачено" },
    { id: true, name: "Оплачено" },
  ],
};

const inputComponents = (handleSearch, inputs) => [
  {
    component: (
      <TextInputSelect
        placeholder="Введите название посылки"
        onSearch={(input) => handleSearch(input, "name_of_purchase")}
      />
    ),
    displayText: `по: ${inputs.name_of_purchase || "название посылки"}`,
  },
  {
    component: (
      <TextInputSelect
        placeholder="Введите дату"
        onSearch={(input) => handleSearch(input, "created_at")}
      />
    ),
    displayText: `по: ${inputs.created_at || "дате"}`,
  },
  {
    component: (
      <TextInputSelect
        placeholder="Введите цену"
        onSearch={(input) => handleSearch(input, "price")}
      />
    ),
    displayText: `по: ${inputs.price || "цене"}`,
  },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите статус"
        options={options.status}
        onChoiceSelect={(choice) => handleSearch(choice.id, "request_status")}
      />
    ),
    displayText: `по: ${inputs.request_status.name || "статусу"}`,
  },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите статус оплаты"
        options={options.is_paid}
        onChoiceSelect={(choice) => handleSearch(choice.id, "is_paid")}
      />
    ),
    displayText: `по: ${inputs.is_paid || "статус оплаты"}`,
  },
];
export { inputComponents, options };
