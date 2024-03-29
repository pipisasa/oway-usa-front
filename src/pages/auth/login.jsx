import React from "react";
import s from "@/styles/pages/auth/Login.module.scss";
import Link from "next/link";

export default function Login() {
  return (
    <main className={s.login_page}>
      <img className={s.left_img} src="/assets/images/40.png" alt="" />
      <section className={s.login_section}>
        <div className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        <h1>Авторизация</h1>
        <form className={s.login_form}>
          <div className={s.login_inputs}>
            <div>
              <label htmlFor="">Электронная почта</label>
              <input type="email" placeholder="Введите почту" />
            </div>
            <div>
              <label htmlFor="">Пароль</label>
              <input type="password" placeholder="Введите пароль" />
            </div>
          </div>
          <div className={s.forgot_pass}>
            <div className={s.remember_me}>
              <input type="checkbox" />
              <label htmlFor="">Запомнить пароль</label>
            </div>
            <Link href="/">Забыли пароль?</Link>
          </div>
          <div className={s.ili}>
            <div></div>
            <span>Или</span>
            <div></div>
          </div>
          <div className={s.google}>
            <img src="/assets/icons/google.svg" alt="google" />
            <p>Google</p>
          </div>
          <div className={s.submit_login}>
            <button type="submit">
              Авторизоваться
              <img src="/assets/icons/next-icon.svg" alt="next" />
            </button>
            <span>
              Не имеете аккаунта?{" "}
              <Link href="/auth/register">Создать аккаунт.</Link>
            </span>
          </div>
        </form>
      </section>
      <img className={s.right_img} src="/assets/images/39.png" alt="" />
    </main>
  );
}
