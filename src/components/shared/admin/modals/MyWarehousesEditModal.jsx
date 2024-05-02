import React, { useEffect, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";

export default function MyWarehousesEditModal({ isOpen, onClose, warehouse }) {
  const [trackingNumber, setTrackingNumber] = useState(
    warehouse?.tracking_number || ""
  );
  const [comments, setComments] = useState(warehouse?.comments || "");
  const { updateWarehouses } = useWarehouses();
  const { countries } = useCountries();

  const deliveryServices = [
    { name: "Fedex", id: 1 },
    { name: "USPS", id: 2 },
    { name: "UPS", id: 3 },
    { name: "DHL", id: 4 },
    { name: "Lasership", id: 5 },
    { name: "Landmark", id: 6 },
    { name: "Amazon", id: 7 },
  ];

  const chooseWarehouses = countries.find(
    (country) => country.name === warehouse?.warehouse
  );
  const [selectedOption, setSelectedOption] = useState(chooseWarehouses);
  useEffect(() => {
    if (chooseWarehouses) {
      setSelectedOption(chooseWarehouses);
    }
  }, [chooseWarehouses]);

  const chooseCourier = deliveryServices.find(
    (country) => country.name === warehouse?.courier_service
  );
  const [courierOption, setCourierOption] = useState(chooseCourier);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWarehouses(warehouse?.id, {
        courier_service: courierOption.name,
        tracking_number: trackingNumber,
        warehouse: selectedOption.name,
        comments: comments,
      });
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении сайта:", error);
    }
  };

  return (
    <div className={s.modal}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h3>Редактировать посылку</h3>
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
                <label htmlFor="tracking_number">Трeк-код</label>
                <input
                  id="tracking_number"
                  type="text"
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
                  placeholder="Комментарий"
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
