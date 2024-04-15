import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";

export default function MyWarehousesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tracking_number, setTracking_number] = useState(0);
  const { addWarehouses } = useWarehouses();
  const { countries } = useCountries();
  const [selectedOption, setSelectedOption] = useState("");
  const [courierOption, setCourierOption] = useState("");
  const toggleModal = () => setIsOpen(!isOpen);

  const deliveryServices = [
      { name: "Fedex", id: 1 },
      { name: "USPS", id: 2 },
      { name: "UPS", id: 3 },
      { name: "DHL", id: 4 },
      { name: "Lasership", id: 5 },
      { name: "Landmark", id: 6 },
      { name: "Amazon", id: 7 }
  ];


  const handleSubmit = async (e) => {
    console.log("gffgg");
    e.preventDefault();
    try {
      await addWarehouses({
        courier_service:courierOption?.name,
        tracking_number,
         warehouse:selectedOption?.name
      });
      toggleModal();
    } catch (error) {
      console.error("Ошибка при добавлении сайта:", error);
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить товар
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить сайт</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="warehouse">Склад</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedOption}
                  onChange={(e) => setSelectedOption(e)}
                  span={"Выберите страну"}
                />
              </div>

              <div>
                <label htmlFor="tracking_number">Трак-код</label>
                <input
                  id="tracking_number"
                  type="number"
                  placeholder="Вставьте трак-код"
                  value={tracking_number}
                  onChange={(e) => setTracking_number(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="courier_service">Курьерская служба</label>
                 <CustomSelect
                  options={deliveryServices}
                  selectedOption={courierOption}
                  onChange={(e) => setCourierOption(e)}
                  span={"Курьерская служба"}
                />
              </div>
            </div>
          </div>
          <div className={s.btn_center}>
            <button type="submit" className={s.submit_btn}>
              Сохранить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
