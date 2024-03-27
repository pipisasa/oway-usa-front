import React from "react";
import s from "@/styles/shared/main/TrackNumber.module.scss";

export default function TrackNumber() {
  return (
      <div className={`${s.track} container`}>
        <div className={s.track_info}>
            <div>
                <span>Отслеживание доставки</span>
                <h1>Отслеживайте свою доставку по введенному трек-номеру</h1>
            </div>
          <div className={s.track_info_input}>
            <span>Трек-номер</span>
            <input type="text" placeholder="Введите трек номер"/>
          </div>
          <button className={s.button}>Проверить</button>
        </div>
        <div className={s.track_img}>
            <img src="assets/images/dron.png" alt=""/>
        </div>
      </div>
  )
}
