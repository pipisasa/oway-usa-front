import React from "react";
import s from "@/styles/screens/main/AboutClient.module.scss";
import { Slider } from "@/components/partials/Slider";

export default function AboutClient() {
  return (
    <div className={`${s.mission} container`}       
      data-aos="fade-up" 
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <span>Для оптовых клиентов</span>
      <div className={s.mission_header}>
        <h1>
          OWAY USA готова поддержать вас в процессе доставки <br /> товаров из
          США и Турции прямо до двери ваших клиентов,
          <br /> предлагая при этом не только это!
        </h1>
        <div className={s.mission_header_info}>
          <div></div>
          <span>
            Если вы занимаетесь организацией совместных покупок, предоставляете
            услугу закупок в США или управляете интернет-магазином с желанием
            предлагать качественные товары, то данное предложение создано
            специально для вас. Что мы предлагаем:
          </span>
        </div>
      </div>
      <div className={s.mission_blocks_container}>
        <div className={s.mission_blocks}>
          <Slider>
            <div className={s.mission_block}>
              <img src="assets/icons/mission_notebook.svg" alt="" />
              <h3>Фокус на клиенте, а не на конкурентах</h3>
              <p>
                Специальные скидки на доставку и страховку в зависимости от
                объема отправок в месяц.
              </p>
            </div>
            <div className={s.mission_block}>
              <img src="assets/icons/mission_book.svg" alt="" />
              <h3>Стремление к постоянному совершенствованию</h3>
              <p>
                Все услуги склада и логистики в одном окне с понятным и простым
                интерфейсом
              </p>
            </div>
            <div className={s.mission_block}>
              <img src="assets/icons/mission_box.svg" alt="" />
              <h3>Обязательстве к операционной отличности</h3>
              <p>
                Использование картона повышенной плотности, влагозащищенного
                пакета внутри, армированной ленты, а также дополнительной
                упаковки для хрупких вещей при необходимости
              </p>
            </div>

            <div className={s.mission_block}>
              <img src="assets/icons/mission_notebook.svg" alt="" />
              <h3>Фокус на клиенте, а не на конкурентах</h3>
              <p>
                Таможенное оформление в соответствии с Таможенным кодексом
                Таможенного союза
              </p>
            </div>
            <div className={s.mission_block}>
              <img src="assets/icons/mission_book.svg" alt="" />
              <h3>Стремление к постоянному совершенствованию</h3>
              <p>
                Возможность доставки товаров без ограничений по количеству и
                стоимости. Возможность обсуждения индивидуальных условий для
                специфических товаров.
              </p>
            </div>
            <div className={s.mission_block}>
              <img src="assets/icons/mission_box.svg" alt="" />
              <h3>Возможность сделать брендированную отправку своих посылок</h3>
              <p>
                Для корпоративных клиентов - возможность нанесение их логотипов
                и других информации к их заказам и брендирование коробок для
                отправки. Печать ваших рекламных материалов и наклеек на коробку
                возможна при отправке определенного количество посылок в месяц.
              </p>
            </div>
          </Slider>
        </div>

        <div className={s.mission_blocks}>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_notebook.svg" alt="" />
            <h3>Фокус на клиенте, а не на конкурентах</h3>
            <p>
              Специальные скидки на доставку и страховку в зависимости от объема
              отправок в месяц.
            </p>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_book.svg" alt="" />
            <h3>Стремление к постоянному совершенствованию</h3>
            <p>
              Все услуги склада и логистики в одном окне с понятным и простым
              интерфейсом
            </p>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к операционной отличности</h3>
            <p>
              Использование картона повышенной плотности, влагозащищенного
              пакета внутри, армированной ленты, а также дополнительной упаковки
              для хрупких вещей при необходимости
            </p>
          </div>
        </div>
        <div className={s.mission_blocks}>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_notebook.svg" alt="" />
            <h3>Фокус на клиенте, а не на конкурентах</h3>
            <p>
              Таможенное оформление в соответствии с Таможенным кодексом
              Таможенного союза
            </p>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_book.svg" alt="" />
            <h3>Стремление к постоянному совершенствованию</h3>
            <p>
              Возможность доставки товаров без ограничений по количеству и
              стоимости. Возможность обсуждения индивидуальных условий для
              специфических товаров.
            </p>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к операционной отличности</h3>
            <p>
              Для корпоративных клиентов - возможность использования обычной
              армированной ленты без брендирования Qwintry на коробках. Печать
              ваших рекламных материалов и наклеек на коробку возможна при
              отправке от 50 посылок в месяц (оплата по себестоимости печати
              материалов). 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
