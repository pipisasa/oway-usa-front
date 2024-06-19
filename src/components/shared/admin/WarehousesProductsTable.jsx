import React, { useState, useEffect } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import WarehousesModal from "./modals/WarehousesModal";

export default function WarehousesProductsTable({
  warehouses,
  deleteMultipleWarehouses,
  isLoading,
  error,
  current,
  currentPage,
  setCurrent,
}) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [confirmDeleteWarehouse, setConfirmDeleteWarehouse] = useState(null);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMultipleDeleteConfirm, setShowMultipleDeleteConfirm] =
    useState(false);
  console.log(warehouses);

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleDeleteConfirmation = (warehouse) => {
    setConfirmDeleteWarehouse(warehouse);
  };

  const handleSingleDelete = (id) => {
    deleteMultipleWarehouses([id]);
    setConfirmDeleteWarehouse(null);
  };
  const handleMultipleDeleteClick = () => {
    setShowMultipleDeleteConfirm(true);
  };

  const handleMultipleDelete = () => {
    deleteMultipleWarehouses(selectedWarehouses);
    setSelectedWarehouses([]);
  };

  const toggleWarehouseSelection = (id) => {
    setSelectedWarehouses((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedWarehouses([]);
    } else {
      setSelectedWarehouses(
        warehouses.results.map((warehouse) => warehouse.id)
      );
    }
    setSelectAll(!selectAll);
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
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Название посылки</th>
            <th>Страна отправки</th>
            <th>Страна прибытия</th>
            <th>Вес (кг)</th>
            <th>Трек-номер</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
          <tr>
            <th className={s.actions_btn}>
              <button
                className={s.all_delete}
                onClick={handleMultipleDeleteClick}
              >
                <img src="/assets/icons/admin-icons/Delete.svg" alt="" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {warehouses.results?.map((warehouse) => (
            <tr
              className={warehouse.is_parcels === true ? s.parcel_tr : ""}
              key={warehouse.id}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedWarehouses.includes(warehouse.id)}
                  onChange={() => toggleWarehouseSelection(warehouse.id)}
                />
              </td>
              <td>{warehouse.name}</td>
              <td>{warehouse.country_of_origin?.name}</td>
              <td>{warehouse.country_of_destination?.name}</td>
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
              <td className={s.btns}>
                <button
                  className={s.edit}
                  onClick={() => handleDetailsClick(warehouse)}
                >
                  Подробнее
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className={s.delete}
                  onClick={() => handleDeleteConfirmation(warehouse)}
                >
                  <img src="/assets/icons/delete.svg" alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={Math.ceil(warehouses.count / 6)}
          initialPage={currentPage}
          onChange={(page) => setCurrent(page)}
        />
      </div>
      {selectedWarehouse && (
        <WarehousesModal
          warehouse={selectedWarehouse}
          onClose={() => setSelectedWarehouse(null)}
        />
      )}
      {showMultipleDeleteConfirm && (
        <>
          <div className={s.modalBackdrop}></div>
          <div className={s.confirmDeleteModal}>
            <p>Вы уверены, что хотите удалить все выбранные товары?</p>
            <div>
              <button
                onClick={() => {
                  handleMultipleDelete();
                  setShowMultipleDeleteConfirm(false);
                }}
              >
                Да
              </button>
              <button onClick={() => setShowMultipleDeleteConfirm(false)}>
                Отмена
              </button>
            </div>
          </div>
        </>
      )}
      {confirmDeleteWarehouse && (
        <>
          <div className={s.modalBackdrop}></div>
          <div className={s.confirmDeleteModal}>
            <p>Вы уверены, что хотите удалить этот товар?</p>
            <div>
              <button
                onClick={() => handleSingleDelete(confirmDeleteWarehouse.id)}
              >
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
