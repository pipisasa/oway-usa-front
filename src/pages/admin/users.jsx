import React from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { Pagination } from "@nextui-org/react";
import useUsers from "../../hooks/admin/useUsers";

export default function AdminUsersPage() {
  const {users, isLoading } = useUsers()
  console.log(users.results)

  if (isLoading) {
    return <div>Загрузка...</div>;
  }


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
        {users?.results?.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button className={s.btn}>Подробнее</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination variant="bordered" total={10} initialPage={1} />
      </div>
    </div>
  );
}
