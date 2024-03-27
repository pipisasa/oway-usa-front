import React from "react";
import s from "@/styles/screens/main/StepWork.module.scss";
export default function StepWork() {

  return (
      <div className={s.step}>
        <div className={`${s.step_container} container`}>
            <span>Этапы работы</span>
            <h2>Всего 5 простых шага</h2>
            <div className={s.step_img}>
                <img src="assets/images/step_box.png" width={494} height={494} alt=""/>
            </div>
            <div className={s.step_blocks1}>
                <span className={s.step_span}>1</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_notebook.svg" alt=""/>
                        <h3>Регистрация на сайте OWAY USA </h3>
                        <p>Мы разработали уникальный и удобный сайт для всех пользователей. В которой каждый день опубликуем полезные статьи, скидки, новинки и другие полезные новости. У вас будет доступ к личному кабинету для управления заказами. </p>
                    </div>
                </div>
            </div>
            <div className={s.step_blocks2}>
                <span className={s.step_span}>2</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_adress.svg" alt=""/>
                        <h3>Получить персональный адрес в США и Турции </h3>
                        <p>Для вас мы даем личный и бесплатный  адрес в США и Турции. Вам будет доступно все наши склады  для оформления ваших заказов. </p>
                    </div>
                </div>
            </div>
            <div className={s.step_blocks3}>
                <span className={s.step_span}>3</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_box_mini.svg" alt=""/>
                        <h3>Регистрация на сайте OWAY USA </h3>
                        <p>Укажите полученный адрес при оформлении покупки. С нами вы освобождены от налога </p>
                        <span>с продаж и экономите 5-9% на каждой покупке</span>
                        <p>При оформлении заказа в интернет-магазине указываются примерные сроки доставки каждого товара до склада OWAY USA, а также предоставляется трекинг-номер для отслеживания статуса доставки.</p>

                    </div>
                </div>
            </div>
            <div className={s.step_blocks4}>
                <span className={s.step_span}>4</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_house.svg" alt=""/>
                        <h3>Регистрация на сайте OWAY USA </h3>
                        <p>Каждый этап доставки вашей посылки вы можете отследить в личном кабинете. После прибытия всех купленных товаров на наш склад, вы сможете увидеть их в личном кабинете и отправить одной посылкой домой или объединить несколько покупок из разных магазинов. Так же после прибытие в город получателя вы будет получать уведомления.</p>
                        <span>Мы также предлагаем услуги проверки работоспособности и соответствия заказанным товарам, удаления лишнего веса, измерения параметров и фотографирования. Для использования этих услуг необходимо добавить соответствующие запросы в личном кабинете (ссылка на личный кабинет или ссылка на платные и бесплатные запросы ) Специальные запросы могут быть созданы для входящих посылок до их отправки.</span>
                    </div>
                </div>
            </div>
            <div className={s.step_blocks5}>
                <span className={s.step_span}>5</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_truck.svg" alt=""/>
                        <h3>Регистрация на сайте OWAY USA </h3>
                        <p>Как только посылка будет упакована, вы получите инвойс на оплату доставки от нашего склада до вашего города. После этого вы сможете произвести оплату за доставку вашей посылки.</p>
                        <span>Если желаете, вы также можете застраховать посылку ( ссылка на страницу с подробной инфо о страховке ) . Это все, что требуется сделать. Остается лишь дождаться получения посылки!  </span>
                    </div>
                </div>
            </div>
            <div className={s.step_blocks6}>
                <span className={s.step_span}>6</span>
                <div className={s.step_blocks}>
                    <div className={s.step_block}>
                        <img src="assets/icons/step_movers.svg" alt=""/>
                        <h3>Регистрация на сайте OWAY USA </h3>
                        <p>При создании отправки выберите наиболее удобный для вас метод доставки: в почтовое отделение, до пункта выдачи заказов или доставку курьером прямо домой. Сразу после отправки посылки со склада в вашем личном кабинете будет доступен трекинг-номер для отслеживания. На каждом этапе вы будете получать уведомления о состоянии груза. Кроме того, по прибытии посылки вы получите уведомление.</p>
                        <span>Для возможного решения вопросов по страховым случаям - нужно снять видео распаковки после получения посылки</span>
                        <span>А чтобы получить скидочный купон на следующую доставку, достаточно оставить отзыв с фотографиями и поделиться опытом о доставке вашей посылки.</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}
