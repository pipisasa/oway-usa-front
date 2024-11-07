import React, { useState, useEffect, useCallback } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "../../Modal";
import useWarehouses from "@/hooks/user/useWarehouses";
import { useAddresses } from "@/hooks/useAddresses";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

export default function MyWarehousesEditModal({ isOpen, onClose, warehouse }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comments, setComments] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");

  const { updateWarehouses } = useWarehouses();
  const { fetchAddresses } = useAddresses();
  const [userData, setUserData] = useState(null);
  const token = getCookie("accessToken");

  console.log(warehouse);

  const fetchUserData = useCallback(
    async (userId) => {
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
        if (warehouse?.address) {
          const selectedAddress = data.results.find(
            (address) => address.id === warehouse.address
          );
          setSelectedAddress(selectedAddress.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    [token, warehouse?.address]
  );

  useEffect(() => {
    if (warehouse?.user) {
      fetchUserData(warehouse.user);
    }
  }, [warehouse, fetchUserData]);

  useEffect(() => {
    if (warehouse) {
      setTrackingNumber(warehouse.tracking_number || "");
      setComments(warehouse.comments || "");
      setSelectedWarehouse(
        warehouses.find((w) => w.id === warehouse?.warehouse)?.id || ""
      );
      setSelectedOrigin(
        countries.find((c) => c.id === warehouse?.country_of_origin)?.id || ""
      );
      setSelectedDestination(
        countriess.find((c) => c.id === warehouse?.country_of_destination)
          ?.id || ""
      );
      setSelectedCourier(
        deliveryServices.find((d) => d.id === warehouse?.courier_service)?.id ||
          ""
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
  ];
  const countriess = [
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
      courier_service: selectedCourier || warehouse.courier_service,
      warehouse: selectedWarehouse,
      country_of_origin: selectedOrigin,
      country_of_destination: selectedDestination,
      address: selectedAddress || warehouse.address,
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
                <select
                  id="origin"
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите страну отправки
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="destination">Страна прибытия</label>
                <select
                  id="destination"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите страну прибытия
                  </option>
                  {countriess.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="address">Адрес назначения</label>
                <select
                  id="address"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите адрес
                  </option>
                  {userData?.results?.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.address}
                    </option>
                  ))}
                </select>
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
                <select
                  id="courier_service"
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                >
                  <option value="" disabled>
                    Курьерская служба
                  </option>
                  {deliveryServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
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
