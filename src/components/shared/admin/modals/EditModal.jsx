import React, { useState } from "react";
import axios from "axios";
import s from "@/styles/components/shared/modals/EditModal.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import Arrow from "../../ui/Arrow";

const API_URL = "https://api-owayusa.com";

const statusOptions = [
  { id: 6, name: "Получен на складе" },
  { id: 5, name: "Отправлен" },
  { id: 4, name: "Получен в ПВЗ" },
  { id: 3, name: "Готов к выдаче" },
  { id: 7, name: "Отправлено курьерской службой" },
  { id: 8, name: "Доставлено" },
];

export default function EditModal({ onClose, selectedWarehouses }) {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0].id);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ids: selectedWarehouses,
      status: selectedStatus,
    };

    const accessToken = getCookie("accessToken");

    try {
      await axios.patch(`${API_URL}/api/warehouses/product/update/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Form submitted:", data);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Ошибка 400: Неверный запрос", error);
        window.location.reload();
      } else {
        console.error("Ошибка при обновлении данных:", error);
      }
    }
  };

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <form onSubmit={handleSubmit}>
          <h2>Изменение выбранных чекбоксов</h2>
          <div className={s.formGroup}>
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div className={s.buttons}>
            <button type="button" onClick={onClose} className={s.one}>
              Отклонить
            </button>
            <button type="submit" className={s.submitButton}>
              Принять
              <Arrow />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
