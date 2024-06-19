import React, { useState } from "react";
import axios from "axios";
import s from "@/styles/admin/RequestsModal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import { RxCross1 } from "react-icons/rx";
import { getCookie } from "@/utils/cookieHelpers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import AdminCustomSelect from "@/components/partials/AdminCustomSelect";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WarehousesModal({ onClose, warehouse }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(warehouse.status.id);
  const [originalStatus, setOriginalStatus] = useState(warehouse.status.id);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [countries, setCountries] = useState([
    { id: 3, name: "США" },
    { id: 4, name: "Турция" },
    { id: 8, name: "Кыргызстан" },
    { id: 9, name: "Россия" },
  ]);

  const [previewImageUrl, setPreviewImageUrl] = useState(
    API_URL + warehouse.image
  );

  const handleStatusClick = (statusId) => {
    setCurrentStatus(statusId);
    setShowStatusOptions(false);
  };

  const [editData, setEditData] = useState({
    name: warehouse.name,
    unique_id_user: warehouse.unique_id_user,
    price: warehouse.price,
    weight: warehouse.weight,
    height: warehouse.height,
    length: warehouse.length,
    width: warehouse.width,
    date_sent: warehouse.date_sent,
    date_arrived: warehouse.date_arrived,
    address: warehouse.address,
    comments: warehouse.comments,
    status: currentStatus,
    country_of_origin: warehouse.country_of_origin.id,
    country_of_destination: warehouse.country_of_destination.id,
  });

  const statuses = [
    { id: 6, name: "Получен на складе," },
    { id: 5, name: "Отправлен," },
    { id: 4, name: "Получен в ПВЗ," },
    { id: 3, name: "Готов к выдаче," },
    { id: 7, name: "Отправлено курьерской службой," },
    { id: 8, name: "Доставлено," },
  ];

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: warehouse.name,
      unique_id_user: warehouse.unique_id_user,
      price: warehouse.price,
      weight: warehouse.weight,
      width: warehouse.width,
      height: warehouse.height,
      length: warehouse.length,
      date_sent: warehouse.date_sent,
      date_arrived: warehouse.date_arrived,
      country_of_origin: warehouse.country_of_origin.id,
      country_of_destination: warehouse.country_of_destination.id,
      address: warehouse.address,
      comments: warehouse.comments,
      status: currentStatus,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    Object.keys(editData).forEach((key) => {
      if (key === "status" && currentStatus !== originalStatus) {
        formData.append(key, currentStatus);
      } else {
        formData.append(key, editData[key]);
      }
    });

    const accessToken = getCookie("accessToken");
    try {
      await axios.patch(
        `${API_URL}/api/warehouses/product/update/${warehouse.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const formatDateInput = (value) => {
    let numbers = value.replace(/[^\d]/g, "");

    if (numbers.length >= 2) {
      numbers = numbers.substring(0, 2) + "." + numbers.substring(2);
    }
    if (numbers.length >= 5) {
      numbers = numbers.substring(0, 5) + "." + numbers.substring(5);
    }

    return numbers.substring(0, 10);
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setEditData({ ...editData, [id]: formatDateInput(value) });
  };

  console.log(editData.country_of_origin.name);
  return (
    <div
      className={s.modal_backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className={s.request_modal}>
        <button onClick={onClose} className={s.exit}>
          <RxCross1 size={22} />
        </button>
        <h2>Информация о посылке</h2>
        <div className={s.request_blocks}>
          <div className={s.left_block}>
            <div className={s.input_label}>
              <div className={s.edited}>
                <label>Фотография</label>
                <label htmlFor="fileInput" className={s.change_img}>
                  <img
                    className={s.edit_img}
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    style={{ border: "none", width: "20px" }}
                  />
                </label>
              </div>

              <img onClick={onOpen} src={previewImageUrl} alt="Preview img" />
              <input
                id="fileInput"
                className="hidden"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className={s.input_label}>
              <label htmlFor="">Статус посылки</label>

              <button
                onClick={() => setShowStatusOptions(!showStatusOptions)}
                className={s.button_default}
              >
                {statuses.find((status) => status.id === currentStatus)?.name ||
                  warehouse.status.name}
              </button>
              {showStatusOptions && (
                <div className={s.select_status}>
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusClick(status.id)}
                    >
                      {status.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <form className={s.form} encType="multipart/form-data">
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="name">Название</label>
                <input
                  id="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="unique_id_user">ID пользователя</label>
              <input
                id="unique_id_user"
                value={`#${warehouse.unique_id_user}`}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="price">Цена ($)</label>
                <input
                  id="price"
                  value={editData.price || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="weight">Вес (кг)</label>
                <input
                  id="weight"
                  value={editData.weight || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="width">Ширина</label>
                <input
                  id="width"
                  value={editData.width || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="height">Длина</label>
                <input
                  id="height"
                  value={editData.height || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="length">Высота</label>
                <input
                  id="length"
                  value={editData.length || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="date_sent">Дата отправки</label>
                <input
                  type="text"
                  id="date_sent"
                  placeholder="dd.mm.yyyy"
                  value={editData.date_sent || ""}
                  onChange={handleDateChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className={s.input_label}>
                <label htmlFor="date_arrived">Дата прибытия</label>
                <input
                  type="text"
                  id="date_arrived"
                  placeholder="dd.mm.yyyy"
                  value={editData.date_arrived || ""}
                  onChange={handleDateChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className={s.flex_inputs}>
              <div className={s.input_label}>
                <label htmlFor="country_of_origin">Склады отправки</label>
                <select
                  id="country_of_origin"
                  name="country_of_origin"
                  value={editData.country_of_origin || ""}
                  onChange={handleSelectChange}
                  disabled={!isEditing}
                >
                  <option value="">Выберите страну</option>
                  {countries.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={s.input_label}>
                <label htmlFor="country_of_destination">Склады прибытия</label>
                <select
                  id="country_of_destination"
                  name="country_of_destination"
                  value={editData.country_of_destination || ""}
                  onChange={handleSelectChange}
                  disabled={!isEditing}
                >
                  <option value="">Выберите страну</option>
                  {countries.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={s.input_label}>
              <label htmlFor="comments">Комментарий</label>
              <input
                id="comments"
                value={editData.comments || "Не указан"}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            {!isEditing ? (
              <button
                type="button"
                className={s.submit_btn}
                onClick={handleEdit}
              >
                Редактировать
              </button>
            ) : (
              <div className={s.submit_btns}>
                <button
                  className={s.exit_btn}
                  type="button"
                  onClick={handleCancel}
                >
                  Отмена
                </button>
                <button
                  className={s.submit_btn}
                  type="button"
                  onClick={handleSave}
                >
                  Сохранить
                </button>
              </div>
            )}
          </form>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <img src={previewImageUrl} alt="картинка" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Закрыть
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </div>
  );
}
