import React, { memo, useCallback, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import Loading from "../Loading";

const InputField = memo(function InputField({
  label,
  type = "text",
  placeholder,
  name,
}) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} />
    </div>
  );
});

export default function AddWarehouses() {
  const { createWarehouse, loading, error } = useMainWarehouses();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = {
        name: event.target.name.value,
        address: event.target.address.value,
        zip_code: event.target.zip_code.value,
        phone_number: event.target.phone_number.value,
        mail: event.target.mail.value,
      };

      await createWarehouse(formData);
      if (!error) {
        toggleModal();
      }
    },
    [createWarehouse, error]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button style={{ padding: "24px" }} onClick={toggleModal}>
          <img src="/assets/icons/add_board.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Создать склад</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.second_input_block}>
              <InputField
                label="Название склада"
                placeholder="Введите название"
                name="name"
              />
              <div className={s.grid3}>
                <InputField
                  label="Адрес"
                  placeholder="Введите адрес"
                  name="address"
                />
                <InputField
                  label="Zip code"
                  placeholder="Введите zip code"
                  name="zip_code"
                />
                <InputField
                  label="Номер телефона"
                  placeholder="Введите номер телефона"
                  name="phone_number"
                />
                <InputField
                  label="Почта"
                  placeholder="Введите почту"
                  name="mail"
                />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn} disabled={loading}>
              Создать
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
