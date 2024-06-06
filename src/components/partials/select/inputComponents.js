import React from "react";
import TextInputSelect from "./all/TextInputSelect";
import NumberInputSelect from "./all/NumberInputSelect";
import ChoiceInputSelect from "./all/ChoiceInputSelect";

const options = {
  status: ["в складе", "готов к выдаче", "в пути"],
  country: ["Россия", "Америка", "Кыргызстан"],
  default: ["Option 1", "Option 2", "Option 3"],
};

const inputComponents = (handleSearch, inputs) => [
  {
    component: (
      <TextInputSelect
        placeholder="Впишите трек-номер"
        onSearch={(input) => handleSearch(input, "textInput")}
      />
    ),
    displayText: `по: ${inputs.textInput || "трек-номеру"}`,
  },
  {
    component: (
      <NumberInputSelect
        placeholder="по: цена"
        onSearch={(input) => handleSearch(input, "numberInput")}
      />
    ),
    displayText: `по: ${inputs.numberInput || "цена"}`,
  },
  {
    component: (
      <NumberInputSelect
        placeholder="по: дата"
        onSearch={(input) => handleSearch(input, "dateInput")}
      />
    ),
    displayText: `по: ${inputs.dateInput || "дате"}`,
  },
  {
    component: (
      <NumberInputSelect
        placeholder="по: вес"
        onSearch={(input) => handleSearch(input, "weightInput")}
      />
    ),
    displayText: `по: ${inputs.weightInput || "весу"}`,
  },
  {
    component: (
      <TextInputSelect
        placeholder="Введите название"
        onSearch={(input) => handleSearch(input, "nameInput")}
      />
    ),
    displayText: `по: ${inputs.nameInput || "названию"}`,
  },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите статус"
        options={options.status}
        onChoiceSelect={(choice) => handleSearch(choice, "statusInput")}
      />
    ),
    displayText: `по: ${inputs.statusInput || "статусу"}`,
  },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите страну принятия"
        options={options.country}
        onChoiceSelect={(choice) => handleSearch(choice, "countryInput")}
      />
    ),
    displayText: `по: ${inputs.countryInput || "стране принятия"}`,
  },
  {
    component: (
      <ChoiceInputSelect
        title="Выберите страну"
        options={options.default}
        onChoiceSelect={(choice) => handleSearch(choice, "selectedChoice")}
      />
    ),
    displayText: `по: ${inputs.selectedChoice || "Choice Input"}`,
  },
];

export { options, inputComponents };
