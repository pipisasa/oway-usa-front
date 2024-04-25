import React from "react";

import s from "@/styles/pages/user/MyWarehouse.module.scss";
import Loading from "@/components/shared/admin/Loading";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";

export default function UserWarehouses() {
  const { warehouses, loading, error, deleteWarehouse } = useUserWarehouses();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className={s.my}>
      <table>
        <thead>
          <tr>
            <th>ID пользователя</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Склад</th>
            <th>Трек номер</th>
            <th>Курьерская служба</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td style={{ fontWeight: "bold" }}>
                #{warehouse.user.unique_id}
              </td>
              <td>{warehouse.user.first_name}</td>
              <td>{warehouse.user.last_name}</td>
              <td>{warehouse.warehouse}</td>
              <td>{warehouse.tracking_number}</td>
              <td>{warehouse.courier_service}</td>
              <td className={s.actions}>
                <button onClick={() => deleteWarehouse(warehouse.id)}>
                  <img src="/assets/icons/delete.svg" alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
