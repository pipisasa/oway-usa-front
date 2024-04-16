import React, { useState } from "react";
import s from "@/styles/screens/main/Advantage.module.scss";

const calc = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/icons/container.png",
    text: "Фактический вес",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/icons/container.png",
    text: "Объемный вес",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/icons/container.png",
    text: "Гиперобъемный вес",
    answer: "Ты работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
];

const menu = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/icons/container.png",
    text: "Глобальный выбор товаров",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/icons/container.png",
    text: "Экономия времени и усилий",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/icons/container.png",
    text: "Международная доставка с удобством",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
];

const service = [
  {
    icon: "/assets/icons/adv_world.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Ваш личный адрес для покупок в США и Турции",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_date.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Объединение нескольких посылок в одну",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Устранение избыточной упаковки от посылок",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Хранение входящих посылок на 40 дней",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
  {
    icon: "/assets/icons/adv_box.svg",
    img: "/assets/images/adv_boxes.png",
    text: "Изменение адреса получателя",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
];

export default function Advantage(props) {
  const [selectedItem, setSelectedItem] = useState(1);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={props?.menu === "menu" ? s.advantage : s.advantage_calc}>
      <div className={`${s.advantage_container} container`}  
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <div className={s.advantage_inner}>
          <p>{props.p}</p>
          <h2>{props.h2}</h2>
          <div className={s.menu}>
            <div
              className={`${s["menu-item"]} ${
                selectedItem === 1 ? s.active : ""
              }`}
              onClick={() => handleItemClick(1)}
            >
              <img src={calc[0]?.icon} alt="" />
              <span>
                {props?.menu === "menu" && menu[0]?.text}
                {props?.menu === "calc" && calc[0]?.text}
                {props?.menu === "service" && service[0]?.text}
              </span>
            </div>
            <div
              className={`${s["menu-item"]} ${
                selectedItem === 2 ? s.active : ""
              }`}
              onClick={() => handleItemClick(2)}
            >
              <img src={calc[1]?.icon} alt="" />
              <span>
                {props?.menu === "menu" && menu[1]?.text}
                {props?.menu === "calc" && calc[1]?.text}
                {props?.menu === "service" && service[1]?.text}
              </span>
            </div>

            <div
              className={`${s["menu-item"]} ${
                selectedItem === 3 ? s.active : ""
              }`}
              onClick={() => handleItemClick(3)}
            >
              <img src={calc[2]?.icon} alt="" />
              <span>
                {props?.menu === "menu" && menu[2]?.text}
                {props?.menu === "calc" && calc[2]?.text}
                {props?.menu === "service" && service[2]?.text}
              </span>
            </div>
            {props?.menu === "service" && (
              <>
                <div
                  className={`${s["menu-item"]} ${
                    selectedItem === 4 ? s.active : ""
                  }`}
                  onClick={() => handleItemClick(4)}
                >
                  <img src={service[3]?.icon} alt="" />
                  <span>{props?.menu === "service" && service[3]?.text}</span>
                </div>
                <div
                  className={`${s["menu-item"]} ${
                    selectedItem === 5 ? s.active : ""
                  }`}
                  onClick={() => handleItemClick(5)}
                >
                  <img src={service[4]?.icon} alt="" />
                  <span>{props?.menu === "service" && service[4]?.text}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={s.info}>
          {selectedItem === 1 && (
            <div className={s["info-content"]} data-aos="fade-down" data-aos-duration="1000">
              {props?.menu === "service" ? (
                <img
                  src={service[0]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              ) : (
                <img
                  src={props?.menu === "menu" ? menu[0]?.img : calc[0]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              )}
              <p>
                {props?.menu === "menu" && menu[0]?.answer}
                {props?.menu === "calc" && calc[0]?.answer}
                {props?.menu === "service" && service[0]?.answer}
              </p>
            </div>
          )}
          {selectedItem === 2 && (
            <div className={s["info-content"]} data-aos="fade-down" data-aos-duration="1000">
              {props?.menu === "service" ? (
                <img
                  src={service[1]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              ) : (
                <img
                  src={props?.menu === "menu" ? menu[1]?.img : calc[1]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              )}

              <p>
                {props?.menu === "menu" && menu[1]?.answer}
                {props?.menu === "calc" && calc[1]?.answer}
                {props?.menu === "service" && service[1]?.answer}
              </p>
            </div>
          )}
          {selectedItem === 3 && (
            <div className={s["info-content"]} data-aos="fade-down" data-aos-duration="1000">
              {props?.menu === "service" ? (
                <img
                  src={service[2]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              ) : (
                <img
                  src={props?.menu === "menu" ? menu[2]?.img : calc[2]?.img}
                  width={825}
                  height={327}
                  alt="logo"
                />
              )}

              <p>
                {props?.menu === "menu" && menu[2]?.answer}
                {props?.menu === "calc" && calc[2]?.answer}
                {props?.menu === "service" && service[2]?.answer}
              </p>
            </div>
          )}
          {selectedItem === 4 && (
            <div className={s["info-content"]} data-aos="fade-down" data-aos-duration="1000">
              <img src={service[2]?.img} width={825} height={327} alt="logo" />
              <p>
                {props?.menu === "menu" && menu[2]?.answer}
                {props?.menu === "calc" && calc[2]?.answer}
                {props?.menu === "service" && service[2]?.answer}
              </p>
            </div>
          )}
          {selectedItem === 5 && (
            <div className={s["info-content"]} data-aos="fade-down" data-aos-duration="1000">
              <img src={service[2]?.img} width={825} height={327} alt="logo" />
              <p>
                {props?.menu === "menu" && menu[2]?.answer}
                {props?.menu === "calc" && calc[2]?.answer}
                {props?.menu === "service" && service[2]?.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
