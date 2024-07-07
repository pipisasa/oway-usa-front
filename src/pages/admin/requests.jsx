import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminRequests.module.scss";
import { Pagination } from "@nextui-org/react";
import useRequests from "@/hooks/admin/useRequests";
import RequestsModal from "@/components/shared/admin/modals/RequestsModal";
import Loading from "@/components/shared/admin/Loading";
import ImageModal from "@/components/shared/admin/modals/ImageModal";
import RequestsAdminSearch from "@/components/partials/requestsSelect/RequestsAdminSearch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function IncommingRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, deleteRequest, setFilters, fetchData } =
    useRequests(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [requestIdToDelete, setRequestIdToDelete] = useState(null);
  const [filters, setFiltersState] = useState({
    name_of_purchase: "",
    created_at: "",
    email: "",
    price: "",
    is_paid: "",
    request_status: "",
  });

  useEffect(() => {
    fetchData({ currentPage, ...filters });
  }, [currentPage, filters]);

  const handleOpenModal = (requestData) => {
    setCurrentRequestData(requestData);
    setIsModalVisible(true);
  };

  const handleImageClick = (src) => {
    setImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setRequestIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRequestIdToDelete(null);
  };

  const confirmDelete = () => {
    if (requestIdToDelete) {
      deleteRequest(requestIdToDelete);
    }
    closeDeleteModal();
  };

  const handleFilterChange = (key, value) => {
    setFiltersState((prevFilters) => ({ ...prevFilters, [key]: value }));
    setFilters({ [key]: value });
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={s.requests}>
      {isModalVisible && (
        <RequestsModal
          data={currentRequestData}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      {isImageModalOpen && <ImageModal src={imageSrc} onClose={closeModal} />}
      <div className={s.filters}>
        <RequestsAdminSearch onFilterChange={handleFilterChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название товара</th>
            <th>Цена ($)</th>
            <th>Дата отправки заявки</th>
            <th>Статус запроса</th>
            <th>Статус оплаты</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.results.length > 0 ? (
            data.results.map((request) => (
              <tr key={request.id}>
                <td className={s.purchase_image}>
                  <img
                    src={`${API_URL}${request.purchase_image}`}
                    alt="Product"
                    onClick={() =>
                      handleImageClick(`${API_URL}${request.purchase_image}`)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{request.name_of_purchase}</td>
                <td>
                  {request.price === null ? "Цена не указана" : request.price}
                </td>
                <td>{request.created_at}</td>
                <td>
                  {request.status_request ? (
                    <p style={{ color: "#06DB02" }}>Обработан</p>
                  ) : (
                    <p style={{ color: "red" }}>В ожидании</p>
                  )}
                </td>
                <td>
                  {request.payment_confirmation ? (
                    <p style={{ color: "#06DB02" }}>Оплачено</p>
                  ) : (
                    <p style={{ color: "red" }}>Не оплачено</p>
                  )}
                </td>
                <td className="flex">
                  <button
                    className={s.btn}
                    onClick={() => handleOpenModal(request)}
                  >
                    <img src="/assets/icons/icon.svg" alt="more" />
                  </button>
                  <button
                    className={s.delete}
                    onClick={() => openDeleteModal(request.id)}
                  >
                    <img src="/assets/icons/delete.svg" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <p className="maps">В ожидании пополнения товара!</p>
              </td>
            </tr>
          )}
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
      {isDeleteModalOpen && (
        <div className={s.deleteModalOverlay}>
          <div className={s.deleteModal}>
            <h2>Вы уверены, что хотите удалить эту запись?</h2>
            <div className={s.modalButtons}>
              <button onClick={confirmDelete}>Да</button>
              <button onClick={closeDeleteModal}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
