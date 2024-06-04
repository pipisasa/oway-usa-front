import React, { useState } from "react";
import s from "@/styles/admin/CountryTabs.module.scss";
import useCountries from "../../../../hooks/admin/useCountries";

export default function CountryTabs({
  setSelectedCountry,
  setSelectedCategory,
}) {
  const [activeTab, setActiveTab] = useState("Все");
  const { countries } = useCountries();

  const handleTabClick = (country) => {
    setActiveTab(country === "Все" ? "Все" : country.name);
    setSelectedCountry(country === "Все" ? "Все" : country);
  };

  return (
    <div
      className={s.tabs}
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <button
        className={activeTab === "Все" ? s.active : ""}
        onClick={() => {
          setActiveTab("Все");
          setSelectedCountry(null);
        }}
      >
        Все
      </button>
      {countries.map((country) => (
        <button
          key={country.id}
          className={activeTab === country.name ? s.active : ""}
          onClick={() => handleTabClick(country)}
        >
          <img width={16} height={16} src={country.icon} alt={country.name} />
          {country.name}
        </button>
      ))}
    </div>
  );
}
