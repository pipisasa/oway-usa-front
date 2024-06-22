import React, { useState } from "react";
import s from "@/styles/pages/user/MyWarehouse.module.scss";
import Loading from "@/components/shared/admin/Loading";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";
import WarehouseProductsModalV2 from "@/components/shared/admin/modals/WarehousesProductModalV2";
import UserParcelsSearch from "@/components/partials/userParcels/UserParcelsSearch";

export default function UserWarehouses() {
  const { warehouses, loading, error, deleteWarehouse } = useUserWarehouses();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  console.log(warehouses);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <div className={s.filter}>
        <UserParcelsSearch />
      </div>
      <div className={s.my}>
        <table>
          <thead>
            <tr>
              <th>ID пользователя</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Склад</th>
              <th>Трек номер</th>
              <th>Курьерская служба</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td style={{ fontWeight: "bold" }}>
                  #{warehouse.user.unique_id}
                </td>
                <td>{warehouse.user.first_name}</td>
                <td>{warehouse.user.last_name}</td>
                <td>{warehouse.warehouse}</td>
                <td>{warehouse.tracking_number}</td>
                <td>{warehouse.courier_service}</td>
                <td className={s.actions}>
                  <button
                    className={s.delete}
                    onClick={() => deleteWarehouse(warehouse.id)}
                  >
                    <img src="/assets/icons/delete.svg" alt="delete" />
                  </button>
                  <WarehouseProductsModalV2
                    clientId={warehouse.user.unique_id}
                    warehouseId={warehouse.id}
                    warehouse={warehouse.warehouse}
                    comments={warehouse.comments}
                    tracking_number={warehouse.tracking_number}
                    closeModal={closeModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
