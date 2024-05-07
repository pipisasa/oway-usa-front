import React from "react";
import s from "./poi.module.scss";
import Link from "next/link";

const AlwaysOpenModal = () => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h1>Доброго времени суток</h1>
        <p>
          {" "}
          <div className={s.linni}> </div>Сайт временно заблокирован из-за
          неоплаты разработчикам
        </p>
        <p>
          <div className={s.linni}> </div>
        </p>
        <p>
          <div className={s.linni}> </div>Для уточнения деталей свяжитесь с нами
          через{" "}
        </p>
        <Link className={s.telegram} href="https://t.me/xdev_studio">
          <div className={s.linni}> </div>
          <img src="/assets/icons/telegram.svg" alt="" />
          Telegram
        </Link>
      </div>
    </div>
  );
};

export default AlwaysOpenModal;
