import React, { useState } from "react";
import s from "@/styles/pages/user/UserMain.module.scss";
import OnTheWay from "@/components/shared/users/tabs/OnTheWay";
import TableTabs from "@/components/shared/users/tabs/TableTabs";
import Delivered from "@/components/shared/users/tabs/Delivered";
import useUserData from "@/hooks/user/useUserData";
import Loading from "@/components/shared/admin/Loading";

export default function UserMainPage() {
  const [activeTab, setActiveTab] = useState("onTheWay");
  const { userData, loading, error } = useUserData();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={s.user_page}>
      <div className={s.user_info}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <h2>
              {userData?.last_name} {userData?.first_name}
            </h2>
            <div>
              <p>
                <img src="/assets/icons/phone-call.svg" alt="phone number" />
                {userData?.phone_number}
              </p>
              <p>
                <img src="/assets/icons/email.svg" alt="email" />
                {userData?.email}
              </p>
              <p>
                <img src="/assets/icons/locations.svg" alt="address" />
                {userData.address ? userData?.address : "Адрес не указан"}
              </p>
            </div>
          </>
        )}
      </div>
      <TableTabs onTabClick={handleTabClick} activeTab={activeTab} />
      {activeTab === "onTheWay" && <OnTheWay />}
      {activeTab === "delivered" && <Delivered />}
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
