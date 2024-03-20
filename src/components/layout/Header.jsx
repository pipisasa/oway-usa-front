import Link from "next/link";
import React from "react";
import s from "@/styles/components/layout/Header.module.scss";

const links = [
  { href: "/", label: "Главная" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/steps", label: "Этапы работы" },
  { href: "/markets", label: "Магазин" },
  { href: "/about", label: "О компании" },
  { href: "/faq", label: "Вопросы/ответы" },
];

export default function Header() {
  return (
      <header className={`${s.header} container`}>
        <div>
          <img src="/assets/icons/owayUSE.svg" width={92} height={48} alt="logo" />
        </div>
        <nav>
          <ul>
            {links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
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
