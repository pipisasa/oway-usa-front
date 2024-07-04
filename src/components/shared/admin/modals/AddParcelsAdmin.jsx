import React, { useEffect, useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "../../Modal";
import CustomSelect from "@/components/partials/Select";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import useWarehouses from "@/hooks/user/useWarehouses";
import Arrow from "../../ui/Arrow";
import { useAddresses } from "@/hooks/useAddresses";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import SearchSelect from "@/components/partials/SearchSelect";
import { getCookie } from "@/utils/cookieHelpers";

export default function AddParcelsAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comments, setComments] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const { addressList, fetchAddresses } = useAddresses();
  const { addWarehouses } = useWarehouses();
  const token = getCookie("accessToken");
  const { warehouses, fetchWarehouses, deleteWarehouse, loading, error } =
    useMainWarehouses();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchWarehouses();
    fetchAddresses();
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [courierOption, setCourierOption] = useState("");
  const { warehouses: warehouses12, fetchWarehouses: fetchWarehouses1 } =
    useWarehousesFull();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputValue.trim() !== "") {
      fetchWarehouses1(inputValue);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    } else {
      setSuggestions(warehouses12?.results || []);
    }
  }, [warehouses12, inputValue]);

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
      console.log("Received user data:", data);
      setUserData(data);
      setUserId(userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSelectWarehouse = (warehouse) => {
    setInputValue(warehouse.unique_id);
    setSuggestions([]);
    fetchUserData(warehouse.id);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const countries = [
    { id: 3, name: "США (Чикаго)" },
    { id: 4, name: "Турция (Стамбул)" },
    // { id: 8, name: "Кыргызстан (Бишкек)" },
    // { id: 9, name: "Россия (Москва)" },
  ];
  const countriess = [
    { id: 3, name: "США" },
    { id: 4, name: "Турция" },
    { id: 8, name: "Кыргызстан" },
    { id: 9, name: "Россия" },
  ];
  const warehouses1 = [
    { id: 26, country: "Россия", city: "Москва" },
    { id: 14, country: "США", city: "Чикаго" },
    { id: 24, country: "Турция", city: "Стамбул" },
    { id: 25, country: "Кыргызстан", city: "Бишкек" },
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

  const handleOriginChange = (selectedOption) => {
    setSelectedOrigin(selectedOption);
    const warehouse = warehouses1.find(
      (warehouse) =>
        `${warehouse.country} (${warehouse.city})` === selectedOption.name
    );
    setSelectedWarehouse(warehouse || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWarehouse) {
      console.error("No warehouse selected");
      return;
    }
    const formData = {
      courier_service: courierOption.id,
      tracking_number: trackingNumber,
      warehouse: selectedWarehouse.id,
      country_of_origin: selectedOrigin.id,
      country_of_destination: selectedDestination.id,
      address: selectedAddress.id,
      comments: comments,
      user: userId,
    };
    console.log("Form data being sent:", formData);
    try {
      await addWarehouses(formData);
      toggleModal();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  console.log("Current inputValue (user ID):", inputValue);

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить товар <Arrow />
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить товар</h3>
        <form onSubmit={handleSubmit}>
          <div className={s.shops_form}>
            <div className={s.first_input_block}>
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
                <label htmlFor="origin">Страна отправления</label>
                <CustomSelect
                  options={countries}
                  selectedOption={selectedOrigin}
                  onChange={handleOriginChange}
                  span={"Cтрану отправления"}
                />
              </div>
              <div>
                <label htmlFor="destination">Страна назначения</label>
                <CustomSelect
                  options={countriess}
                  selectedOption={selectedDestination}
                  onChange={(e) => setSelectedDestination(e)}
                  span={"Cтрану назначения"}
                />
              </div>
              <div className={c.input}>
                <label htmlFor="comments">Выбор клиента</label>
                <div className={s.search_container}>
                  <input
                    type="text"
                    name="unique_id_user"
                    id="unique_id_user"
                    placeholder="Напишите ID"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button type="button" onClick={handleSearchClick}>
                    поиск
                  </button>
                </div>
                <SearchSelect
                  suggestions={suggestions}
                  handleSelectWarehouse={handleSelectWarehouse}
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
