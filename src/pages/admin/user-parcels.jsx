import React, { useState, useEffect } from "react";
import s from "@/styles/pages/user/MyWarehouse.module.scss";
import Loading from "@/components/shared/admin/Loading";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";
import WarehouseProductsModalV2 from "@/components/shared/admin/modals/WarehousesProductModalV2";
import UserParcelsSearch from "@/components/partials/userParcels/UserParcelsSearch";

const deliveryServices = [
  { name: "Fedex", id: 1 },
  { name: "USPS", id: 2 },
  { name: "UPS", id: 3 },
  { name: "DHL", id: 4 },
  { name: "Lasership", id: 5 },
  { name: "Landmark", id: 6 },
  { name: "Amazon", id: 7 },
];

const predefinedWarehouses = [
  { id: 14, name: "Чикаго" },
  { id: 28, name: "Delaware" },
  { id: 25, name: "Бишкек" },
  { id: 24, name: "Стамбул" },
];

const getCourierServiceName = (id) => {
  const service = deliveryServices.find(
    (service) => service.id === parseInt(id, 10)
  );
  return service ? service.name : "Unknown";
};

const getWarehouseNameById = (id) => {
  const warehouse = predefinedWarehouses.find(
    (warehouse) => warehouse.id === parseInt(id, 10)
  );
  return warehouse ? warehouse.name : "Unknown";
};

export default function UserWarehouses() {
  const { warehouses, loading, error, setFilters, deleteWarehouse } =
    useUserWarehouses();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  useEffect(() => {
    if (warehouses) {
    }
  }, [warehouses]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  console.log(warehouses);

  return (
    <section>
      <div className={s.filter}>
        <UserParcelsSearch onFilterChange={handleFilterChange} />
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
                <td>{getWarehouseNameById(warehouse.warehouse)}</td>
                <td>{warehouse.tracking_number}</td>
                <td>{getCourierServiceName(warehouse.courier_service)}</td>
                <td className={s.actions}>
                  <button
                    className={s.delete}
                    onClick={() => deleteWarehouse(warehouse.id)}
                  >
                    <img src="/assets/icons/delete.svg" alt="delete" />
                  </button>
                  <WarehouseProductsModalV2
                    address={warehouse.address}
                    clientId={warehouse.user.unique_id}
                    country_of_origin1={warehouse.country_of_origin}
                    country_of_destination1={warehouse.country_of_destination}
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
