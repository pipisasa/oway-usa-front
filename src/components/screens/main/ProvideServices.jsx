import React from "react";
import s from "@/styles/screens/main/ProvideServices.module.scss";

export default function ProvideServices() {
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
          <span>Фото и видео содержимого входящей посылки</span>
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
              src="assets/images/electronic.png"
              width={650}
              height={333}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-left">
        <div className={s.services_block_left}>
          <div></div>
          <span>Проверка товара на качество и брак </span>
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
            <span>Стоимость услуги  в США - 5$ </span>
          </div>
          <div className={s.services_block_span_div}>
            <div></div>
            <span>Стоимость услуги в Турции - 2$ </span>
          </div>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-right">
        <div className={s.services_block_left}>
          <div></div>
          <span>Выкуп с интернет-мазинов  которые не доставляют на склады</span>
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
          <button>Связаться с менеджером</button>
        </div>
      </div>
      <div className={s.services_block} data-aos="zoom-out-left">
        <div className={s.services_block_left}>
          <div></div>
          <span>Проверка техники на работоспособность</span>
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
              src="assets/images/electronic.png"
              width={650}
              height={333}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
