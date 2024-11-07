import React, { useEffect, useRef, useState } from "react";
import s from "@/styles/partials/Contact.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import useContacts from "@/hooks/useContacts";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Contacts() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [selected, setSelected] = useState("usa");

  useEffect(() => {
    setIsAuthorized(getCookie("accessToken") !== null);
  }, []);

  const warehouses = [
    {
      codename: "usa",
      img: "/assets/icons/footer/usa.svg",
      title: "Пункт приема онлайн заказов в Delaware",
      address: "467 Carson drive",
      state: "Delaware",
      phone: "+1 872 710 0710 ",
      city: "Bear",
      zip: "19701",
      unitcode: "OW",
      text: "Unit",
      qwe: "State",
      email: "owaycargo@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      codename: "usa",
      img: "/assets/icons/footer/usa.svg",
      title: "Главный офис",
      address: "4730D N Kimball Ave",
      state: "Illinois",
      phone: "+1 872 710 07 10",
      city: "Chicago",
      zip: "60625",
      qwe: "State",
      email: "owaycargo@gmail.com",
      words: "Email",
      logo: "/assets/icons/contact_email.svg",
      text: "Unit",
      unitcode: "D",
    },
    {
      codename: "usa",
      img: "/assets/icons/footer/usa.svg",
      title: "Пункты приема в Чикаго:",
      address: "Jannat Restaurant 2997 Kirchoff Rd",
      state: "Illinois",
      phone: "+1 872 710 0710",
      city: "Rolling Meadows",
      zip: "60008",
      unitcode: "",
      text: "Unit",
      qwe: "State",
      email: "owaycargo@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },

    {
      codename: "tr",
      img: "/assets/icons/footer/turkey.svg",
      title: "Адрес склада в Турции",
      address: "Hemşire Sk. 17C,",
      state: "Fatih",
      phone: "+90 501 339 6379",
      city: "Istanbul",
      zip: "34130",
      text: "Unit",
      unitcode: "17C",
      qwe: "Region",
      email: "owaycargo@gmail.com",
      words: "Email",
      logo: "/assets/icons/unit.svg",
    },
    {
      codename: "ru",
      img: "/assets/icons/footer/1.svg",
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
      codename: "kg",
      img: "/assets/icons/footer/2.svg",
      title: "Пункты приема в Кыргызстане:",
      address: "ул. Токтогула 211",
      state: "Чуй",
      phone: "+996 709 969 621",
      city: "Бишкек",
      zip: "720010",
      qwe: "Region",
      email: "owaycargo@gmail.com",
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

  const filteredWarehouses = warehouses.filter(
    (warehouse) => warehouse.codename === selected
  );

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
      <div className={s.mtcontact}>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab
            key="usa"
            className={s.mtcontact1}
            title={
              <img
                className={s.tabsimage}
                src={"/assets/icons/footer/usa.svg"}
                alt="usa"
              />
            }
          />
          <Tab
            key="tr"
            className={s.mtcontact1}
            title={
              <img
                className={s.tabsimage}
                src={"/assets/icons/footer/turkey.svg"}
                alt="tr"
              />
            }
          />
          <Tab
            key="ru"
            className={s.mtcontact1}
            title={
              <img
                className={s.tabsimage}
                src={"/assets/icons/footer/1.svg"}
                alt="ru"
              />
            }
          />
          <Tab
            className={s.mtcontact1}
            key="kg"
            title={
              <img
                className={s.tabsimage}
                src={"/assets/icons/footer/2.svg"}
                alt="kg"
              />
            }
          />
        </Tabs>
      </div>
      <div ref={sliderRef} className={s.address_cards}>
        {filteredWarehouses.map((data, index) => (
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
      </div>
    </section>
  );
}
