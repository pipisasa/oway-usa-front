import React, { useState, useEffect, useRef } from "react";
import s from "@/styles/components/partials/select/SearchSelectCustom.module.scss";
import useLocalStorage from "./useLocalStorage";
import { options, inputComponents } from "./inputComponents";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import { useRouter } from "next/router";

const storageKeys = {
  textInput: "textInput",
  numberInput: "numberInput",
  selectedChoice: "selectedChoice",
  nameInput: "nameInput",
  statusInput: "statusInput",
  countryInput: "countryInput",
  dateInput: "dateInput",
  weightInput: "weightInput",
};

const CustomSelect = ({
  onNameFilterChange,
  onTrackNumberFilterChange,
  onStatusFilterChange,
  onCountryFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { warehouses, fetchWarehouses, deleteWarehouse, loading, error } =
    useMainWarehouses();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [displayText, setDisplayText] = useState("Поиск");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const [currentWarehouseIndex, setCurrentWarehouseIndex] = useState(0);

  const [textInput, setTextInput] = useLocalStorage(storageKeys.textInput, "");
  const [numberInput, setNumberInput] = useLocalStorage(
    storageKeys.numberInput,
    ""
  );
  const [selectedChoice, setSelectedChoice] = useLocalStorage(
    storageKeys.selectedChoice,
    ""
  );
  const [nameInput, setNameInput] = useLocalStorage(storageKeys.nameInput, "");
  const [statusInput, setStatusInput] = useLocalStorage(
    storageKeys.statusInput,
    ""
  );
  const [countryInput, setCountryInput] = useLocalStorage(
    storageKeys.countryInput,
    ""
  );
  const [dateInput, setDateInput] = useLocalStorage(storageKeys.dateInput, "");
  const [weightInput, setWeightInput] = useLocalStorage(
    storageKeys.weightInput,
    ""
  );
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const inputs = {
    textInput,
    numberInput,
    selectedChoice,
    nameInput,
    statusInput,
    countryInput,
    dateInput,
    weightInput,
    setTextInput,
    setNumberInput,
    setSelectedChoice,
    setNameInput,
    setStatusInput,
    setCountryInput,
    setDateInput,
    setWeightInput,
  };

  const toggleDropdown = (e) => {
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
  };

  const closeDropdown = (e) => {
    setIsOpen(false);
    setSelectedComponent(null);
    setActiveIndex(null);
    setDisplayText("Поиск");
    e.stopPropagation();
  };

  const resetAllData = (e) => {
    setTextInput("");
    setNumberInput("");
    setSelectedChoice("");
    setNameInput("");
    setStatusInput("");
    setCountryInput("");
    setDateInput("");
    setWeightInput("");
    setActiveIndex(null);
    setSelectedComponent(null);
    setDisplayText("Поиск");
    e.stopPropagation();
    console.log("Resetting all filters");
    onNameFilterChange("");
    onTrackNumberFilterChange("");
    onStatusFilterChange("");
    onCountryFilterChange("");
  };

  const handleSearch = (searchText, type) => {
    const setter = inputs[`set${type.charAt(0).toUpperCase() + type.slice(1)}`];
    if (setter) {
      setter(searchText);
      console.log(`${type} updated:`, searchText);
      setDisplayText(`по: ${searchText}`);
    }
    switch (type) {
      case "nameInput":
        onNameFilterChange(searchText);
        break;
      case "trackNumberInput":
        onTrackNumberFilterChange(searchText);
        break;
      case "statusInput":
        onStatusFilterChange(searchText);
        break;
      case "countryInput":
        onCountryFilterChange(searchText);
        break;
      default:
        break;
    }
  };

  const performSearch = () => {
    onNameFilterChange(nameInput);
    onTrackNumberFilterChange(numberInput);
    onStatusFilterChange(statusInput);
    onCountryFilterChange(countryInput);
  };

  const renderOptions = (optionsToRender, type) => (
    <div className={s.block}>
      {optionsToRender.map((option, index) => (
        <div key={index} onClick={() => handleSearch(option, type)}>
          {option}
        </div>
      ))}
      <div className={s.border}></div>
    </div>
  );

  const renderComponentOptions = () => {
    if (!selectedComponent) return null;

    const { title } = selectedComponent.props;

    switch (title) {
      case "Выберите статус":
        return renderOptions(options.status, "statusInput");
      case "Выберите страну принятия":
        return renderOptions(options.country, "countryInput");
      case "Выберите страну":
        return renderOptions(options.default, "selectedChoice");
      default:
        return null;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSelectedComponent(null);
      setActiveIndex(null);
      setDisplayText("Поиск");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const handleNext = () => {
    if (currentWarehouseIndex < warehouses.length - 1) {
      const newIndex = currentWarehouseIndex + 1;
      console.log(currentWarehouseIndex);
      setCurrentWarehouseIndex(newIndex);
      navigateToWarehouse(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentWarehouseIndex > 0) {
      const newIndex = currentWarehouseIndex - 1;
      setCurrentWarehouseIndex(newIndex);
      navigateToWarehouse(newIndex);
    }
  };
  const navigateToWarehouse = (index) => {
    const warehouse = warehouses[index];
    if (warehouse) {
      const path = `/admin/warehouses/${encodeURIComponent(warehouse.name)}`;
      router.push(path);
    }
  };

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
                    src="/assets/icons/search.svg"
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
                <div className={s.buttonContainer}>
                  <button className={s.closeButton} onClick={closeDropdown}>
                    Закрыть
                  </button>
                  <button className={s.resetButton} onClick={resetAllData}>
                    Сбросить
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={s.onebutton}>
        <button onClick={handlePrevious}>
          {currentWarehouseIndex > 0
            ? warehouses[currentWarehouseIndex - 1]?.name
            : "Нет предыдущего"}
        </button>
        <button onClick={handleNext}>
          {currentWarehouseIndex < warehouses.length - 1
            ? warehouses[currentWarehouseIndex + 1]?.name
            : "Нет следующего"}
        </button>
      </div>
      <div className={s.twobutton}>
        <button
          className={activeButton === 0 ? s.activeButton : ""}
          onClick={() => handleButtonClick(0)}
        >
          Новые
        </button>
        <button
          className={activeButton === 1 ? s.activeButton : ""}
          onClick={() => handleButtonClick(1)}
        >
          Старые
        </button>
      </div>
    </div>
  );
};

export default CustomSelect;
