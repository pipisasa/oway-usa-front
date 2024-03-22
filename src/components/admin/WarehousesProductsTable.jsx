import React from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";

export default function WarehousesProductsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Нзвание товара</th>
          <th>ID Товара</th>
          <th>Адрес заказа</th>
          <th>Страна получения</th>
          <th>Вес</th>
          <th>Трек-номер</th>
          <th>Статус</th>
          <th>Комментарий</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Iphone 15 </td>
          <td>09203201</td>
          <td>Караганда, Бухар Жырау 32, кв. 23</td>
          <td>Казахстан</td>
          <td>30кг. 50г.</td>
          <td>№32123232</td>
          <td>Готов к выдаче</td>
          <td>
            <button className={s.btn}>Подробнее</button>
          </td>
        </tr>
        <tr>
          <td>Iphone 15 </td>
          <td>09203201</td>
          <td>Караганда, Бухар Жырау 32, кв. 23</td>
          <td>Казахстан</td>
          <td>30кг. 50г.</td>
          <td>№32123232</td>
          <td>Готов к выдаче</td>
          <td>
            <button className={s.btn}>Подробнее</button>
          </td>
        </tr>
        <tr>
          <td>Iphone 15 </td>
          <td>09203201</td>
          <td>Караганда, Бухар Жырау 32, кв. 23</td>
          <td>Казахстан</td>
          <td>30кг. 50г.</td>
          <td>№32123232</td>
          <td>Готов к выдаче</td>
          <td>
            <button className={s.btn}>Подробнее</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
