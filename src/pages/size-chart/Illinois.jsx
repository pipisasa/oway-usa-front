import React, { useState } from "react";
import s from "./modali.module.scss";
import useIllinois from "@/hooks/admin/useIllinois";

const Illinois = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { formData, handleSubmit, handleChange } = useIllinois();

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>
        Для клиентов за статой Иллинойс
      </button>
      {modalOpen && (
        <div className={s.modal}>
          <div className={s.modal_content}>
            <span className={s.close} onClick={closeModal}>
              &times;
            </span>
            {/* <div className={s.aaa}>
              <h2>Клиетам за приделами штата Иллинойс</h2>
              <p>
                ДЛя клиентов за приделами штата Иллинойс мы можем предоставить
                почтовую этикету от компании <b> FedEx от 20%-30% дешевле</b>
              </p>
              <br />
              <p>
                Обратите внимание, что получение вашей послыки на складе Skilk
                Road shipping с помощью FedEx является договором на дальнейшее
                использование услуг компании и не подлежит возврату или
                возмещению{" "}
              </p>
            </div> */}
            <form onSubmit={handleSubmit}>
              <label>ФИО</label>
              <input
                type="text"
                name="full_name"
                placeholder="ФИО"
                value={formData?.full_name}
                onChange={handleChange}
              />
              <br />
              <label>Адрес</label>
              <input
                type="text"
                name="address"
                placeholder="Адрес..."
                value={formData?.address}
                onChange={handleChange}
              />
              <br />
              <label>Номер телефона</label>
              <input
                type="number"
                name="phone_number"
                placeholder="Номер телефона..."
                value={formData?.phone_number}
                onChange={handleChange}
              />
              <br />
              <label>Вес груза</label>
              <input
                type="number"
                placeholder="Вес груза..."
                name="cargo_weight"
                value={formData?.cargo_weight}
                onChange={handleChange}
              />
              <br />
              <label>Электронная почта</label>
              <input
                type="email"
                name="email"
                placeholder="Электронная почта..."
                value={formData?.email}
                onChange={handleChange}
              />
              <br />
              <label>Telegram:</label>
              <input
                type="text"
                placeholder="Введите @username"
                name="telegram"
                value={formData?.telegram}
                onChange={handleChange}
              />
              <br />
              <label>Whatsapp:</label>
              <input
                type="text"
                name="whatsapp"
                placeholder="Введите номер телефона"
                value={formData?.whatsapp}
                onChange={handleChange}
              />
              <br />
              <label className={s.qwe}>
                <p>Положение дел</p>
                <input
                  type="checkbox"
                  name="status"
                  checked={formData?.status}
                  onChange={() =>
                    handleChange({
                      target: { name: "status", value: !formData?.status },
                    })
                  }
                />
              </label>
              <br />
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Illinois;
