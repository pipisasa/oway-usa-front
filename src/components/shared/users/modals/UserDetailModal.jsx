import React, { useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { RxCross2 } from "react-icons/rx";
import Modal from "../../Modal";

export default function UserDetailModal({ userData, close }) {
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
  const [passportFront, setPassportFront] = useState(userData.passport_front);
  const [passportBack, setPassportBack] = useState(userData.passport_back);

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
          <form className={s.form} action="">
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
                <label>Лицевая сторона паспорта</label>
                <input
                  type="text"
                  value={passportFront}
                  onChange={(e) => setPassportFront(e.target.value)}
                />
              </div>
              <div>
                <label>Обратная сторона паспорта</label>
                <input
                  type="text"
                  value={passportBack}
                  onChange={(e) => setPassportBack(e.target.value)}
                />
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
