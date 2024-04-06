import React from "react";
import s from "@/styles/admin/CategoryBlock.module.scss";
import { Checkbox } from "@nextui-org/react";
import useCategories from "../../../../hooks/admin/useCategories";

export default function ShopsCategory({setSelectedCategory}) {
    const {categories} = useCategories()
  return (
    <div className={s.category_block}>
      <h3>Категории</h3>
      <div className={s.checkboxes}>
          {categories.map((category) => (
              <Checkbox key={category.id} size="md" onChange={() => setSelectedCategory(category)}>
                  {category.name}
              </Checkbox>
          ))}

      </div>
    </div>
  );
}
