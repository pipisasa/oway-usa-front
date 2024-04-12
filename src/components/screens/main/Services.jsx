import React from "react";
import s from "@/styles/screens/main/Services.module.scss";
import Button from "../../partials/Button";

export default function Services() {
  return (
    <div className={s.heroSection_page}>
      <div className={`${s.heroSection_page_container} container`} data-aos="fade-up"
     data-aos-anchor-placement="top-center" >
        <div className={s.heroSection_info}>
          <h1>Предоставляемые нами услуги</h1>
          <div className={s.heroSection_info_span}>
            <span>
              В стоимость отправки включено множество базовых бесплатных услуг.
              Кроме того, вы можете воспользоваться дополнительными опциями:
              например, добавить дополнительную упаковку, измерить вещь
              и проверить работоспособность товара через систему спецзапросов
              или выбрать услугу “Помощь при покупке”.
            </span>
          </div>
        </div>
        <Button button="Заказать услугу" />
      </div>
      <div className={s.services_img} data-aos="fade-up"
     data-aos-anchor-placement="top-center"
     >
        <img
          src="assets/images/container.png"
          width={680}
          height={680}
          alt=""
        />
      </div>
    </div>
  );
}
