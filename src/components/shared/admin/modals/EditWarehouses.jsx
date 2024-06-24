import React, { memo, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import ImageModal from "./ImageModal"; // Assuming this is the correct path
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const InputField = memo(function InputField({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
});

export default function EditWarehouses({ warehouse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: warehouse.name,
    address: warehouse.address,
    zip_code: warehouse.zip_code,
    phone_number: warehouse.phone_number,
    mail: warehouse.mail,
    city: warehouse.city,
    country: warehouse.country,
    unit: warehouse.unit,
    image: null, // New field for image
  });
  const accessToken = getCookie("accessToken");
  const toggleModal = () => setIsOpen(!isOpen);
  const toggleReviewModal = () => setIsReviewOpen(!isReviewOpen);
  const toggleImageModal = () => setIsImageModalOpen(!isImageModalOpen);
  const { updateWarehouse, loading, error } = useMainWarehouses();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCheckmarkClick = () => {
    toggleReviewModal();
  };

  const handleSendData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.country);
      formDataToSend.append("zip_code", formData.zip_code);
      formDataToSend.append("number", formData.phone_number);
      formDataToSend.append("email", formData.mail);
      formDataToSend.append("unit", formData.unit);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      // Log FormData entries to debug
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(
        "https://api-owayusa.com/api/contacts/create/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      toggleReviewModal();
      toggleModal();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateWarehouse(warehouse.id, formData);
    if (!error) {
      toggleModal();
    }
  };

  const handleDeleteImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setIsImageModalOpen(false); // Close the image modal when deleting
  };

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button onClick={toggleModal} className={c.edit}>
          <img src="/assets/icons/edit.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div onClick={handleCheckmarkClick}>
          <IoIosCheckmarkCircle />
        </div>
        <h3>Редактировать склад</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.second_input_block}>
              <InputField
                label="Название склада"
                name="name"
                placeholder="Введите название"
                value={formData.name}
                onChange={handleInputChange}
              />
              <div className={s.grid3}>
                <InputField
                  label="Адрес"
                  name="address"
                  placeholder="Введите адрес"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Zip code"
                  name="zip_code"
                  placeholder="Введите zip code"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Номер телефона"
                  name="phone_number"
                  placeholder="Введите номер телефона"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Почта"
                  name="mail"
                  placeholder="Введите почту"
                  value={formData.mail}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Город"
                  name="city"
                  placeholder="Введите город"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Страна"
                  name="country"
                  placeholder="Введите страну"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Единица"
                  name="unit"
                  placeholder="Введите единицу"
                  value={formData.unit}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn} disabled={loading}>
              Редактировать
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isReviewOpen} onClose={toggleReviewModal}>
        <div className={s.check}>
          <h3>Проверить данные склада</h3>
          <div className={s.check_text}>
            <p>
              <strong>Название склада:</strong> {formData.name}
            </p>
            <p>
              <strong>Адрес:</strong> {formData.address}
            </p>
            <p>
              <strong>Город:</strong> {formData.city}
            </p>
            <p>
              <strong>Страна:</strong> {formData.country}
            </p>
            <p>
              <strong>Zip code:</strong> {formData.zip_code}
            </p>
            <p>
              <strong>Номер телефона:</strong> {formData.phone_number}
            </p>
            <p>
              <strong>Почта:</strong> {formData.mail}
            </p>
            <p>
              <strong>Единица:</strong> {formData.unit}
            </p>
            {!formData.image && (
              <div>
                <label>Картинка</label>
                <input type="file" name="image" onChange={handleInputChange} />
              </div>
            )}
            {formData.image && (
              <p onClick={toggleImageModal} style={{ cursor: "pointer" }}>
                показать выбранную Картинку
              </p>
            )}
          </div>
        </div>
        <div className={s.btn_center}>
          <button onClick={handleSendData} className={s.submit_btn}>
            Отправить
          </button>
          <button onClick={toggleReviewModal} className={s.cancel_btn}>
            Отмена
          </button>
        </div>
      </Modal>
      {isImageModalOpen && formData.image && (
        <ImageModal
          src={URL.createObjectURL(formData.image)}
          onClose={toggleImageModal}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
}
