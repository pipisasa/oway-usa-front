import React, { useState, useEffect, useRef } from "react";
import s from "@/styles/components/partials/select/SearchSelectCustom.module.scss";
import useLocalStorage from "../select/useLocalStorage";
import { inputComponents, options } from "./inputComponents";
import { useRouter } from "next/router";
import useUsersAdmin from "@/hooks/admin/useUsers";
import useRequests from "@/hooks/admin/useRequests";

const storageKeys = {
  name_of_purchase: "name_of_purchase",
  is_paid: "is_paid",
  created_at: "created_at",
  email: "email",
  price: "price",
};

const RequestsAdminSearch = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchData } = useRequests();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [displayText, setDisplayText] = useState("Поиск");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const router = useRouter();

  const [name_of_purchase, setname_of_purchase] = useLocalStorage(
    storageKeys.name_of_purchase,
    ""
  );
  const [is_paid, setis_paid] = useLocalStorage(storageKeys.is_paid, "");
  const [created_at, setcreated_at] = useLocalStorage(
    storageKeys.created_at,
    ""
  );
  const [request_status, setStatusInput] = useLocalStorage(
    storageKeys.request_status,
    ""
  );
  const [price, setprice] = useLocalStorage(storageKeys.price, "");
  const [email, setemail] = useLocalStorage(storageKeys.email, "");
  const dropdownRef = useRef(null);

  const inputs = {
    name_of_purchase,
    is_paid,
    created_at,
    email,
    price,
    request_status,
    setprice,
    setcreated_at,
    setStatusInput,
    setemail,
    setis_paid,
    setname_of_purchase,
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

  const handleSearch = (searchText, type) => {
    const setter = inputs[`set${type.charAt(0).toUpperCase() + type.slice(1)}`];
    if (setter) {
      setter(searchText);
      setDisplayText(`по: ${searchText}`);
    }
    switch (type) {
      case "name_of_purchase":
        onFilterChange("name_of_purchase", searchText);
        break;
      case "created_at":
        onFilterChange("created_at", searchText);
        break;
      case "email":
        onFilterChange("email", searchText);
        break;
      case "request_status":
        onFilterChange("request_status", searchText);
        break;
      case "price":
        onFilterChange("price", searchText);
        break;
      case "is_paid":
        onFilterChange("is_paid", searchText);
        break;
      case "phone_number":
        onFilterChange("phone_number", searchText);
        break;
      default:
        console.log(`No filter matched for type: ${type}`);
        break;
    }
  };

  const performSearch = () => {
    onFilterChange("name_of_purchase", name_of_purchase);
    onFilterChange("created_at", created_at);
    onFilterChange("email", email);
    onFilterChange("price", price);
    onFilterChange("request_status", request_status);
    onFilterChange("is_paid", is_paid);
  };
  useEffect(() => {
    fetchData(performSearch);
  }, []);
  const renderOptions = (optionsToRender, type) => (
    <div className={s.block}>
      {optionsToRender?.map((option) => (
        <div key={option.id} onClick={() => handleSearch(option.id, type)}>
          {option.name}
        </div>
      ))}
      <div className={s.border}></div>
    </div>
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSelectedComponent(null);
      setActiveIndex(null);
      setDisplayText("Поиск");
    }
  };

  const renderComponentOptions = () => {
    if (!selectedComponent) return null;

    const { title } = selectedComponent.props;
    switch (title) {
      case "Выберите статус":
        return renderOptions(options.status, "request_status");
      case "Выберите статус оплаты":
        return renderOptions(options.is_paid, "is_paid");
      default:
        return null;
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
              </div>
            </>
          )}
        </div>
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

export default RequestsAdminSearch;
