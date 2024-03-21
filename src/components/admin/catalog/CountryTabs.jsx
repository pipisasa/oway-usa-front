import React, { useState } from "react";
import s from "@/styles/admin/CountryTabs.module.scss";

export default function CountryTabs() {
  const [activeTab, setActiveTab] = useState("Все");

  return (
    <div className={s.tabs}>
      <button
        className={activeTab === "Все" ? s.active : ""}
        onClick={() => setActiveTab("Все")}
      >
        Все
      </button>
      <button
        className={activeTab === "США" ? s.active : ""}
        onClick={() => setActiveTab("США")}
      >
        <img src="/assets/icons/usa.svg" alt="США" />
        США
      </button>
      <button
        className={activeTab === "Турция" ? s.active : ""}
        onClick={() => setActiveTab("Турция")}
      >
        <img src="/assets/icons/turkey.svg" alt="Турция" />
        Турция
      </button>
    </div>
  );
}
