import React from "react";
import s from "@/styles/shared/main/Feedback.module.scss";
import Button from "../partials/Button";

export default function Feedback() {
  return (
    <div className={s.feed}>
      <div className={`${s.feed_container} container`}>
        <div className={s.feed_info}>
          <div className={s.feed_header}>
            <span>Форма обратной связи</span>
            <h1>Есть еще интересующие Вас вопросы?</h1>
          </div>
          <div className={s.feed_input}>
            <div className={s.feed_input_block}>
              <div>
                <label htmlFor="">Имя</label>
                <input type="text" placeholder={"Введите ФИО"} />
              </div>
              <div>
                <label htmlFor="">Почта</label>
                <input type="text" placeholder={"http:"} />
              </div>
            </div>
            <div className={s.feed_input_blocks}>
              <label htmlFor="">Комментарий к вопросу</label>
              <input
                type="text"
                placeholder={
                  "Введите название товара, размер и прочую информацию"
                }
              />
            </div>
            <div className={s.feed_input_block1}>
              <label htmlFor="">
                Выбор социальной сети <strong>*</strong>
              </label>
              <div>
                <input type="text" placeholder={"Введите @username"} />
                <input
                  type="text"
                  placeholder={"Введите номер телефона с кодом своей страны"}
                />
              </div>
            </div>
          </div>
          <div>
            <Button button="Отправить" />
          </div>
        </div>
      </div>
      <div className={s.calc_img}>
        <img src="assets/images/houseBox.png" width={600} alt="" />
      </div>
    </div>
  );
}
