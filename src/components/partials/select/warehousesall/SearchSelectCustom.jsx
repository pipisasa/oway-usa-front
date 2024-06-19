import React, { useState, useEffect, useRef, useCallback } from "react";
import s from "@/styles/components/partials/select/SearchSelectCustom.module.scss";
import useLocalStorage from "../useLocalStorage";
import { options, inputComponents } from "../inputComponents";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import { useRouter } from "next/router";

const storageKeys = {
  nameInput: "nameInput",
  trackNumberInput: "trackNumberInput",
  statusInput: "statusInput",
  countryOfOriginInput: "countryOfOriginInput",
  countryOfDestinationInput: "countryOfDestinationInput",
  weightInput: "weightInput",
  priceInput: "priceInput",
  dateSentInput: "dateSentInput",
};

const WarehousesAllSelect = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchWarehouses, warehouses } = useMainWarehouses();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [displayText, setDisplayText] = useState("Поиск");
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();

  const [nameInput, setNameInput] = useLocalStorage(storageKeys.nameInput, "");
  const [trackNumberInput, setTrackNumberInput] = useLocalStorage(
    storageKeys.trackNumberInput,
    ""
  );
  const [statusInput, setStatusInput] = useLocalStorage(
    storageKeys.statusInput,
    ""
  );
  const [countryOfOriginInput, setCountryOfOriginInput] = useLocalStorage(
    storageKeys.countryOfOriginInput,
    ""
  );
  const [countryOfDestinationInput, setCountryOfDestinationInput] =
    useLocalStorage(storageKeys.countryOfDestinationInput, "");
  const [weightInput, setWeightInput] = useLocalStorage(
    storageKeys.weightInput,
    ""
  );
  const [priceInput, setPriceInput] = useLocalStorage(
    storageKeys.priceInput,
    ""
  );
  const [dateSentInput, setDateSentInput] = useLocalStorage(
    storageKeys.dateSentInput,
    ""
  );
  const dropdownRef = useRef(null);

  const inputs = {
    nameInput,
    trackNumberInput,
    statusInput,
    countryOfOriginInput,
    countryOfDestinationInput,
    weightInput,
    priceInput,
    dateSentInput,
    setNameInput,
    setTrackNumberInput,
    setStatusInput,
    setCountryOfOriginInput,
    setCountryOfDestinationInput,
    setWeightInput,
    setPriceInput,
    setDateSentInput,
  };

  const toggleDropdown = useCallback((e) => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        setSelectedComponent(null);
        setDisplayText("Поиск");
        setActiveIndex(null);
      }
      return newState;
    });
    e.stopPropagation();
  }, []);

  const handleSearch = useCallback(
    (searchText, type) => {
      const setter =
        inputs[`set${type.charAt(0).toUpperCase() + type.slice(1)}`];
      if (setter) {
        setter(searchText);
        setDisplayText(`по: ${searchText}`);
      }
      switch (type) {
        case "nameInput":
          onFilterChange("name", searchText);
          break;
        case "trackNumberInput":
          onFilterChange("track_number", searchText);
          break;
        case "statusInput":
          onFilterChange("status", searchText);
          break;
        case "countryOfOriginInput":
          onFilterChange("country_of_origin", searchText);
          break;
        case "countryOfDestinationInput":
          onFilterChange("country_of_destination", searchText);
          break;
        case "weightInput":
          onFilterChange("weight", searchText);
          break;
        case "priceInput":
          onFilterChange("price", searchText);
          break;
        case "dateSentInput":
          onFilterChange("date_sent", searchText);
          break;
        default:
          break;
      }
    },
    [inputs, onFilterChange]
  );

  const performSearch = useCallback(() => {
    onFilterChange("name", nameInput);
    onFilterChange("track_number", trackNumberInput);
    onFilterChange("status", statusInput);
    onFilterChange("country_of_origin", countryOfOriginInput);
    onFilterChange("country_of_destination", countryOfDestinationInput);
    onFilterChange("weight", weightInput);
    onFilterChange("price", priceInput);
    onFilterChange("date_sent", dateSentInput);
  }, [
    nameInput,
    trackNumberInput,
    statusInput,
    countryOfOriginInput,
    countryOfDestinationInput,
    weightInput,
    priceInput,
    dateSentInput,
    onFilterChange,
  ]);

  useEffect(() => {
    fetchWarehouses(performSearch);
  }, [fetchWarehouses, performSearch]);

  const renderOptions = useCallback(
    (optionsToRender, type) => (
      <div className={s.block}>
        {optionsToRender?.map((option) => (
          <div key={option.id} onClick={() => handleSearch(option.id, type)}>
            {option.name}
          </div>
        ))}
        <div className={s.border}></div>
      </div>
    ),
    [handleSearch]
  );

  const renderComponentOptions = useCallback(() => {
    if (!selectedComponent) return null;

    const { title } = selectedComponent.props;
    switch (title) {
      case "Выберите статус":
        return renderOptions(options.status, "statusInput");
      case "Выберите страну отправления":
        return renderOptions(options.country_of_origin, "countryOfOriginInput");
      case "Выберите страну назначения":
        return renderOptions(
          options.country_of_origin,
          "countryOfDestinationInput"
        );
      case "Выберите страну":
        return renderOptions(options.default, "selectedChoice");
      default:
        return null;
    }
  }, [selectedComponent, renderOptions]);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSelectedComponent(null);
      setActiveIndex(null);
      setDisplayText("Поиск");
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const navigateToWarehouse = useCallback(
    (index) => {
      const warehouse = warehouses[index];
      if (warehouse) {
        const path = `/admin/warehouses/${encodeURIComponent(warehouse.name)}`;
        router.push(path);
      }
    },
    [warehouses, router]
  );

  return (
    <div className={s.main}>
      <div className={s.selectContainer} ref={dropdownRef}>
        <div onClick={toggleDropdown}>
          <div className={s.selectedOption}>
            {selectedComponent ? (
              selectedComponent
            ) : (
              <>
                <div className={s.Search}>
                  <p>Поиск</p>
                  <img
                    className={s.image_border}
                    src="/assets/icons/searchfff.svg"
                    alt="search"
                    onClick={(e) => {
                      e.stopPropagation();
                      performSearch();
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {isOpen && (
            <>
              <div
                className={s.optionsContainer}
                onClick={(e) => e.stopPropagation()}
              >
                {renderComponentOptions()}
                {inputComponents(handleSearch, inputs).map(
                  ({ component, displayText }, index) => (
                    <div
                      key={index}
                      className={`${s.option} ${
                        index === activeIndex ? s.active : ""
                      }`}
                      onClick={() => {
                        setSelectedComponent(component);
                        setActiveIndex(index);
                      }}
                    >
                      {displayText}
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehousesAllSelect;
