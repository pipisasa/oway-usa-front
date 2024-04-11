import React from "react";
import s from "@/styles/pages/user/UserWarehouses.module.scss";

export default function UserWarehousesPage() {
  const warehouses = [
    {
      img: "assets/icons/footer/usa.svg",
      title: "Главный офис",
      address: "4730d Kimball Ave",
      state: "Illinois",
      phone: "872 710 07 10",
      city: "Chicago",
      zip: "60625",
      email: "owayusa1@gmail.com",
    },
    {
      img: "assets/icons/footer/usa.svg",
      title: "Пункты приема в Чикаго:",
      address: "1550 Oak Brook",
      state: "Illinois",
      phone: "872 710 07 10",
      city: "205",
      zip: "60625",
      email: "owayusa1@gmail.com",
    },
    {
      img: "assets/icons/footer/usa.svg",
      title: "Пункт приема онлайн заказов в Delaware",
      address: "4730d Kimball Ave",
      state: "Turkey",
      phone: "872 710 07 10",
      city: "Chicago",
      zip: "34130",
      email: "owayusa1@gmail.com",
    },
    {
      img: "assets/icons/footer/turkey.svg",
      title: "Адрес склада в Турции",
      address: "Nişanca, Hemşire Sk.  ",
      state: "Illinois",
      phone: "872 710 07 10",
      city: "Istanbul",
      zip: "34130",
      email: "owayusa1@gmail.com",
    },
  ];

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data).then(
      () => {
        alert("Данные скопированы в буфер обмена!");
      },
      (err) => {
        console.error("Ошибка при копировании: ", err);
      }
    );
  };

  const handleCopyClick = (warehouse) => {
    const data = `Адрес: ${warehouse.address}, Штат: ${warehouse.state}, Город: ${warehouse.city}, ZIP-код: ${warehouse.zip}, Телефон: ${warehouse.phone}, Email: ${warehouse.email}`;
    copyToClipboard(data);
  };

  return (
    <section className={s.warehouse_page}>
      {warehouses.map((warehouse, index) => (
        <div key={index} className={s.warehouse_card}>
          <h3>{warehouse.title}</h3>
          <div className={s.card}>
            <div className={s.block}>
              <div>
                <img src="/assets/icons/locations.svg" alt="locations" />
                <span>Адрес</span>
                <p>{warehouse.address}</p>
              </div>
              <div>
                <img
                  src="/assets/icons/united-states-of-america.svg"
                  alt="locations"
                />
                <span>Штат</span>
                <p>{warehouse.state}</p>
              </div>
              <div>
                <img src="/assets/icons/phone-call.svg" alt="locations" />
                <span>Номер</span>
                <p>{warehouse.phone}</p>
              </div>
            </div>
            <div className={s.block}>
              <div>
                <img src="/assets/icons/city.svg" alt="city" />
                <span>Город</span>
                <p>{warehouse.city}</p>
              </div>
              <div>
                <img src="/assets/icons/zip-code.svg" alt="city" />
                <span>ZIP-код</span>
                <p>{warehouse.zip}</p>
              </div>
              <div>
                <img src="/assets/icons/email.svg" alt="city" />
                <span>Почта</span>
                <p>{warehouse.email}</p>
              </div>
            </div>
          </div>
          <div className={s.copy_btn}>
            <button onClick={() => handleCopyClick(warehouse)}>
              Скопировать
            </button>
          </div>
        </div>
      ))}
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
