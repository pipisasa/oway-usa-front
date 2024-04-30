import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { RxCross2 } from "react-icons/rx";
import Modal from "../../Modal";

export default function UserDetailModal({ userData, close, editUser }) {
  const [imagePreviews, setImagePreviews] = useState({});
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
  const [passportFront, setPassportFront] = useState(userData.front_image);
  const [passportBack, setPassportBack] = useState(userData.back_image);

  const handleEdit = (e) => {
    e.preventDefault();
    const editedUserData = {
      id: userData.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      front_image: passportFront,
      back_image: passportBack,
    };
    editUser(editedUserData);
  };

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews({
        ...imagePreviews,
        [type]: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
          <form className={s.form} action="" onSubmit={handleEdit}>
            <div className={s.inputs}>
              <div>
                <label>Имя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label>Фамилия</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label>Почта</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Номер телефона</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  />
                   <img src="/assets/icons/selectimg.svg" alt="select img" />
                 <span>Выбрать картинку</span>
                  </label>
                {imagePreviews.front_image && (
                  <img src={imagePreviews.front_image} alt="Front Image Preview" />
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
                  />
                 <img src="/assets/icons/selectimg.svg" alt="select img" />
                 <span>Выбрать картинку</span>
                  </label>
                {imagePreviews.back_image && (
                  <img src={imagePreviews.back_image} alt="Back Image Preview" />
                )}
              </div>
            </div>
            <div>
              <button>Редактировать</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
