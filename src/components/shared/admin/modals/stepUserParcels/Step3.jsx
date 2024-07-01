import React, { useState, useEffect, useCallback } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import { useAddresses } from "@/hooks/useAddresses";

export default function Step3({
  handleChange,
  handleSubmit,
  currentStep,
  setCurrentStep,
  clientId,
  address,
}) {
  const { warehouses } = useWarehousesFull();
  const { selectedAddress, fetchAddressById } = useAddresses();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentAddressId, setCurrentAddressId] = useState(null);

  const fetchAddressIfNeeded = useCallback(
    (addressId) => {
      if (addressId && addressId !== currentAddressId) {
        fetchAddressById(addressId);
        setCurrentAddressId(addressId);
      }
    },
    [fetchAddressById, currentAddressId]
  );

  useEffect(() => {
    fetchAddressIfNeeded(address);
  }, [address, fetchAddressIfNeeded]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let filteredWarehouses = [];
    if (value.trim() !== "") {
      filteredWarehouses = warehouses?.results?.filter((warehouse) =>
        warehouse?.unique_id?.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSuggestions(filteredWarehouses);
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelectWarehouse = (warehouse) => {
    handleChange({
      target: { name: "unique_id_user", value: warehouse.unique_id },
    });
    setInputValue(warehouse.unique_id);
    setSuggestions([]);
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
          <input
            type="text"
            name="unique_id_user"
            id="unique_id_user"
            placeholder="Напишите ID"
            value={clientId}
            disabled
            onChange={handleInputChange}
          />
        </div>
        {selectedAddress && (
          <div className={c.input}>
            <label htmlFor="address" className="mt-2">
              Адрес
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Адрес"
              value={`${selectedAddress.full_name}, ${selectedAddress.city}, ${selectedAddress.country}, ${selectedAddress.address}`}
              disabled
            />
          </div>
        )}
      </form>
      <button className={c.submit_btn} onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
}
