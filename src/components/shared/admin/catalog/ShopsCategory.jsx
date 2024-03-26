import React from "react";
import s from "@/styles/admin/CategoryBlock.module.scss";
import { Checkbox } from "@nextui-org/react";

export default function ShopsCategory() {
  return (
    <div className={s.category_block}>
      <h3>Категории</h3>
      <div className={s.checkboxes}>
        <Checkbox defaultSelected size="md">
          Категория
        </Checkbox>
        <Checkbox defaultSelected size="md">
          Категория
        </Checkbox>
        <Checkbox size="md">Категория</Checkbox>
        <Checkbox size="md">Категория</Checkbox>
        <Checkbox size="md">Категория</Checkbox>
      </div>
    </div>
  );
}
