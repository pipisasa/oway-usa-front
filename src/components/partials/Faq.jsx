import React, { useState } from "react";
import s from "@/styles/partials/Faq.module.scss";
import { useRouter } from "next/router";

export default function Faq() {
  const faqItems = [
    {
      question: "Откуда и куда вы доставляете груз?",
      answer:
        "Мы осуществляем доставку ваших заказов из США и Турции в Россию и Кыргызстан..",
    },
    {
      question: "Какой минимальный вес для отправки?",
      answer:
        "Мы исключили минимальный вес по отправки для клиентов. Это значит вы можете отправлять посылки не зависимо от веса и платить только за вес посылки. ",
    },
    {
      question: "Как выбирать товары  ? ",
      answer:
        "При отборе товаров, просим вас учесть перечень товаров, запрещенных к перевозке. Информацию о запрещенных товарах вы можете найти в ответах ниже. ",
    },
    {
      question: "Запрещенные товары для отправки.",
      answer:
        "Роллеры, санитайзеры и любые другие товары с пометкой огнеопасно, Металлодетекторы,",
    },
    {
      question: "В какие сроки вы доставляете?",
      answer:
        "Кроме случаев непредвиденных обстоятельств, связанных с авиаперевозками, мы осуществляем доставку в течение 7-18 дней с момента отправления вашего товара с наших складов в США до вашей страны.",
    },
    {
      question: "В каких штатах вы принимаете посылки для отправки?",
      answer:
        " Наши склады расположены в штате Делавэре и штате Иллинойс, город Чикаго. График работы нашего Чикагского офиса -  с пн по сб, с 9am - 6pm , а Делавэрского - с 9am - 6pm . Просим учесть  это при оформление заказов.",
    },
    {
      question: "Как произвести оплату моих онлайн-покупок и доставки?",
      answer:
        "Оплата покупок из американских интернет-магазинов осуществляется международными картами Visa и MasterCard. В случае отсутствия карты или её непринятия магазином, вы можете воспользоваться услугой выкупа (тут сделать ссылку на выкуп ) . Оплатить стоимость доставки можно через личный кабинет с использованием международных карт. Также, при получении посылки в наших ПВЗ, возможна оплата через наши местные банковские счета.",
    },
    {
      question: "Как осуществить отслеживание моих отправлений?",
      answer:
        "Для этого у нас предусмотрена вкладка 'Отслеживание' на нашем веб-сайте. Для авторизации вам потребуется указать свой номер телефона, а затем свой идентификационный номер. К вам придет уведомления на каждом этапе заказа, ",
    },
    {
      question: "Доставляете ли посылку до дома?",
      answer:
        "Вы можете решить, забрать груз самостоятельно из наших пунктов выдачи в Москве и Бишкеке, либо уточнить в личном кабинете условия доставки до вашего дома. Доставка по городу и регионам осуществляется местными курьерскими службами, такими как СДЭК, Яндекс, почта и другие сервисы.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqStyle = {};
  if (router.pathname === "/") {
    faqStyle.background = "var(--bue_light_2, #fff)";
  } else if (router.pathname === "/faq") {
    faqStyle.background = "var(--bue_light_2, #f7f9fc)";
  }

  return (
    <section style={faqStyle}>
      <div className={`${s.faq_container} container`}>
        <div className={s.faq_block}>
          <div className={s.faq_header}>
            <span>FAQ</span>
            <h2>Часто задаваемые вопросы</h2>
          </div>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={s.question}
              style={{
                backgroundColor: openIndex === index ? "#027DDB" : "#fff",
              }}
              onClick={() => toggleQuestion(index)}
            >
              <div className={s.close_block}>
                <p style={{ color: openIndex === index ? "#fff" : "#000" }}>
                  {item.question}
                </p>
                <button>
                  <img
                    src={
                      openIndex === index
                        ? "/assets/icons/minus.svg"
                        : "/assets/icons/plus.svg"
                    }
                    alt={openIndex === index ? "close" : "open"}
                  />
                </button>
              </div>

              {openIndex === index && <p className={s.answer}>{item.answer}</p>}
            </div>
          ))}
        </div>
        <div className={s.door_img} data-aos="zoom-in-up">
          <img src="assets/icons/faq_door.png" alt="" />
        </div>
      </div>
    </section>
  );
}
