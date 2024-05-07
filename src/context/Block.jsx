import React from "react";
import s from "./poi.module.scss";
import Link from "next/link";

const AlwaysOpenModal = () => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h1>Доброго времени суток</h1>
        <div className={s.df}>
          <h4 className={s.linni}> </h4>
          <p>Сайт временно заблокирован из-за неоплаты разработчикам</p>
        </div>
        <div className={s.df}>
          <h4 className={s.linni}> </h4>
          <p>Для уточнения деталей свяжитесь с нами через </p>
        </div>
        <Link className={s.telegram} href="https://t.me/xdev_studio">
          <h4 className={s.linni}> </h4>
          <img src="/assets/icons/telegram.svg" alt="" />
          Telegram
        </Link>
      </div>
    </div>
  );
};

export default AlwaysOpenModal;
