import React, { useState, useEffect } from "react";
import s from "@/styles/components/shared/UsersProductTable.module.scss";
import { Pagination } from "@nextui-org/react";
import useWarehousesUser from "@/hooks/user/useWarehousesUser";
import OnTheWayModal from "../../admin/modals/OnTheWayModal";
import ImageModal from "../../admin/modals/ImageModal";
import { API_URL } from "@/constants";

export default function OnTheWay() {
  const [currentPage, setCurrentPage] = useState(1);
  const { warehouses, isLoading, fetchWarehouses } =
    useWarehousesUser(currentPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestData, setCurrentRequestData] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  useEffect(() => {
    fetchWarehouses(currentPage);
  }, [currentPage]);

  const handleOpenModal = (item) => {
    setCurrentRequestData(item);
    setIsModalVisible(true);
  };

  const handleImageClick = (src) => {
    setCurrentImageSrc(`${API_URL}${src}`);
    setIsImageModalVisible(true);
  };

  return (
    <>
      <div className={s.product_table}>
        {isModalVisible && (
          <OnTheWayModal
            data={currentRequestData}
            onClose={() => setIsModalVisible(false)}
          />
        )}
        {isImageModalVisible && (
          <ImageModal
            src={currentImageSrc}
            isOpen={isImageModalVisible}
            onClose={() => setIsImageModalVisible(false)}
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
            {warehouses?.results?.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    width={64}
                    src={`${API_URL}${item.image}`}
                    alt="product img"
                    onClick={() => handleImageClick(item.image)}
                    style={{ cursor: "pointer" }}
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
                    <img width={36} src="/assets/icons/icon.svg" alt="more" />
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
          total={warehouses?.total_pages}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
