import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import SearchSelect from "@/components/partials/SearchSelect";
import { getCookie } from "@/utils/cookieHelpers";

export default function Step3({
  handleChange,
  handleSubmit,
  currentStep,
  setCurrentStep,
}) {
  const { warehouses, fetchWarehouses } = useWarehousesFull();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const token = getCookie("accessToken");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputValue.trim() !== "") {
      fetchWarehouses(inputValue);
    }
  };

  const fetchUserAddresses = async (userId) => {
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
      console.log("User Addresses:", data);
      setUserAddresses(data.results || []); // Assuming `results` is the array of addresses
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    } else {
      setSuggestions(warehouses?.results || []);
    }
  }, [warehouses]);

  useEffect(() => {
    if (selectedWarehouse) {
      fetchUserAddresses(selectedWarehouse.id);
    }
  }, [selectedWarehouse]);

  const handleSelectWarehouse = (warehouse) => {
    handleChange({
      target: { name: "unique_id_user", value: warehouse.unique_id },
    });
    setSelectedWarehouse(warehouse);
    setInputValue(warehouse.unique_id);
    setSuggestions([]);
  };

  const handleAddressChange = (e) => {
    const address = userAddresses.find(
      (address) => address.id === parseInt(e.target.value)
    );
    setSelectedAddress(address);
    handleChange({
      target: { name: "address", value: address.id },
    });
  };

  return (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 1 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(1)}
        >
          1
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 2 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(2)}
        >
          2
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 3 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(3)}
        >
          3
        </button>
        <div className={c.line}></div>
      </div>
      <form action="" className={s.step_form}>
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
            <img
              src="/assets/icons/search.svg"
              alt=""
              onClick={handleSearchClick}
            />
          </div>
          <SearchSelect
            suggestions={suggestions}
            handleSelectWarehouse={handleSelectWarehouse}
          />
        </div>
        {userAddresses.length > 0 && (
          <div className={c.input}>
            <label htmlFor="addressSelect">Выберите адрес</label>
            <select
              id="addressSelect"
              name="addressSelect"
              className={c.selectAddress}
              onChange={handleAddressChange}
              value={selectedAddress.id || ""}
            >
              <option value="">Выберите адрес</option>
              {userAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {`${address.full_name}, ${address.city}, ${address.country}, ${address.address}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
      <button className={c.submit_btn} onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
}
