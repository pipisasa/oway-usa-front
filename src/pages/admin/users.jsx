import React from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { Pagination } from "@nextui-org/react";

export default function AdminUsersPage() {
  return (
    <div className={s.users_page}>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Номер телефона</th>
            <th>Данные ID паспорта</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
          <tr>
            <td>Акбар</td>
            <td>Кудайбергенов</td>
            <td>salambro@gmai.com</td>
            <td>+996 990 777 820</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination variant="bordered" total={10} initialPage={1} />
      </div>
    </div>
  );
}
