import React, { useState } from "react";
import s from "@/styles/pages/user/UserMain.module.scss";
import OnTheWay from "@/components/users/tabs/OnTheWay";
import TableTabs from "@/components/users/tabs/TableTabs";
import ReadyIssued from "@/components/users/tabs/ReadyIssued";
import Delivered from "@/components/users/tabs/Delivered";

export default function UserMainPage() {
  const [activeTab, setActiveTab] = useState("onTheWay");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={s.user_page}>
      <div className={s.user_info}>
        <h2>Кудайбергенов Акбар</h2>
        <div>
          <p>+7 (747) 123-12-12</p>
          <p>dzholdaspaevalim@gmail.com</p>
          <p>Казахстан, Караганда, Кузембаева 32, кв. 12</p>
        </div>
      </div>
      <TableTabs onTabClick={handleTabClick} activeTab={activeTab} />
      {activeTab === "onTheWay" && <OnTheWay />}
      {activeTab === "readyIssued" && <ReadyIssued />}
      {activeTab === "delivered" && <Delivered />}
    </section>
  );
}
