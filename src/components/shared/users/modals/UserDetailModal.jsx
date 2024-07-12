import React, { useState, useEffect } from "react";
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
  const [created_at, setcreated_at] = useState(userData.created_at);
  const [address, setaddress] = useState(userData.address);
  const [passportFront, setPassportFront] = useState(userData.front_image);
  const [passportBack, setPassportBack] = useState(userData.back_image);
  const [isEditing, setIsEditing] = useState(false);
  const [viewImage, setViewImage] = useState(null);
  const [viewImageType, setViewImageType] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);

  const handleImageChange = async (event, type) => {
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

      const accessToken = getCookie("accessToken");
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);
      formData.append("created_at", created_at);
      formData.append("address", address);
      formData.append(type, file);

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

      if (!response.ok) {
        console.error("Failed to update", await response.text());
      }
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
    formData.append("created_at", created_at);
    formData.append("address", address);

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
    setcreated_at(userData.created_at);
    setaddress(userData.address);
    setPassportFront(userData.front_image);
    setPassportBack(userData.back_image);
    setIsEditing(false);
  };

  const handleViewImage = (image, type) => {
    setViewImage(image);
    setViewImageType(type);
  };

  const closeModal = () => {
    setViewImage(null);
    setViewImageType(null);
  };

  const fetchUserAddresses = async () => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(
        `https://api-owayusa.com/api/address/list/?user=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAddressData(data.results);
      console.log(data.results, 11111);
      setIsAddressModalOpen(true);
    } catch (error) {
      console.error("Error fetching user address data:", error);
    }
  };

  return (
    <form className={s.modal} onSubmit={editUser}>
      <Modal isOpen={userData}>
        <div className={s.modalContent}>
          <div className={s.btn_center}>
            <button className={s.close_btn} onClick={close}>
              <RxCross2 size={20} />
            </button>
          </div>
          <h3>Данные пользователя</h3>
          <div className={s.form}>
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
                <label>Дата регистрации</label>
                <input
                  type="text"
                  value={created_at}
                  onChange={(e) => setcreated_at(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <button type="button" onClick={fetchUserAddresses}>
                  Все адреса
                </button>
              </div>

              <div>
                {!userData.front_image && (
                  <>
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
                  </>
                )}
                {imagePreviews.front_image && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(
                          imagePreviews.front_image,
                          "front_image"
                        )
                      }
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
                {userData.front_image && !imagePreviews.front_image && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(userData.front_image, "front_image")
                      }
                      // disabled={!isEditing}
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
              </div>
              <div>
                {!userData.back_image && (
                  <>
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
                  </>
                )}
                {imagePreviews.back_image && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(imagePreviews.back_image, "back_image")
                      }
                    >
                      Посмотреть картинку
                    </button>
                  </>
                )}
                {userData.back_image && !imagePreviews.back_image && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewImage(userData.back_image, "back_image")
                      }
                      // disabled={!isEditing}
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
          </div>
        </div>
      </Modal>
      {viewImage && (
        <div className={s.modal1}>
          <Modal isOpen={true} onClose={closeModal}>
            <div className={s.modalContent1}>
              {viewImageType === "front_image" && (
                <h3>Лицевая сторона паспорта</h3>
              )}
              {viewImageType === "back_image" && (
                <h3>Обратная сторона паспорта</h3>
              )}

              <div className={s.image}>
                <img
                  src={
                    viewImage instanceof File
                      ? URL.createObjectURL(imagePreviews)
                      : `https://api-owayusa.com${viewImage}`
                  }
                  alt="Image Ptrytyrtyrtreview"
                />
              </div>
              {viewImageType === "front_image" && (
                <div className={s.qwe}>
                  <button onClick={closeModal} className={s.buttonclose}>
                    Вернуться
                  </button>
                  {imagePreviews.front_image && (
                    <button
                      type="submit"
                      onClick={closeModal}
                      className={s.buttonclose}
                    >
                      Сохранить
                    </button>
                  )}
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
                </div>
              )}
              {viewImageType === "back_image" && (
                <div className={s.qwe}>
                  <button onClick={closeModal} className={s.buttonclose}>
                    Вернуться
                  </button>
                  <button type="submit" className={s.buttonclose}>
                    Сохранить
                  </button>
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
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
      {isAddressModalOpen && (
        <Modal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
        >
          <div className={s.modalContent}>
            <div>
              <h3>Адреса пользователя</h3>
              <button onClick={() => setIsAddressModalOpen(false)}>
                Закрыть
              </button>
            </div>
            {addressData.length > 0 ? (
              <div className={s.addressBlock11}>
                {addressData.map((address) => (
                  <div className={s.addressBlock} key={address.id}>
                    <div>
                      <img src="/assets/icons/user-icons/user.svg" alt="" />
                      <p>{address.full_name}</p>
                    </div>
                    <div>
                      <img src="/assets/icons/user-icons/city.svg" alt="" />
                      <p>
                        {address.country}, {address.city}
                      </p>
                    </div>
                    <div>
                      <img
                        src="/assets/icons/user-icons/maps-and-flags.svg"
                        alt=""
                      />
                      <p>{address.address}</p>
                    </div>

                    <div>
                      <img
                        src="/assets/icons/user-icons/phone-call.svg"
                        alt=""
                      />
                      <p>{address.phone_number}</p>
                    </div>
                    <div>
                      <img src="/assets/icons/user-icons/email.svg" alt="" />
                      <p>{address.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Адреса не найдены.</p>
            )}
          </div>
        </Modal>
      )}
    </form>
  );
}
