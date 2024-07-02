import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminRequests.module.scss";
import { Pagination } from "@nextui-org/react";
import Loading from "@/components/shared/admin/Loading";
import useMyRequests from "@/hooks/user/useMyRequest";
import UserRequestsModal from "@/components/shared/admin/modals/UserRequestModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function IncommingRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, deleteRequest, isDeleting, deleteError } =
    useMyRequests(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [filter, setFilter] = useState("");

  const handleOpenModal = (requestData) => {
    setCurrentRequestData(requestData);
    setIsModalVisible(true);
  };

  const filteredRequests = data.results.filter((request) =>
    request.name_of_purchase
      ?.toLowerCase()
      .includes(nameFilter.toLowerCase()) && filter === ""
      ? true
      : request.is_paid.toString() === filter
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={s.requests}>
      {isModalVisible && (
        <UserRequestsModal
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
            <th>Дата отправки заявки</th>
            <th>Статус запроса</th>
            <th>Статус оплаты</th>
            <th>Подробнее</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
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
                {request.payment_confirmation === null ? (
                  <p style={{ color: "red" }}>В ожидании</p>
                ) : (
                  <p style={{ color: "#06DB02" }}>Обработан</p>
                )}
              </td>
              <td>
                {request.payment_confirmation === null ? (
                  <p style={{ color: "red" }}>Не оплачено</p>
                ) : (
                  <p style={{ color: "#06DB02" }}>Оплачено</p>
                )}
              </td>
              <td className="flex items-center">
                <button
                  className={s.btn}
                  onClick={() => handleOpenModal(request)}
                >
                  <img src="/assets/icons/icon.svg" alt="more" />
                </button>
                <button
                  onClick={() => deleteRequest(request.id)}
                  className={s.delete}
                  disabled={isDeleting}
                >
                  <img src="/assets/icons/delete.svg" alt="delete" />
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
      {deleteError && <div>Error: {deleteError.message}</div>}
    </div>
  );
}
