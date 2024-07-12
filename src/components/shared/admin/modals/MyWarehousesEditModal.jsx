import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import { useAddresses } from "@/hooks/useAddresses";
import CustomSelect from "@/components/partials/Select";
import { getCookie } from "@/utils/cookieHelpers";

export default function MyWarehousesEditModal({ isOpen, onClose, warehouse }) {
  const [trackingNumber, setTrackingNumber] = useState(
    warehouse?.tracking_number || ""
  );
  const [comments, setComments] = useState(warehouse?.comments || "");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const { updateWarehouses } = useWarehouses();
  const { fetchAddresses } = useAddresses();
  const [userData, setUserData] = useState(null);
  const token = getCookie("accessToken");

  useEffect(() => {
    if (warehouse?.user) {
      fetchUserData(warehouse.user);
    }
  }, [warehouse]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `https://api-owayusa.com/api/address/list/?user=${userId}`,
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
      if (warehouse?.address) {
        const selectedAddress = data.results.find(
          (address) => address.id === warehouse.address
        );
        setSelectedAddress(selectedAddress);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (warehouse) {
      setSelectedWarehouse(
        warehouses.find((w) => w.id === warehouse?.warehouse)
      );
      setSelectedOrigin(
        countries.find((c) => c.id === warehouse?.country_of_origin)
      );
      setSelectedDestination(
        countries.find((c) => c.id === warehouse?.country_of_destination)
      );
      setSelectedCourier(
        deliveryServices.find((d) => d.name === warehouse?.courier_service)
      );
    }
  }, [warehouse]);

  const warehouses = [
    { id: 28, country: "США (Делавэр)", city: "Делавэр" },
    { id: 14, country: "США (Чикаго)", city: "Чикаго" },
    { id: 24, country: "Турция (Стамбул)", city: "Стамбул" },
    { id: 25, country: "Кыргызстан (Бишкек)", city: "Бишкек" },
  ];

  const countries = [
    { id: 3, name: "США (Чикаго)" },
    { id: 10, name: "США (Делавэр)" },
    { id: 4, name: "Турция (Стамбул)" },
    { id: 8, name: "Кыргызстан" },
    { id: 9, name: "Россия" },
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
    if (
      !selectedWarehouse ||
      !selectedOrigin ||
      !selectedDestination ||
      !selectedAddress ||
      !selectedCourier
    ) {
      console.error("All fields must be selected");
      return;
    }

    const updatedData = {
      tracking_number: trackingNumber,
      courier_service: selectedCourier.id || warehouse.courier_service,
      warehouse: selectedWarehouse.id,
      country_of_origin: selectedOrigin.id,
      country_of_destination: selectedDestination.id,
      address: selectedAddress.id || warehouse.address,
      comments: comments,
    };

    try {
      await updateWarehouses(warehouse?.id, updatedData);
      onClose();
    } catch (error) {
      console.error("Ошибка при обновлении склада:", error);
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
                <label htmlFor="origin">Страна отправки</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedOrigin}
                  onChange={setSelectedOrigin}
                  span={selectedOrigin?.name || "Выберите страну отправки"}
                />
              </div>
              <div>
                <label htmlFor="destination">Страна прибытия</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedDestination}
                  onChange={setSelectedDestination}
                  span={selectedDestination?.name || "Выберите страну прибытия"}
                />
              </div>
              <div>
                <label htmlFor="address">Адрес назначения</label>
                <CustomSelect
                  options={userData?.results?.map((address) => ({
                    id: address.id,
                    name: address.address,
                  }))}
                  selectedOption={selectedAddress}
                  onChange={setSelectedAddress}
                  span={selectedAddress?.address || "Выберите адрес"}
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
                  onChange={setSelectedCourier}
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
