import React from "react";
import s from "@/styles/components/shared/UsersProductTable.module.scss";
import { Pagination } from "@nextui-org/react";

export default function OnTheWay() {
  return (
    <div className={s.product_table}>
      <table>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название товара</th>
            <th>Цена</th>
            <th>Дата покупки товара</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="/assets/images/product-img.png" alt="product img" />
            </td>
            <td>Iphone 15</td>
            <td>$100,000</td>
            <td>18.03.2024</td>
          </tr>
          <tr>
            <td>
              <img src="/assets/images/product-img.png" alt="product img" />
            </td>
            <td>Iphone 15</td>
            <td>$100,000</td>
            <td>18.03.2024</td>
          </tr>
          <tr>
            <td>
              <img src="/assets/images/product-img.png" alt="product img" />
            </td>
            <td>Iphone 15</td>
            <td>$100,000</td>
            <td>18.03.2024</td>
          </tr>
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination variant="bordered" total={10} initialPage={1} />
      </div>
    </div>
  );
}
