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
  // {
  //   component: (
  //     <TextInputSelect
  //       placeholder="Введите фамилию"
  //       onSearch={(input) => handleSearch(input, "last_name")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.last_name || "фамилие"}`,
  // },
  // {
  //   component: (
  //     <TextInputSelect
  //       placeholder="Введите почту"
  //       onSearch={(input) => handleSearch(input, "email")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.email || "почта"}`,
  // },
  // {
  //   component: (
  //     <TextInputSelect
  //       placeholder="Введите номер телефона"
  //       onSearch={(input) => handleSearch(input, "phone_number")}
  //     />
  //   ),
  //   displayText: `по: ${inputs.phone_number || "номер телефона"}`,
  // },
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
