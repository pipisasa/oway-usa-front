import React from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import {
  EditModal,
  DeleteModal,
  IllinoisModalEdit,
} from "@/components/partials/IllinoisModalEdit";
import { useIllinois } from "@/hooks/admin/useAdminIllinois";

export default function Illinois() {
  const {
    data,
    loading,
    error,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    currentItem,
    setCurrentItem,
    updateData,
    deleteData,
  } = useIllinois();

  const handleUpdateClick = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setDeleteModalOpen(true);
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
              <th>ФИО</th>
              <th>Адрес</th>
              <th>Telegram</th>
              <th>Номер телефона</th>
              <th>Вес груза</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.full_name}</td>
                <td>{item.address}</td>
                <td>{item.telegram}</td>
                <td>{item.phone_number}</td>
                <td>{item.cargo_weight}</td>
                <td className={s.update_delete}>
                  <button
                    onClick={() => handleUpdateClick(item)}
                    className={s.btn}
                  >
                    Обновить
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className={s.btn}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <IllinoisModalEdit
          item={currentItem}
          onClose={() => setModalOpen(false)}
          onSave={updateData}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => deleteData(currentItem.id)}
        />
      )}
    </div>
  );
}
