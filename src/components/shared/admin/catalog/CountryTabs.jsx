import React, { useState } from "react";
import s from "@/styles/admin/CountryTabs.module.scss";
import useCountries from "../../../../hooks/admin/useCountries";

export default function CountryTabs() {
  const [activeTab, setActiveTab] = useState("Все");
  const {countries} = useCountries()

  return (
    <div className={s.tabs}>
      <button
        className={activeTab === "Все" ? s.active : ""}
        onClick={() => setActiveTab("Все")}
      >
        Все
      </button>
        {countries.map((country) => (
            <button
                key={country.id}
                className={activeTab === country.name ? s.active : ""}
                onClick={() => setActiveTab(country.name)}
            >
                <img width={16} height={16} src={country.icon} alt={country.name} />
                {country.name}
            </button>
        ))}
    </div>
  );
}
