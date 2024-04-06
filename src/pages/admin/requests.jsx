import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminRequests.module.scss";
import { Pagination } from "@nextui-org/react";
import useRequests from "@/hooks/admin/useRequests";
import RequestsModal from "@/components/shared/admin/modals/RequestsModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function IncommingRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useRequests(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);

  const handleOpenModal = (requestData) => {
    setCurrentRequestData(requestData);
    setIsModalVisible(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={s.requests}>
      {isModalVisible && (
        <RequestsModal
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
            <th>Дата отправки заявки</th>
            <th>Статус запроса</th>
            <th>Статус оплаты</th>
            <th>Подробнее</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((request) => (
            <tr key={request.id}>
              <td className={s.purchase_image}>
                <img
                  src={`${API_URL}${request.purchase_image}`}
                  alt="Product"
                />
              </td>
              <td>{request.name_of_purchase}</td>
              <td>
                {request.price === null ? "Цена не указана" : request.price}
              </td>
              <td>{request.created_at}</td>
              <td>
                {request.request_status === false ? (
                  <p style={{ color: "red" }}>В ожидании</p>
                ) : (
                  <p style={{ color: "#06DB02" }}>Обработан</p>
                )}
              </td>
              <td>
                {request.is_paid === false ? (
                  <p style={{ color: "red" }}>Не оплачено</p>
                ) : (
                  <p style={{ color: "#06DB02" }}>Оплечено</p>
                )}
              </td>
              <td>
                <button
                  className={s.btn}
                  onClick={() => handleOpenModal(request)}
                >
                  <img src="/assets/icons/icon.svg" alt="more" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.pagination}>
        <Pagination
          variant="bordered"
          total={Math.ceil(data.count / 5)}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}