import React from "react";
import s from "@/styles/shared/main/TrackNumber.module.scss";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookieHelpers";

export default function TrackNumber() {
  const router = useRouter();

  const handleClick = () => {
    const token = getCookie("accessToken");

    if (!token) {
      router.push("/auth/login");
    } else {
      console.log("Пользователь авторизован, продолжаем работу");
    }
  };

  return (
    <div className={`${s.track} container`} data-aos="zoom-out-right"
    data-aos-duration="600">
      <div className={s.track_info}>
        <div>
          <span>Отслеживание доставки</span>
          <h1>Отслеживайте свою доставку по введенному трек-номеру</h1>
        </div>
        <div className={s.track_info_input}>
          <span>Трек-номер</span>
          <input type="text" placeholder="Введите трек номер" />
        </div>
        <button onClick={handleClick} className={s.button}>
          Проверить
        </button>
      </div>
      <div className={s.track_img} data-aos="zoom-in-down">
        <img src="assets/images/dron.png" alt="" />
      </div>
    </div>
  );
}
