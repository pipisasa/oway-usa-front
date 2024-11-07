import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import { useAddresses } from "@/hooks/useAddresses";
import CustomSelect from "@/components/partials/Select";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

export default function MyWarehousesModal({ UserId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comments, setComments] = useState("");
  const { addWarehouses } = useWarehouses();
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");

  const { fetchAddresses } = useAddresses();
  const [userData, setUserData] = useState(null);
  const token = getCookie("accessToken");

  useEffect(() => {
    fetchUserData(UserId);
  }, [UserId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/address/list/?user=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const warehouses = [
    { id: 14, country: "США (Чикаго)", city: "Чикаго" },
    { id: 24, country: "Турция (Стамбул)", city: "Стамбул" },
    { id: 25, country: "Кыргызстан (Бишкек)", city: "Бишкек" },
    { id: 28, country: "США (Делавэр)", city: "Делавэр" },
  ];

  const countries = [
    { id: 3, name: "США (Чикаго)" },
    { id: 10, name: "США (Делавэр)" },
    { id: 4, name: "Турция (Стамбул)" },
    // { id: 8, name: "Кыргызстан (Бишкек)" },
    // { id: 9, name: "Россия (Москва)" },
  ];
  const countriess = [
    // { id: 3, name: "США" },
    // { id: 4, name: "Турция" },
    { id: 8, name: "Кыргызстан" },
    { id: 9, name: "Россия" },
  ];

  const deliveryServices = [
    { name: "Fedex", id: 1 },
    { name: "USPS", id: 2 },
    { name: "UPS", id: 3 },
    { name: "Europe", id: 6 },
    { name: "Amazon", id: 7 },
  ];

  const handleOriginChange = (selectedOption) => {
    setSelectedOrigin(selectedOption);
    const warehouse = warehouses.find(
      (warehouse) => warehouse.country === selectedOption.name
    );
    setSelectedWarehouse(warehouse || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWarehouses({
        courier_service: selectedCourier.id,
        tracking_number: trackingNumber,
        warehouse: selectedWarehouse.id,
        country_of_origin: selectedOrigin.id,
        country_of_destination: selectedDestination.id,
        address: selectedAddress.id,
        comments: comments,
      });
      toggleModal();
    } catch (error) {
      console.error("Ошибка при добавлении склада:", error);
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить посылку
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить посылку</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
              <div>
                <label htmlFor="origin">Страна отправки</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedOrigin}
                  onChange={handleOriginChange}
                  span={"Cтрану отправки"}
                />
              </div>

              <div>
                <label htmlFor="destination">Страна прибытия</label>
                <CustomSelect
                  options={countriess}
                  selectedOption={selectedDestination}
                  onChange={(e) => setSelectedDestination(e)}
                  span={"Cтрану прибытия"}
                />
              </div>
              <div>
                <label htmlFor="address">Адрес назначения</label>
                <CustomSelect
                  options={userData?.results?.map((address) => ({
                    id: address.id,
                    name: `${address.address}`,
                  }))}
                  selectedOption={selectedAddress}
                  onChange={(e) => setSelectedAddress(e)}
                  span={"Выберите адрес"}
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
                  selectedOption={selectedCourier}
                  onChange={(e) => setSelectedCourier(e)}
                  span={selectedCourier?.name || "Курьерская служба"}
                />
              </div>
            </div>
            <div className={s.input}>
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
