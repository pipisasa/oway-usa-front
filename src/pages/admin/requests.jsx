import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminRequests.module.scss";
import { Pagination } from "@nextui-org/react";
import useRequests from "@/hooks/admin/useRequests";
import RequestsModal from "@/components/shared/admin/modals/RequestsModal";

export default function IncommingRequests() {
  const { data, isLoading, error } = useRequests();

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
          {data.map((request, index) => (
            <tr key={index}>
              <td className={s.purchase_image}>
                <img src={request.purchase_image} alt="Product" />
              </td>
              <td>{request.name_of_purchase}</td>
              <td>
                {request.price === null ? "Цена не указана" : request.price}
              </td>
              <td>{request.request_date}</td>
              <td>{request.requestStatus}</td>
              <td>{request.paymentStatus}</td>
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
        <Pagination variant="bordered" total={10} initialPage={1} />
      </div>
    </div>
  );
}
