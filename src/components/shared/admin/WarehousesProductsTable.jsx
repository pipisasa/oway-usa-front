import React, {useEffect} from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import useWarehouses from "../../../hooks/admin/useWarehouses";

export default function WarehousesProductsTable() {
  const { warehouses, fetchWarehouses, isLoading, error } = useWarehouses();
  useEffect(() => {
    fetchWarehouses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Нзвание товара</th>
          <th>Адрес заказа</th>
          <th>Страна получения</th>
          <th>Вес</th>
          <th>Трек-номер</th>
          <th>Статус</th>
          <th>Комментарий</th>
        </tr>
      </thead>
      <tbody>
      {warehouses?.results?.map((warehouse) => (
          <tr key={warehouse.id}>
            <td>{warehouse.name}</td>
            <td>{warehouse.address}</td>
            <td>{warehouse.country.name}</td>
            <td>{warehouse.weight}</td>
            <td>{warehouse.track_number}</td>
            <td>{warehouse.status.name}</td>
            <td>{warehouse.comments}</td>
            <td>
              <button className={s.btn}>Подробнее</button>
            </td>
          </tr>
      ))}
      </tbody>
    </table>
  );
}
