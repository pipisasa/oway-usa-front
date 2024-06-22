import React, { useState, useEffect, useRef } from "react";
import s from "@/styles/components/partials/select/SearchSelectCustom.module.scss";
import useLocalStorage from "../select/useLocalStorage";
import { inputComponents } from "./inputComponents";
import { useRouter } from "next/router";
import useUsersAdmin from "@/hooks/admin/useUsers";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";

const storageKeys = {
  first_name: "first_name",
  unique_id: "unique_id",
  last_name: "last_name",
  email: "email",
  phone_number: "phone_number",
};

const UserParcelsSearch = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchUsers } = useUsersAdmin();
  const { warehouses, loading, error, deleteWarehouse } = useUserWarehouses();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [displayText, setDisplayText] = useState("Поиск");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const router = useRouter();

  const [first_name, setfirst_name] = useLocalStorage(
    storageKeys.first_name,
    ""
  );
  const [unique_id, setunique_id] = useLocalStorage(storageKeys.unique_id, "");
  const [last_name, setlast_name] = useLocalStorage(storageKeys.last_name, "");
  const [phone_number, setphone_number] = useLocalStorage(
    storageKeys.phone_number,
    ""
  );
  const [email, setemail] = useLocalStorage(storageKeys.email, "");
  const dropdownRef = useRef(null);

  const inputs = {
    first_name,
    unique_id,
    last_name,
    email,
    phone_number,
    setphone_number,
    setlast_name,
    setemail,
    setunique_id,
    setfirst_name,
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
      case "first_name":
        onFilterChange("first_name", searchText);
        break;
      case "last_name":
        onFilterChange("last_name", searchText);
        break;
      case "email":
        onFilterChange("email", searchText);
        break;
      case "phone_number":
        onFilterChange("phone_number", searchText);
        break;
      case "unique_id":
        onFilterChange("unique_id", searchText);
        break;
      default:
        console.log(`No filter matched for type: ${type}`);
        break;
    }
  };
  const performSearch = () => {
    onFilterChange("first_name", first_name);
    onFilterChange("last_name", last_name);
    onFilterChange("email", email);
    onFilterChange("phone_number", phone_number);
    onFilterChange("unique_id", unique_id);
  };
  useEffect(() => {
    fetchUsers(performSearch);
  }, []);

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

  return (
    <div className={s.main}>
      <div className={s.selectContainer} ref={dropdownRef}>
        <div className={s.selectedOption1}>
          <div onClick={toggleDropdown}>
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

export default UserParcelsSearch;
