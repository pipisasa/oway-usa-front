import React from "react";
import TextInputSelect from "../select/all/TextInputSelect";

const inputComponents = (handleSearch, inputs) => [
  {
    component: (
      <TextInputSelect
        placeholder="Введите Имя"
        onSearch={(input) => handleSearch(input, "first_name")}
      />
    ),
    displayText: `по: ${inputs.first_name || "имени"}`,
  },
  {
    component: (
      <TextInputSelect
        placeholder="Трек номер	"
        onSearch={(input) => handleSearch(input, "tracking_number")}
      />
    ),
    displayText: `по: ${inputs.tracking_number || "Трек номер	"}`,
  },
  {
    component: (
      <TextInputSelect
        placeholder="Введите ID"
        onSearch={(input) => handleSearch(input, "unique_id")}
      />
    ),
    displayText: `по: ${inputs.unique_id || "ID"}`,
  },
];
export { inputComponents };
