import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { RxCross2 } from "react-icons/rx";
import Modal from "../../Modal";
import { getCookie } from "@/utils/cookieHelpers";

export default function UserDetailModal({ userData, close }) {
  const [imagePreviews, setImagePreviews] = useState({});
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
  const [passportFront, setPassportFront] = useState(userData.front_image);
  const [passportBack, setPassportBack] = useState(userData.back_image);
  const [isEditing, setIsEditing] = useState(false);
  const [viewImage, setViewImage] = useState(null);

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);

    if (imagePreviews.front_image instanceof File) {
      formData.append("front_image", imagePreviews.front_image);
    }
    if (imagePreviews.back_image instanceof File) {
      formData.append("back_image", imagePreviews.back_image);
    }

    const response = await fetch(
      `https://api-owayusa.com/api/users/profile/${userData.id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const updatedUser = await response.json();
      setIsEditing(false);
    } else {
      console.error("Failed to update", await response.text());
    }
  };

  const handleCancel = () => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setEmail(userData.email);
    setPhoneNumber(userData.phone_number);
    setPassportFront(userData.front_image);
    setPassportBack(userData.back_image);
    setIsEditing(false);
  };

  const handleViewImage = (image) => {
    setViewImage(image);
  };

  const closeModal = () => {
    setViewImage(null);
  };

  return (
    <div className={s.modal}>
      <Modal isOpen={userData}>
        <div className={s.modalContent}>
          <div className={s.btn_center}>
            <button className={s.close_btn} onClick={close}>
              <RxCross2 size={20} />
            </button>
          </div>
          <h3>Данные пользователя</h3>
          <form className={s.form} onSubmit={editUser}>
            <div className={s.inputs}>
              <div>
                <label>Имя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Фамилия</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Почта</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Номер телефона</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label htmlFor="">Лицевая сторона паспорта</label>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    id="front_image"
                    name="front_image"
                    onChange={(e) => handleImageChange(e, "front_image")}
                    disabled={!isEditing}
                  />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </label>
                {imagePreviews.front_image && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleViewImage(imagePreviews.front_image)}
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
                {userData.front_image && !imagePreviews.front_image && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleViewImage(userData.front_image)}
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
              </div>
              <div>
                <label htmlFor="">Обратная сторона паспорта</label>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    id="back_image"
                    name="back_image"
                    onChange={(e) => handleImageChange(e, "back_image")}
                    disabled={!isEditing}
                  />
                  <img src="/assets/icons/selectimg.svg" alt="select img" />
                  <span>Выбрать картинку</span>
                </label>
                {imagePreviews.back_image && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleViewImage(imagePreviews.back_image)}
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
                {userData.back_image && !imagePreviews.back_image && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleViewImage(userData.back_image)}
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className={s.editing}>
                  <button className={s.edit} onClick={handleCancel}>
                    Отмена
                  </button>
                  <button type="submit">Сохранить</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)}>
                  Редактировать
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
      {viewImage && (
        <Modal isOpen={true} onClose={closeModal}>
          <div className={s.imageModalContent}>
            <img
              src={`https://api-owayusa.com${viewImage}`}
              alt="Image Preview"
            />
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
