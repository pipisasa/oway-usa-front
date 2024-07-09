import React, { useState } from "react";
import s from "@/styles/screens/main/AdvantageSteps.module.scss";
import { Accordion, AccordionItem } from "@nextui-org/react";

const illinois = [
  {
    icon: "https://media-public.canva.com/wIu5I/MAFUX4wIu5I/1/tl.png",
    img: "/assets/images/usps/image_2024-07-09_03-41-11.png",
    text: "Часть 1: Ввод основной информации",
    texta: `Часть 1: Ввод основной информации`,
    answer: `
Перейдите на сайт калькулятора стоимости почтовых отправлений USPS. https://postcalc.usps.com/

Выбор страны назначения:

В поле "What's the destination country?" выберите "United States (Domestic and APO/FPO/DPO Mail)".
Укажите ZIP-коды:

Введите ZIP-код места отправления в поле "What ZIP Code are you mailing from?".
Введите ZIP-код места назначения в поле "What ZIP Code are you mailing to?".
Укажите дату и время отправления:

В поле "What's the Date you plan to mail the item?" выберите дату, когда вы планируете отправить посылку.
В поле "What's the Time you plan to mail the item?" выберите приблизительное время отправления.`,
  },
  {
    icon: "https://media-public.canva.com/-1tVg/MAFmjz-1tVg/1/tl.png",
    img: "/assets/images/usps/image_2024-07-09_03-41-50.png",
    text: "Часть 2: Уточнение типа отправления",
    texta: `Часть 2: Уточнение типа отправления`,

    answer: `
    Выберите тип отправления:
    Отметьте соответствующие опции, если ваше отправление содержит кремированные останки, живых животных, суточных цыплят или опасные материалы. Если ничего из перечисленного нет, пропустите этот шаг.
    Выберите необходимость наземной транспортировки:
    
    Отметьте "Requires Ground Transportation", если ваша посылка требует наземной транспортировки. Если нет, оставьте это поле пустым.`,
  },
  {
    icon: "https://media-public.canva.com/g0P3Y/MAFSq8g0P3Y/1/tl.png",
    img: "/assets/images/usps/image_2024-07-09_03-42-14.png",
    text: "Часть 3: Выбор и ввод параметров упаковки",
    texta: `Часть 3: Выбор и ввод параметров упаковки`,

    answer: `Выберите тип упаковки:

    Выберите один из следующих вариантов:
    "Calculate Postcard price" для расчета стоимости открытки.
    "View Flat Rate Envelopes" для конвертов с фиксированной ставкой.
    "View Flat Rate Boxes" для коробок с фиксированной ставкой.
    "Calculate price based on Shape and Size" для расчета стоимости в зависимости от формы и размера посылки.
    Ввод параметров посылки:
    
    Если вы выбрали "Calculate price based on Shape and Size", введите параметры вашей посылки, такие как вес и размеры, чтобы получить точную стоимость доставки.
    Получение результата:
    
    После ввода всех необходимых данных и выбора параметров нажмите соответствующую кнопку, чтобы увидеть рассчитанную стоимость доставки вашей посылки внутри США.
    Следуя этим шагам, вы сможете быстро и точно рассчитать стоимость отправки вашей посылки с помощью калькулятора USPS.`,
  },
];

export default function AdvantageSteps(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const getMenuItems = () => {
    switch (props.menu) {
      case "illinois":
        return illinois;
      default:
        return [];
    }
  };

  const formatAnswer = (answer) => {
    return answer.split("\n").map((text, index) => <p key={index}>{text}</p>);
  };

  const menuItems = getMenuItems();

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
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`${s["menu-item"]} ${
                  selectedItem === index ? s.active : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <img src={item.icon} width={50} height={50} alt="" />
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
              src={menuItems[selectedItem].img}
              width={825}
              height={327}
              alt="logo"
            />
            <Accordion
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                subtitle=""
                title={formatAnswer(menuItems[selectedItem].texta)}
              >
                <p>{formatAnswer(menuItems[selectedItem].answer)}</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
