import Link from "next/link";
import React from "react";
import s from "@/styles/components/layout/Header.module.scss";

export default function Header() {
  return (
    <header className={`${s.header} container`}>
      <div>Logo</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/calculator">Калькулятор</Link>
          </li>
          <li>
            <Link href="/steps">Этапы работы</Link>
          </li>
          <li>
            <Link href="/markets">Магазин</Link>
          </li>
          <li>
            <Link href="/about">О компании</Link>
          </li>
          <li>
            <Link href="/faq">Вопросы/ответы</Link>
          </li>
        </ul>
      </nav>
      <div className={s.auth_btn}>
        <Link href="/auth/register">
          <button className={s.register}>Регистрация</button>
        </Link>
        <Link href="/auth/login">
          <button className={s.login}>Вход</button>
        </Link>
      </div>
    </header>
  );
}
