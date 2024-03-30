import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";

export default function Step2({ onSubmit, setUserData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
    });
    onSubmit(); // Здесь вызывается submitRegistration из Register
  };
  return (
    <>
      <img className={s.steps} src="/assets/images/step2.svg" alt="step1" />
      <form className={s.register_form} onSubmit={handleSubmit}>
        <div className={s.register_inputs}>
          <div>
            <label htmlFor="">Электронная почта</label>
            <input
              id="email"
              type="email"
              placeholder="Введите Электронную почту"
            />
          </div>
          <div>
            <label htmlFor="">Пароль</label>
            <input id="password" type="password" placeholder="Введите пароль" />
          </div>
          <div>
            <label htmlFor="">Повторите пароль</label>
            <input
              id="password2"
              type="password"
              placeholder="Введите пароль повторно"
            />
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
