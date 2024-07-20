import React, { useState, useEffect } from "react";
import s from "@/styles/components/shared/UsersProductTable.module.scss";
import { Pagination } from "@nextui-org/react";
import useWarehousesUser from "@/hooks/user/useWarehousesUser";
import OnTheWayModal from "../../admin/modals/OnTheWayModal";

export default function Delivered() {
  const [currentPage, setCurrentPage] = useState(1);
  const { warehouses, fetchWarehouses } = useWarehousesUser(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);

  const handleOpenModal = (item) => {
    setCurrentRequestData(item);
    setIsModalVisible(true);
  };
  const totalDelivere = Math.ceil(
    warehouses.results?.filter(
      (item) => item.status.name === "Отправлено курьерской службой",
      (item) => item.status.name === "Поступил в ПВЗ, готов к выдаче"
    )?.length
  );

  useEffect(() => {
    fetchWarehouses(currentPage);
  }, [currentPage]);

  const is_paid = true;
  return (
    <>
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
              <th>Цена ($)</th>
              <th>Дата покупки товара</th>
              <th>Статус оплаты</th>
              <th>Статус посылки</th>
              <th>Подробнее</th>
            </tr>
          </thead>
          <tbody>
            {warehouses?.results
              ?.filter(
                (item) => item.status.name === "Отправлено курьерской службой"
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      width={64}
                      src={`https://api-owayusa.com${item.image}`}
                      alt="product img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.created_at}</td>
                  <td>
                    {item.status_many === false ? (
                      <p style={{ color: "red" }}>Не оплачено</p>
                    ) : (
                      <p style={{ color: "#06DB02" }}>Оплачено</p>
                    )}
                  </td>
                  <td>{item.status.name}</td>
                  <td>
                    <button onClick={() => handleOpenModal(item)}>
                      <img src="/assets/icons/icon.svg" alt="more" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={totalDelivere > 5 ? totalDelivere / 5 : 1}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
