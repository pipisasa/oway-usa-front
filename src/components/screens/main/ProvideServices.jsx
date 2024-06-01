import React from "react";
import s from "@/styles/screens/main/ProvideServices.module.scss";
import { useRouter } from "next/router";

export default function ProvideServices() {
  const router = useRouter();

  return (
    <div className={`${s.service} container`}>
      <div className={s.service_header}>
        <span>Услуги</span>
        <h1>
          Предоставляемые нами <br /> услуги
        </h1>
      </div>
      <div className={s.services_block} data-aos="zoom-out-right">
        <div className={s.services_block_left}>
          <div></div>
          <span>
            Фото и видео содержимого входящей посылки
            {/* <p>120$</p> */}
          </span>
        </div>
        <div className={s.services_block_span}>
          <div className={s.services_block_span_div}>
            <div></div>
            <span>
              5 качественных фото за 3$  + можно добавить фото бирок или
              этикеток
            </span>
          </div>
          <div>
            <img
              src="/assets/images/oway-usa-dalle-2.png"
              width={650}
              height={333}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-left">
        <div className={s.services_block_left}>
          <div></div>
          <span>
            Проверка товара на качество и брак 
            {/* <p>120$</p> */}
          </span>
        </div>
        <div className={s.services_block_span}>
          <div className={s.services_block_span_div}>
            <div></div>
            <span>
              Проверка товаров необходима, чтобы гарантировать соответствие
              описанию на сайте и целостность при поступлении на склад. Заказ
              услуги проверки для товаров следует оформить до их поступления,
              доступна после оплаты заказа.  
            </span>
          </div>
          <div className={s.services_block_span_div}>
            <div></div>
            <span style={{ fontWeight: "bold" }}>
              Стоимость услуги  в США - 5$ 
            </span>
          </div>
          <div className={s.services_block_span_div}>
            <div></div>
            <span style={{ fontWeight: "bold" }}>
              Стоимость услуги в Турции - 2$ 
            </span>
          </div>
          <div>
            <img
              src="/assets/images/service-img-2.png"
              width={650}
              height={333}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-right">
        <div className={s.services_block_left}>
          <div></div>
          <span>
            Выкуп с интернет-мазинов  которые не доставляют на склады{" "}
            <p>10% от стоимости</p>
          </span>
        </div>
        <div className={s.services_block_span}>
          <div className={s.services_block_span_div}>
            <div></div>
            <span>
              В США есть категория магазинов которые категорически не отправляют
              на склады по разным причинам. Для этого у нас есть решение и можем
              выкупить со всех сайтов без ограничений. Для подоброй информации
              напишите нашему менеджеру
            </span>
          </div>
          <button
            onClick={() =>
              router.push(
                "https://api.whatsapp.com/send/?phone=18727100710&text&type=phone_number&app_absent=0"
              )
            }
          >
            Связаться с менеджером
          </button>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-left">
        <div className={s.services_block_left}>
          <div></div>
          <span>
            Проверка техники на работоспособность <p>5$</p>
          </span>
        </div>
        <div className={s.services_block_span}>
          <div className={s.services_block_span_div}>
            <div></div>
            <span>
              Проверка электроники на включение/выключение (запрос через
              тикеты).
            </span>
          </div>
          <div>
            <img
              src="/assets/images/service-img-3.png"
              width={650}
              height={333}
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
