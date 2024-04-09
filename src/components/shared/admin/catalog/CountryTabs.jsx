import React, { useState } from "react";
import s from "@/styles/admin/CountryTabs.module.scss";
import useCountries from "../../../../hooks/admin/useCountries";

export default function CountryTabs({ setSelectedCountry, setSelectedCategory }) {
  const [activeTab, setActiveTab] = useState("Все");
  const {countries} = useCountries()

    const handleTabClick = (country) => {
        console.log(country,45)
        setActiveTab(country === "Все" ? "Все" : country.name);
        setSelectedCountry(country === "Все" ? "Все" : country);
        setSelectedCategory([]);
    };

  return (
    <div className={s.tabs}>
      <button
        className={activeTab === "Все" ? s.active : ""}
        onClick={() => {
            setActiveTab("Все");
            setSelectedCountry(null);
            setSelectedCategory([]);
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
