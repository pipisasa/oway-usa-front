import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import Modal from "../Modal";
import { RxCross2 } from "react-icons/rx";
import Loading from "./Loading";
import { Pagination } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

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
  const [formData, setFormData] = useState({
    address: "",
    articul: "",
    comments: "",
    name: "",
    image: "",
    track_number: "",
    unique_id_user: "",
    url: "",
  });
  const [currentItem, setCurrentItem] = useState(null);
  const accessToken = getCookie("accessToken");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);

  const updateData = async () => {
    if (!selectedWarehouse || !selectedWarehouse.id) {
      console.error("Selected warehouse or warehouse ID is missing.");
      return;
    }
    try {
      const response = await axios.put(
        `https://api-owayusa.com/api/warehouses/update/${selectedWarehouse.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Обновленные данные:", response.data);
      handleCloseModal(); // Закрыть модальное окно после обновления
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
    }
  };

  const filteredWarehouses = warehouses?.results?.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      warehouse.track_number.toString().includes(trackNumberFilter) &&
      (statusFilter === "" || warehouse.status.name === statusFilter) &&
      (countryFilter === "" || warehouse.country.name === countryFilter)
  );

  console.log(warehouses);

  const handleDetailsClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setFormData(warehouse);
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
          <Modal isOpen={!!selectedWarehouse} onClose={handleCloseModal}>
            <div className={s.modalContent}>
              <div className={s.btn_center}>
                <button onClick={handleCloseModal} className={s.close_btn}>
                  <RxCross2 size={20} />
                </button>
              </div>
              <h3>Редактирование склада</h3>
              <input
                type="text"
                name="name"
                placeholder="Название"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="articul"
                placeholder="Артикул"
                value={formData.articul || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Адрес"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="track_number"
                placeholder="Трек-номер"
                value={formData.track_number || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="unique_id_user"
                placeholder="Уникальный ID пользователя"
                value={formData.unique_id_user || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={formData.url || ""}
                onChange={handleChange}
              />
              <textarea
                name="comments"
                placeholder="Комментарии"
                value={formData.comments || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Ссылка на изображение"
                value={formData.image || ""}
                onChange={handleChange}
              />
              <button onClick={updateData}>Сохранить изменения</button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
