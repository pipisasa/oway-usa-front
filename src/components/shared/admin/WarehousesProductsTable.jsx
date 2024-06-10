import React, { useState, useEffect } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import WarehousesModal from "./modals/WarehousesModal";

const setItemWithoutQuotes = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemWithoutQuotes = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
};

export default function WarehousesProductsTable({
  warehouses,
  deleteMultipleWarehouses,
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
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [localStorageFilters, setLocalStorageFilters] = useState({
    dateInput: "",
    numberInput: "",
    weightInput: "",
    textInput: "",
    selectedChoice: "",
    nameInput: "",
    countryInput: "",
    statusInput: "",
  });

  useEffect(() => {
    const filters = {
      dateInput: getItemWithoutQuotes("dateInput"),
      numberInput: getItemWithoutQuotes("numberInput"),
      weightInput: getItemWithoutQuotes("weightInput"),
      textInput: getItemWithoutQuotes("textInput"),
      selectedChoice: getItemWithoutQuotes("selectedChoice"),
      nameInput: getItemWithoutQuotes("nameInput"),
      countryInput: getItemWithoutQuotes("countryInput"),
      statusInput: getItemWithoutQuotes("statusInput"),
    };
    setLocalStorageFilters(filters);
  }, []);

  useEffect(() => {
    const filters = {
      dateInput: getItemWithoutQuotes("dateInput"),
      numberInput: getItemWithoutQuotes("numberInput"),
      weightInput: getItemWithoutQuotes("weightInput"),
      textInput: getItemWithoutQuotes("textInput"),
      selectedChoice: getItemWithoutQuotes("selectedChoice"),
      nameInput: getItemWithoutQuotes("nameInput"),
      countryInput: getItemWithoutQuotes("countryInput"),
      statusInput: getItemWithoutQuotes("statusInput"),
    };
    setLocalStorageFilters(filters);
  }, [warehouses]);

  const filteredWarehouses = warehouses?.results?.filter((warehouse) => {
    const isMatching =
      (nameFilter === "" ||
        warehouse.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (statusFilter === "" || warehouse.status.name === statusFilter) &&
      (countryFilter === "" || warehouse.country.name === countryFilter) &&
      (localStorageFilters.nameInput === "" ||
        warehouse.name
          .toLowerCase()
          .includes(localStorageFilters.nameInput.toLowerCase())) &&
      (localStorageFilters.statusInput === "" ||
        warehouse.status.name === localStorageFilters.statusInput) &&
      (localStorageFilters.countryInput === "" ||
        warehouse.country.name === localStorageFilters.countryInput) &&
      (localStorageFilters.textInput === "" ||
        warehouse.name
          .toLowerCase()
          .includes(localStorageFilters.textInput.toLowerCase())) &&
      (localStorageFilters.weightInput === "" ||
        warehouse.weight
          .toString()
          .includes(localStorageFilters.weightInput)) &&
      (localStorageFilters.numberInput === "" ||
        warehouse.track_number.includes(localStorageFilters.numberInput)) &&
      (localStorageFilters.dateInput === "" ||
        new Date(warehouse.date)
          .toLocaleDateString()
          .includes(localStorageFilters.dateInput));
    return isMatching;
  });

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleDeleteConfirmation = (warehouse) => {
    setConfirmDeleteWarehouse(warehouse);
  };

  const handleMultipleDelete = () => {
    console.log("Deleting selected warehouses with ids:", selectedWarehouses);
    deleteMultipleWarehouses(selectedWarehouses);
    setSelectedWarehouses([]);
  };

  const toggleWarehouseSelection = (id) => {
    setSelectedWarehouses((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const toggleSelectAllWarehouses = () => {
    if (selectedWarehouses.length === filteredWarehouses.length) {
      setSelectedWarehouses([]);
    } else {
      setSelectedWarehouses(filteredWarehouses.map((wh) => wh.id));
    }
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
                onChange={toggleSelectAllWarehouses}
                checked={
                  selectedWarehouses.length === filteredWarehouses?.length
                }
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
              <button className={s.all_delete} onClick={handleMultipleDelete}>
                <img src="/assets/icons/admin-icons/Delete.svg" alt="" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses?.map((warehouse) => (
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
          total={warehouses?.total_pages}
          initialPage={current}
          onChange={(page) => setCurrent(page)}
        />
      </div>

      {selectedWarehouse && (
        <WarehousesModal
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
