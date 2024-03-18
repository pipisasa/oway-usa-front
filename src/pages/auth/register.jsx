import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";

export default function Register() {
  return (
    <main className={s.register_page}>
      <h1>Регистрация</h1>
      <form className={s.register_form}>
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
          <div>
            <label htmlFor="">Почта</label>
            <input type="email" placeholder="Введите почту" />
          </div>
          <div>
            <label htmlFor="">Пароль</label>
            <input type="password" placeholder="Введите пароль" />
          </div>
          <div>
            <label htmlFor="">Повторите пароль</label>
            <input type="password" placeholder="Введите пароль повторно" />
          </div>
        </div>
        <div className={s.register_btn}>
          <button type="submit">Зарегистрироваться</button>
          <span>
            Вы имеете аккаунт? <Link href="/auth/login">Авторизаваться</Link>
          </span>
        </div>
      </form>
    </main>
  );
}
