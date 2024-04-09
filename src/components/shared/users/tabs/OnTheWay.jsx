import React, { useState, useEffect } from "react";
import s from "@/styles/components/shared/UsersProductTable.module.scss";
import { Pagination } from "@nextui-org/react";
import useWarehousesUser from "@/hooks/user/useWarehousesUser";
import OnTheWayModal from "../../admin/modals/OnTheWayModal";

const PAGE_SIZE = 5;

export default function OnTheWay() {
  const [currentPage, setCurrentPage] = useState(1);
  const { warehouses, isLoading, fetchWarehouses } = useWarehousesUser(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);

  useEffect(() => {

    fetchWarehouses(currentPage)
  }, [currentPage]);

  const handleOpenModal = (item) => {
    setCurrentRequestData(item);
    setIsModalVisible(true);
  };

  const is_paid = true;
  return (
    <div className={s.product_table}>
      {isModalVisible && (
        <OnTheWayModal
          data={currentRequestData}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название товара</th>
            <th>Цена</th>
            <th>Дата покупки товара</th>
            <th>Статус оплаты</th>
            <th>Статус посылки</th>
          </tr>
        </thead>
        <tbody>
          {warehouses?.results?.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  width={64}
                  src={`http://18.222.184.72:8000/${item.image}`}
                  alt="product img"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>21.04.2024</td>
              <td>
                {is_paid === false ? (
                  <p style={{ color: "red" }}>Не оплачено</p>
                ) : (
                  <p style={{ color: "#06DB02" }}>Оплечено</p>
                )}
              </td>
              <td>{item.status.name}</td>
              <td>
                <button onClick={() => handleOpenModal(item)}>
                  <img width={36} src="/assets/icons/icon.svg" alt="more" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination
            variant="bordered"
            total={Math.ceil(warehouses.count / PAGE_SIZE)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
