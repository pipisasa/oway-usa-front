import React, { useEffect, useRef, useState } from "react";
import s from "@/styles/partials/Contact.module.scss";
import { getCookie } from "@/utils/cookieHelpers";

export default function Contacts() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    setIsAuthorized(getCookie("accessToken") !== null);
  }, []);

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

  const sliderRef = useRef(null);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Информация скопирована!");
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -427, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 427, behavior: "smooth" });
  };

  if (isAuthorized === null) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={`${s.address_container} container`}>
      <div className={s.container_header}>
        <div className={s.title}>
          <span>Контакты</span>
          <h2>Связаться с нами</h2>
        </div>
        <div className={s.slider_btns}>
          <button onClick={scrollLeft}>
            <img src="/assets/icons/arrowLeft.svg" alt="to left" />
          </button>
          <button onClick={scrollRight}>
            <img src="/assets/icons/arrowRight.svg" alt="to right" />
          </button>
        </div>
      </div>
      <div ref={sliderRef} className={s.address_cards}>
        {warehouses.map((data, index) => (
          <div key={index} className={s.address_card}>
            <div className={s.card_header}>
              <div>
                <img src={data.img} alt={data.title} />
                <h3>{data.title}</h3>
              </div>
              {(isAuthorized ||
                !data.title.includes(
                  "Пункт приема онлайн заказов в Delaware"
                )) && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Адрес: ${data.address}, Город: ${data.city}, Штат: ${data.state}, Телефон: ${data.phone}, Email: ${data.email}`
                    )
                  }
                >
                  <img src="/assets/icons/copy.svg" alt="copy address" />
                </button>
              )}
            </div>

            {!isAuthorized &&
              data.title.includes("Пункт приема онлайн заказов в Delaware") && (
                <div className={s.auth_button}>
                  <p>Адрес онлайн заказов в Delaware после авторизации</p>
                  <button
                    onClick={() => (window.location.href = "/auth/login")}
                  >
                    Авторизоваться
                  </button>
                </div>
              )}
            <div
              className={s.card_content}
              style={
                data.title.includes("Пункт приема онлайн заказов в Delaware") &&
                !isAuthorized
                  ? { filter: "blur(8px)" }
                  : {}
              }
            >
              <div className={s.content}>
                <div>
                  <img src="/assets/icons/contact_address.svg" alt="icons" />
                  <span>Address</span>
                  <h5>{data.address}</h5>
                </div>
                <div>
                  <img
                    src="/assets/icons/united-states-of-america.svg"
                    alt="icons"
                  />
                  <span>State</span>
                  <h5>{data.state}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_call.svg" alt="icons" />
                  <span>Number</span>
                  <h5>{data.phone}</h5>
                </div>
              </div>
              <div className={s.content}>
                <div>
                  <img src="/assets/icons/city.svg" alt="icons" />
                  <span>City</span>
                  <h5>{data.city}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_zip-code.svg" alt="icons" />
                  <span>Zip code</span>
                  <h5>{data.zip}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_email.svg" alt="icons" />
                  <span>Mail</span>
                  <h5>{data.email}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
