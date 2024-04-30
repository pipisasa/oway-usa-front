import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import { getCookie } from "@/utils/cookieHelpers";

export default function Illinois() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api-owayusa.com/api/otside_of_illinois/list/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setData(response.data.results || []);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError("Ошибка при получении данных");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(currentItem);
  const updateData = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://api-owayusa.com/api/otside_of_illinois/update_delete/${currentItem.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Обновленные данные:", response.data);
      setModalOpen(false); // Закрыть модальное окно после обновления
      window.location.reload()
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
    }
  };

  const handleUpdateClick = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const Modal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className={s.qwemodalBackdrop}>
        <div className={s.qwemodalContent}>
          <h2>Редактирование данных</h2>
          <p>ФИО</p>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <p>Адрес</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <p>Номер телефона</p>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <p>Вес груза</p>
          <input
            type="number"
            name="cargo_weight"
            value={formData.cargo_weight}
            onChange={handleChange}
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p>Telegram</p>
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
          />
          <p>Whatsapp</p>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <button onClick={() => onSave(formData)}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    );
  };

  return (
    <div className={s.warehouses_page}>
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Адрес</th>
              <th>Номер телефона</th>
              <th>Вес груза</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.full_name}</td>
                <td>{item.address}</td>
                <td>{item.phone_number}</td>
                <td>{item.cargo_weight}</td>
                <td>
                  <button
                    onClick={() => handleUpdateClick(item)}
                    className={s.btn}
                  >
                    Обновить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <Modal
          item={currentItem}
          onClose={() => setModalOpen(false)}
          onSave={updateData}
        />
      )}
    </div>
  );
}
