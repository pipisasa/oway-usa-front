import React, { useState } from "react";
import s from "@/styles/screens/main/Advantage.module.scss";

const calc = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/images/фактический-вес.png",
    text: "Фактический вес",
    answer:
      "Фактический вес при экспресс доставке товаров — это просто вес посылки, который измеряется на весах.",
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/images/объемный-вес.png",
    text: "Объемный вес",
    answer:
      "Объемный вес рассчитывается по формуле: Объемный вес = Длина×Ширина×Высота Делитель Объемный вес = Делитель Длина×Ширина×Высота где размеры берутся в сантиметрах, а делитель зависит от компании перевозчика (часто это число находится в диапазоне от 5000 до 6000).",
  },
];

const menu = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/images/global-products.png",
    text: "Глобальный выбор товаров",
    answer:
      "Мы гарантируем, что процесс выбора и покупки товаров будет максимально лёгким и понятным даже для начинающих пользователей.",
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/images/time.png",
    text: "Экономия времени и усилий",
    answer:
      "Наш сайт обеспечивает быстрый и эффективный поиск необходимых товаров, а процесс оформления заказа занимает всего несколько кликов.",
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/images/международный.png",
    text: "Международная доставка с удобством",
    answer:
      "Наш сервис обеспечивает удобство международной доставки, делая мир ближе к вам",
  },
];

const service = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/images/usa-turkey.png",
    text: "Ваш личный адрес для покупок в США и Турции",
    answer:
      "В наших современных и автоматизированных складах в безналогом штате Делавэре и городе Истанбул.",
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/images/parcels.png",
    text: "Консолидация посылок",
    answer:
      "Это более экономичный вариант, так как часто отправка нескольких посылок в одной коробке выходит дешевле, чем отправка каждой посылки по отдельности.",
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/images/blabla.png",
    text: "Устранение избыточной упаковки от посылок",
    answer:
      "Это выполняется с целью снижения общего веса посылки, что уменшает вес и стоимости доставки для вас.",
  },
  {
    icon: "/assets/icons/footer/Warehouse.svg",
    img: "/assets/images/40days.png",
    text: "Хранение входящих посылок на 40 дней",
    answer:
      "Мы можем хранить ваши посылки до определенного времени и также до прибытие других ваших грузов с целью вместе отправки.",
  },
  {
    icon: "/assets/icons/footer/Deliveryaddress.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Изменение адреса получателя",
    answer:
      "Изменение адреса доставки и данных получателя возможно до и после вылета из США. В личном кабинете у вас есть возможность менять и добавлять данные получателя",
  },
];

export default function Advantage(props) {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className={props?.menu === "menu" ? s.advantage : s.advantage_calc}>
      <div
        className={`${s.advantage_container} container`}
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <div className={s.advantage_inner}>
          <p>{props.p}</p>
          <h2>{props.h2}</h2>
          <div className={s.menu}>
            {props.menu === "calc" &&
              calc.map((item, index) => (
                <div
                  key={index}
                  className={`${s["menu-item"]} ${
                    selectedItem === index ? s.active : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.text}</span>
                </div>
              ))}

            {props.menu === "menu" &&
              menu.map((item, index) => (
                <div
                  key={index}
                  className={`${s["menu-item"]} ${
                    selectedItem === index ? s.active : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.text}</span>
                </div>
              ))}
            {props.menu === "service" &&
              service.map((item, index) => (
                <div
                  key={index}
                  className={`${s["menu-item"]} ${
                    selectedItem === index ? s.active : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.text}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={s.info}>
          <div
            className={s["info-content"]}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <img
              data-aos="zoom-in"
              src={
                props.menu === "service"
                  ? service[selectedItem].img
                  : props.menu === "menu"
                  ? menu[selectedItem].img
                  : calc[selectedItem].img
              }
              width={825}
              height={327}
              alt="logo"
            />
            <p data-aos="zoom-in">
              {props.menu === "service"
                ? service[selectedItem].answer
                : props.menu === "menu"
                ? menu[selectedItem].answer
                : calc[selectedItem].answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
