import Link from "next/link";
import React from "react";
import s from "@/styles/components/layout/Header.module.scss";
import {useRouter} from "next/router";

const links = [
  { href: "/", label: "Главная" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/steps", label: "Этапы работы" },
  { href: "/markets", label: "Магазин" },
  { href: "/about", label: "О компании" },
  { href: "/faq", label: "Вопросы/ответы" },
];

export default function Header() {
    const router = useRouter()
  return (
      <div className={s.header_back}>
          <header className={`${s.header} container`}>
              <div>
                  <img src="/assets/icons/owayUSE.svg" width={92} height={48} alt="logo" />
              </div>
              <nav>
                  <ul>
                      {links.map((link, index) => (
                          <li key={index}>
                              <Link className={router.pathname === link.href ? s.active : ""} href={link.href}>{link.label}</Link>
                          </li>
                      ))}
                  </ul>
              </nav>
              <div className={s.auth_btn}>
                  <Link href="/auth/register">
                      <button className={s.register}>Зарегистрироваться</button>
                  </Link>
                  <Link href="/auth/login">
                      <button className={s.login}>Вход</button>
                  </Link>
              </div>
          </header>
       </div>

  );
}
