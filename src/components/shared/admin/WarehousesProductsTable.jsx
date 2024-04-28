import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import WerehousesModal from "./modals/WarehousesModal";

export default function WarehousesProductsTable({
  warehouses,
  isLoading,
  error,
  current,
  setCurrent,
  nameFilter,
  trackNumberFilter,
  statusFilter,
  countryFilter,
}) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const filteredWarehouses = warehouses?.results?.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      warehouse.track_number.toString().includes(trackNumberFilter) &&
      (statusFilter === "" || warehouse.status.name === statusFilter) &&
      (countryFilter === "" || warehouse.country.name === countryFilter)
  );

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Название посылки</th>
            <th>Адрес отправки</th>
            <th>Адрес прибытия</th>
            <th>Вес (кг)</th>
            <th>Трек-номер</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses?.map((warehouse) => (
            <tr
              className={warehouse.is_parcels === true ? s.parcel_tr : ""}
              key={warehouse.id}
            >
              <td style={{ fontWeight: "bold" }}>
                #{warehouse.unique_id_user}
              </td>
              <td>{warehouse.name}</td>
              <td>{warehouse.country.name}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.weight}</td>
              <td>{warehouse.track_number}</td>
              <td
                style={{
                  color:
                    warehouse.status?.name === "Доставлено"
                      ? "#06DB02"
                      : "inherit",
                }}
              >
                {warehouse.status?.name}
              </td>
              <td>
                <button
                  className={s.btn}
                  onClick={() => handleDetailsClick(warehouse)}
                >
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={warehouses?.total_pages}
          initialPage={current}
          onChange={(page) => setCurrent(page)}
        />
      </div>

      {selectedWarehouse && (
        <WerehousesModal
          warehouse={selectedWarehouse}
          onClose={() => setSelectedWarehouse(null)}
        />
      )}
    </div>
  );
}
