import React, { useState, useEffect } from "react";
import s from "@/styles/pages/user/UserMain.module.scss";
import OnTheWay from "@/components/shared/users/tabs/OnTheWay";
import TableTabs from "@/components/shared/users/tabs/TableTabs";
import Delivered from "@/components/shared/users/tabs/Delivered";
import useUserData from "@/hooks/user/useUserData";
import Loading from "@/components/shared/admin/Loading";

export default function UserMainPage() {
  const [activeTab, setActiveTab] = useState("onTheWay");
  const { userData, loading, error } = useUserData();
  const [addressData, setAddressData] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        const response = await fetch(
          `https://api-owayusa.com/api/address/list/?user=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Received user address data:", data);
        setAddressData(data);
      } catch (error) {
        console.error("Error fetching user address data:", error);
      }
    };

    if (userData?.id) {
      fetchUserData(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    console.log("Address data updated:", addressData);
  }, [addressData]);

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
                {userData.phone_number
                  ? userData.phone_number
                  : "Номер телефона не указан"}
              </p>
              <p>
                <img src="/assets/icons/email.svg" alt="email" />
                {userData?.email}
              </p>
              <p>
                <img src="/assets/icons/locations.svg" alt="address" />
                {/* {userData.address ? userData?.address : "Адрес не указан"} */}
                {addressData.results && addressData.results.length > 0 ? (
                  <div>
                    <p>{addressData.results[0].address}</p>
                  </div>
                ) : (
                  <p>Адрес не указан</p>
                )}
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
