import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Modal from "../Modal";
import { RxCross2 } from "react-icons/rx";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";

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

  console.log(filteredWarehouses);

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleCloseModal = () => {
    setSelectedWarehouse(null);
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
            <th>Название товара</th>
            <th>Дата отправки</th>
            <th>Адрес получения</th>
            <th>Вес (кг)</th>
            <th>Трек-номер</th>
            <th>Статус</th>
            <th>Комментарий</th>
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
              <td>{warehouse.date_sent}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.weight}</td>
              <td>{warehouse.track_number}</td>
              <td
                style={{
                  color:
                    warehouse.status.name === "Доставлено"
                      ? "#06DB02"
                      : "inherit",
                }}
              >
                {warehouse.status.name}
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
        <div className={s.modal}>
          <Modal isOpen={selectedWarehouse} onClose={handleCloseModal}>
            <div className={s.modalContent}>
              <div className={s.btn_center}>
                <button onClick={handleCloseModal} className={s.close_btn}>
                  <RxCross2 size={20} />
                </button>
              </div>
              <h3>Комментарий</h3>
              <p>{selectedWarehouse.comments}</p>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
