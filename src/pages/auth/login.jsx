import React, { useState } from "react";
import s from "@/styles/pages/auth/Login.module.scss";
import Link from "next/link";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "next/router";

export default function Login() {
  const { login, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className={s.login_page}>
      <img className={s.left_img} src="/assets/images/40.png" alt="" />
      <section className={s.login_section}>
        <div onClick={() => router.push("/")} className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        <h1>Авторизация</h1>
        <form className={s.login_form} onSubmit={handleLogin}>
          <div className={s.login_inputs}>
            <div>
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                placeholder="Введите почту"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className={s.error}>{error}</p>}{" "}
          <div className={s.forgot_pass}>
            <div className={s.remember_me}>
              <input type="checkbox" />
              <label htmlFor="remember-me">Запомнить пароль</label>
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
