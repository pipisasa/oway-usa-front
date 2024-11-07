import React, { useState } from "react";
import axios from "axios";
import s from "@/styles/components/shared/modals/EditModal.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import Arrow from "../../ui/Arrow";
import { API_URL } from "@/constants";

const statusOptions = [
  { id: 6, name: "Получен, готов к отправке" },
  { id: 5, name: "Ваша посылка в пути" },
  { id: 4, name: "Поступил в ПВЗ, готов к выдаче" },
  { id: 3, name: "Отправлено курьерской службой" },
];

const formatDateInput = (value) => {
  let numbers = value.replace(/[^\d]/g, "");

  if (numbers.length >= 2) {
    numbers = numbers.substring(0, 2) + "." + numbers.substring(2);
  }
  if (numbers.length >= 5) {
    numbers = numbers.substring(0, 5) + "." + numbers.substring(5);
  }

  return numbers.substring(0, 10);
};

export default function EditModal({ onClose, selectedWarehouses }) {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0].id);
  const [dateSent, setDateSent] = useState("");
  const [dateArrived, setDateArrived] = useState("");

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleDateSentChange = (e) => {
    setDateSent(formatDateInput(e.target.value));
  };

  const handleDateArrivedChange = (e) => {
    setDateArrived(formatDateInput(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ids: selectedWarehouses,
      status: selectedStatus,
      date_sent: dateSent,
      date_arrived: dateArrived,
    };

    const accessToken = getCookie("accessToken");

    try {
      await axios.patch(`${API_URL}/api/warehouses/product/update/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
          <div className={s.formGroup}>
            <label htmlFor="dateSent">Дата отправки</label>
            <input
              type="text"
              id="dateSent"
              name="dateSent"
              value={dateSent}
              onChange={handleDateSentChange}
            />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="dateArrived">Дата прибытия</label>
            <input
              type="text"
              id="dateArrived"
              name="dateArrived"
              value={dateArrived}
              onChange={handleDateArrivedChange}
            />
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
