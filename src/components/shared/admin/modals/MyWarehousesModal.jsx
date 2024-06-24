import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import CustomSelect from "@/components/partials/Select";

export default function MyWarehousesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comments, setComments] = useState("");
  const { addWarehouses } = useWarehouses();
  const [selectedOption, setSelectedOption] = useState("");
  const [courierOption, setCourierOption] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);
  const warehouses = [
    { id: 24, name: "Турция" },
    { id: 23, name: "Москва" },
    { id: 22, name: "Кыргызстан" },
    { id: 14, name: "Чикаго" },
  ];

  const deliveryServices = [
    { name: "Fedex", id: 1 },
    { name: "USPS", id: 2 },
    { name: "UPS", id: 3 },
    { name: "DHL", id: 4 },
    { name: "Lasership", id: 5 },
    { name: "Landmark", id: 6 },
    { name: "Amazon", id: 7 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWarehouses({
        courier_service: courierOption.name,
        tracking_number: trackingNumber,
        warehouse: selectedOption.name,
        comments: comments,
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
        <h3>Добавить товар</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="warehouse">Склад</label>
                <CustomSelect
                  options={warehouses}
                  selectedOption={selectedOption}
                  onChange={(e) => setSelectedOption(e)}
                  span={"Выберите страну"}
                />
              </div>

              <div>
                <label htmlFor="tracking_number">Трeк-код</label>
                <input
                  id="tracking_number"
                  type="number"
                  placeholder="Вставьте трeк-код"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
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

              <div>
                <label htmlFor="comments">Комментарий</label>
                <input
                  id="comments"
                  type="text"
                  placeholder="Введите комментарий"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
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
