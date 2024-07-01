import React, { useState } from "react";
import s from "@/styles/users/Tabs.module.scss";
import UserData from "@/components/shared/users/settings/UserData";
import ChangePassword from "@/components/shared/users/settings/ChangePassword";
import useUserData from "@/hooks/user/useUserData";
import AddressSetting from "@/components/shared/users/settings/AddressSetting";

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState("userData");
  const { userData, loading, error } = useUserData();

  return (
    <section className={s.container}>
      <div className={s.settings}>
        <div className={s.tabs}>
          <button
            className={
              activeTab === "userData" ? s.active_tabs : s.not_active_tabs
            }
            onClick={() => setActiveTab("userData")}
          >
            Личные данные
          </button>
          <button
            className={
              activeTab === "changePassword" ? s.active_tabs : s.not_active_tabs
            }
            onClick={() => setActiveTab("changePassword")}
          >
            Сменить пароль
          </button>
          <button
            className={
              activeTab === "address" ? s.active_tabs : s.not_active_tabs
            }
            onClick={() => setActiveTab("address")}
          >
            Адреса
          </button>
        </div>
        <div className={s.forms}>
          {activeTab === "userData" && <UserData />}
          {activeTab === "changePassword" && <ChangePassword />}
          {activeTab === "address" && <AddressSetting />}
        </div>
      </div>
      <div className={s.user_code}>
        <label htmlFor="">Код получателя</label>
        <span>#{loading ? "Loading..." : userData?.unique_id}</span>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
