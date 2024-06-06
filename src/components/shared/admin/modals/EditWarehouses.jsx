import React, { memo, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import Modal from "../../Modal";
import { useWarehouses } from "@/hooks/admin/warehouses/useWarehouses";

const InputField = memo(function InputField({
  label,
  type = "text",
  placeholder,
  name,
  value,
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  );
});

export default function EditWarehouses({ warehouse }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const { updateWarehouse, loading, error } = useWarehouses();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      address: event.target.address.value,
      zip_code: event.target.zip_code.value,
      phone_number: event.target.phone_number.value,
      mail: event.target.mail.value,
    };

    await updateWarehouse(warehouse.id, formData);
    if (!error) {
      toggleModal();
    }
  };

  return (
    <div className={s.modal}>
      <div className={c.add_board}>
        <button onClick={toggleModal} className={c.edit}>
          <img src="/assets/icons/edit.svg" alt="" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Редактировать склад</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.second_input_block}>
              <InputField
                label="Название склада"
                name="name"
                placeholder="Введите название"
                value={warehouse.name}
              />
              <div className={s.grid3}>
                <InputField
                  label="Адрес"
                  name="address"
                  placeholder="Введите адрес"
                  value={warehouse.address}
                />
                <InputField
                  label="Zip code"
                  name="zip_code"
                  placeholder="Введите zip code"
                  value={warehouse.zip_code}
                />
                <InputField
                  label="Номер телефона"
                  name="phone_number"
                  placeholder="Введите номер телефона"
                  value={warehouse.phone_number}
                />
                <InputField
                  label="Почта"
                  name="mail"
                  placeholder="Введите почту"
                  value={warehouse.mail}
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
    </div>
  );
}
