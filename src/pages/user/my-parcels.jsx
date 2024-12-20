import React, { useEffect, useState } from "react";
import s from "@/styles/pages/user/MyWarehouse.module.scss";
import useWarehouses from "@/hooks/user/useWarehouses";
import Loading from "@/components/shared/admin/Loading";
import MyWarehousesEditModal from "@/components/shared/admin/modals/MyWarehousesEditModal";
import { Pagination } from "@nextui-org/react";
import { useAddresses } from "@/hooks/useAddresses";

const deliveryServices = [
  { name: "Fedex", id: 1 },
  { name: "USPS", id: 2 },
  { name: "UPS", id: 3 },
  { name: "Europe", id: 6 },
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

export default function MyWarehouses() {
  const { addressList } = useAddresses();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");
  const { products, isLoading, deleteWarehouses, fetchWarehouses, total } =
    useWarehouses(currentPage);

  useEffect(() => {
    fetchWarehouses(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdate = async (productId) => {
    try {
      setSelectedNotification(
        products?.find((product) => product.id === productId)
      );
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      setIsEditing(false);
      setSelectedNotification(null);
    }
  };

  return (
    <section className={s.my}>
      <div className={s.filters}>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input
            type="text"
            placeholder="Поиск по трек номеру"
            value={searchPhoneNumber}
            onChange={(e) => setSearchPhoneNumber(e.target.value)}
          />
        </div>
        <select
          className={s.select}
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">Страна отправки</option>
          <option value="США">США</option>
          <option value="Турция">Турция</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Склад</th>
            <th>Трeк номер</th>
            <th>Курьерская служба</th>
            <th>Комментарий</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {products
            ?.filter((product) =>
              product.tracking_number.includes(searchPhoneNumber)
            )
            .filter((product) =>
              countryFilter ? product.warehouse === countryFilter : true
            )
            .map((product) => (
              <tr key={product.id}>
                <td>{getWarehouseNameById(product.warehouse)}</td>
                <td>{product.tracking_number}</td>
                <td>{getCourierServiceName(product.courier_service)}</td>
                <td>
                  <button>{product.comments}</button>
                </td>
                <td className={s.actions}>
                  <button onClick={() => deleteWarehouses(product.id)}>
                    <img src="/assets/icons/delete.svg" alt="delete" />
                  </button>
                  <button onClick={() => handleUpdate(product.id)}>
                    <img src="/assets/icons/edit.svg" alt="edit" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isEditing && (
        <MyWarehousesEditModal
          isOpen={isModalOpen}
          onClose={() => toggleModal(false)}
          warehouse={selectedNotification}
        />
      )}

      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={total}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}
