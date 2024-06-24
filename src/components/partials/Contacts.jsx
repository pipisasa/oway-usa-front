import React, { useEffect, useRef, useState } from "react";
import s from "@/styles/partials/Contact.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import useContacts from "@/hooks/useContacts";

export default function Contacts() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { contacts, loading, error } = useContacts();

  useEffect(() => {
    setIsAuthorized(getCookie("accessToken") !== null);
  }, []);

  const warehouses = [
    {
      img: "assets/icons/footer/usa.svg",
      title: "Главный офис",
      address: "4730DN Kimball Ave",
      state: "Illinois",
      phone: "872 710 07 10",
      city: "Chicago",
      zip: "60625",
      qwe: "State",
      email: "owayusa1@gmail.com",
      words: "Email",
      logo: "/assets/icons/contact_email.svg",
    },
    {
      img: "assets/icons/footer/usa.svg",
      title: "Пункты приема в Чикаго:",
      address: "1550 Oak Brook",
      state: "Illinois",
      phone: "872 710 07 10",
      city: "Chicago",
      zip: "60625",
      unitcode: "205",
      text: "Unit",
      qwe: "State",
      email: "owayusa1@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      img: "assets/icons/footer/usa.svg",
      title: "Пункт приема онлайн заказов в Delaware",
      address: "4730DN Kimball Ave",
      state: "Delaware",
      phone: "+1 872 710 0710 ",
      city: "Bear",
      zip: "19701",
      unitcode: "PR",
      text: "Unit",
      qwe: "State",
      email: "owayusa1@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      img: "assets/icons/footer/turkey.svg",
      title: "Адрес склада в Турции",
      address: "Hemşire Sk. 17C,",
      state: "Fatih",
      phone: "872 710 07 10",
      city: "Istanbul",
      zip: "34130",
      text: "Unit",
      unitcode: "17C",
      qwe: "Region",
      email: "owayusa1@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      img: "assets/icons/footer/1.svg",
      title: "Пункты приема в Москве:",
      address: "Перовская 26 корпус 1",
      state: "Московский регион",
      phone: "+7 925 644 6608",
      city: "Москва",
      zip: "111398",
      unitcode: "5",
      text: "Unit",
      qwe: "Region",
      email: "owayusamoscow@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      img: "assets/icons/footer/2.svg",
      title: "Пункты приема в Кыргызстане:",
      address: "ул. Токтогула 211",
      state: "Чуй",
      phone: "+996 709 969 621",
      city: "Бишкек",
      zip: "720010",
      qwe: "Region",
      email: "owayusa1@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
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
    <section
      className={`${s.address_container} container`}
      data-aos="fade-up"
      data-aos-duration="600"
    >
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
          <div
            key={index}
            className={`${s.address_card} ${
              data.title.includes("Пункты приема в Москве:") ? s.wide_card : ""
            }`}
          >
            <div className={s.card_header}>
              <div className={s.card_header_country}>
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
                      `Address: ${data.address}, City: ${data.city}, State: ${data.state}, Number: ${data.phone}, Email: ${data.email}, Unit: ${data.unitcode}`
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
                  <span>{data.qwe}</span>
                  <h5>{data.state}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_call.svg" alt="icons" />
                  <span>Number</span>
                  <h5>{data.phone}</h5>
                </div>
                {data.text && (
                  <div className={s.unit}>
                    <img src={data.logo} alt="icons" />
                    <span>{data.text}</span>
                    <h5>{data.unitcode}</h5>
                  </div>
                )}
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
                  <span>Email</span>
                  <h5>{data.email}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
        {contacts.results?.map((data, index) => (
          <div key={index} className={s.address_card}>
            <div className={s.card_header}>
              <div className={s.card_header_country}>
                <img
                  src={`https://api-owayusa.com/${data.image}`}
                  alt={data.title}
                />
                <h3>Пункты приема в {data.name}:</h3>
              </div>
              {(isAuthorized ||
                !data.title.includes(
                  "Пункт приема онлайн заказов в Delaware"
                )) && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Address: ${data.address}, City: ${data.city}, State: ${data.state}, Number: ${data.phone}, Email: ${data.email}, Unit: ${data.unitcode}`
                    )
                  }
                >
                  <img src="/assets/icons/copy.svg" alt="copy address" />
                </button>
              )}
            </div>

            <div className={s.card_content}>
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
                  <h5>{data.number}</h5>
                </div>
                <div className={s.unit}>
                  <img src="/assets/icons/unit.svg" alt="icons" />
                  <span>Unit</span>
                  <h5>{data.unit}</h5>
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
                  <h5>{data.zip_code}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_email.svg" alt="icons" />
                  <span>Email</span>
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
