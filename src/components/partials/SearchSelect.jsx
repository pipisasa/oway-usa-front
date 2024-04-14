import React from "react";
import s from "@/styles/admin/SearchSelect.module.scss";

const SearchSelect = ({ suggestions, handleSelectWarehouse }) => (
  <ul className={s.select}>
    {suggestions.map((warehouse) => (
      <li
        key={warehouse.id}
        onClick={() => handleSelectWarehouse(warehouse)}
        className={s.selectItem}
      >
       <h5>#{warehouse.unique_id}</h5> {warehouse.first_name} {warehouse.last_name}
      </li>
    ))}
  </ul>
);

export default SearchSelect;
