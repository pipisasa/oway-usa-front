import React from "react";
import s from "@/styles/screens/main/StepWork.module.scss";
import { Slider } from "@/components/partials/Slider";

const steps = [
  {
    id: 1,
    icon: "step_notebook.svg",
    title: "Регистрация на сайте OWAY USA",
    description:
      "Мы разработали уникальный и удобный сайт для всех пользователей. В которой каждый день опубликуем полезные статьи, скидки, новинки и другие полезные новости. У вас будет доступ к личному кабинету для управления заказами.",
  },
  {
    id: 2,
    icon: "step_adress.svg",
    title: "Получить персональный адрес в США и Турции",
    description:
      "Для вас мы даем личный и бесплатный адрес в США и Турции. Вам будет доступно все наши склады для оформления ваших заказов.",
  },
  {
    id: 3,
    icon: "step_box_mini.svg",
    title: "Оформление заказа на наш склад",
    description:
      "Укажите полученный адрес при оформлении покупки. С нами вы освобождены от налога с продаж и экономите 5-12% на каждой покупке. При оформлении заказа в интернет-магазине указываются примерные сроки доставки каждого товара до склада OWAY USA, а также предоставляется трекинг-номер для отслеживания статуса доставки.",
  },
  {
    id: 4,
    icon: "step_house.svg",
    title: "Отслеживание доставки",
    description:
      "Каждый этап доставки вашей посылки вы можете отследить в личном кабинете. После прибытия всех купленных товаров на наш склад, вы сможете увидеть их в личном кабинете и отправить одной посылкой домой или объединить несколько покупок из разных магазинов. Также после прибытия в город получателя вы будете получать уведомления. Мы также предлагаем услуги проверки работоспособности и соответствия заказанным товарам, удаления лишнего веса, измерения параметров и фотографирования.",
  },
  {
    id: 5,
    icon: "step_truck.svg",
    title: "Оплата и доставка",
    description:
      "Как только посылка будет упакована, вы получите инвойс на оплату доставки от нашего склада до вашего города. После этого вы сможете произвести оплату за доставку вашей посылки. Если желаете, вы также можете застраховать посылку. Это все, что требуется сделать. Остается лишь дождаться получения посылки!",
  },
  {
    id: 6,
    icon: "step_movers.svg",
    title: "Получение посылки и радость ",
    description:
      "При создании отправки выберите наиболее удобный для вас метод доставки: в почтовое отделение, до пункта выдачи заказов или доставку курьером прямо домой. Сразу после отправки посылки со склада в вашем личном кабинете будет доступен трекинг-номер для отслеживания. На каждом этапе вы будете получать уведомления о состоянии груза. Кроме того, по прибытии посылки вы получите уведомление.",
  },
];

export default function StepWork() {
  return (
    <div className={s.step}>
      <div className={`${s.step_container} container`}>
        <span>Этапы работы</span>
        <h2>Всего 6 простых шага</h2>
        <div className={s.step_img} data-aos="zoom-in-up">
          <img
            src="assets/images/step_box.png"
            width={494}
            height={494}
            alt=""
          />
        </div>
        {steps.map((step) => (
          <div key={step.id} className={s[`step_blocks${step.id}`]}>
            <span className={s.step_span}>{step.id}</span>
            <div className={s.step_blocks}>
              <div className={s.step_block} data-aos="fade-down-right">
                <img src={`assets/icons/${step.icon}`} alt="" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
        <Slider>
          {steps.map((step) => (
            <div key={step.id} className={s[`step_blocksa${step.id}`]}>
              <span className={s.step_span}>{step.id}</span>
              <div className={s.step_blocks}>
                <div className={s.step_block}>
                  <img src={`assets/icons/${step.icon}`} alt="" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
