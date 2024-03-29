import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";

export default function Step1({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    onSubmit(); // Переходим к следующему шагу
  };
  return (
    <>
      <img className={s.steps} src="/assets/images/step1.svg" alt="step1" />
      <form className={s.register_form} onSubmit={handleSubmit}>
        <div className={s.register_inputs}>
          <div>
            <label htmlFor="">Имя</label>
            <input type="text" placeholder="Введите Имя" />
          </div>
          <div>
            <label htmlFor="">Фамилия</label>
            <input type="text" placeholder="Введите Фамилия" />
          </div>
          <div>
            <label htmlFor="">Номер телефона</label>
            <input type="text" placeholder="Введите номер телефона" />
          </div>
        </div>
        <div className={s.register_btn}>
          <button type="submit">
            Продолжить
            <img src="/assets/icons/next-icon.svg" alt="next" />
          </button>
          <span>
            Вы имеете аккаунт? <Link href="/auth/login">Авторизаваться</Link>
          </span>
        </div>
      </form>
    </>
  );
}
