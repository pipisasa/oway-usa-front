import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import useWarehouses from "../../../hooks/admin/useWarehouses";
import Modal from "../Modal";
import { RxCross2 } from "react-icons/rx";

export default function WarehousesProductsTable() {
  const { warehouses, fetchWarehouses, isLoading, error } = useWarehouses();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);
  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleCloseModal = () => {
    setSelectedWarehouse(null);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
              <td>{warehouse?.status?.name}</td>
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
