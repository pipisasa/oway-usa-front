import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import WerehousesModal from "./modals/WarehousesModal";

export default function WarehousesProductsTable({
  warehouses,
  deleteWarehouse,
  isLoading,
  error,
  current,
  setCurrent,
  nameFilter,
  statusFilter,
  countryFilter,
}) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [confirmDeleteWarehouse, setConfirmDeleteWarehouse] = useState(null);

  const filteredWarehouses = warehouses?.results?.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (statusFilter === "" || warehouse.status.name === statusFilter) &&
      (countryFilter === "" || warehouse.country.name === countryFilter)
  );

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleDeleteConfirmation = (warehouse) => {
    setConfirmDeleteWarehouse(warehouse);
  };

  const handleDelete = (warehouseId) => {
    deleteWarehouse(warehouseId);
    setConfirmDeleteWarehouse(null);
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
            <th>Название посылки</th>
            <th>Адрес получения</th>
            <th>Страна получения</th>
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
              <td>{warehouse.name}</td>
              <td>{warehouse.country_of_origin}</td>
              <td>{warehouse.country_of_destination}</td>
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
              <td className="flex items-center">
                <button
                  className={s.btn}
                  onClick={() => handleDetailsClick(warehouse)}
                >
                  Подробнее
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className={s.btn}
                  onClick={() => handleDeleteConfirmation(warehouse)}
                >
                  Удалить
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

      {confirmDeleteWarehouse && (
        <>
          <div className={s.modalBackdrop}></div>
          <div className={s.confirmDeleteModal}>
            <p>Вы уверены, что хотите удалить этот товар?</p>
            <div>
              <button onClick={() => handleDelete(confirmDeleteWarehouse.id)}>
                Да
              </button>
              <button onClick={() => setConfirmDeleteWarehouse(null)}>
                Отмена
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
