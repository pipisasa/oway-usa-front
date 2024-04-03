import Link from "next/link";
import React, { useEffect, useState } from "react";
import s from "@/styles/components/layout/Header.module.scss";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookieHelpers";

const links = [
  { href: "/", label: "Главная" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/steps", label: "Этапы работы" },
  { href: "/markets", label: "Магазин" },
  { href: "/about", label: "О компании" },
  { href: "/faq", label: "Вопросы/ответы" },
  { href: "/services", label: "Услуги" },
];

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className={s.header_back}>
      <header className={`${s.header} container`}>
        <div>
          <img
            src="/assets/icons/owayUSE.svg"
            width={92}
            height={48}
            alt="logo"
          />
        </div>
        <nav>
          <ul>
            {links.map((link, index) => (
              <li
                className={router.pathname === link.href ? s.active : ""}
                key={index}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {isAuthenticated ? (
          <div className={s.auth_btn}>
            <Link href="/user">
              <div>
                <button className={s.login}>
                  <span>Личный кабинет</span>
                  <img src="/assets/icons/rightIcon.svg" alt="" />
                </button>
              </div>
            </Link>
          </div>
        ) : (
          <div className={s.auth_btn}>
            <Link href="/auth/register">
              <div className={s.auth_btn_reg}>
                <button className={s.register}>Зарегистрироваться</button>
                <img src="/assets/icons/userBlue.svg" alt="" />
              </div>
            </Link>
            <Link href="/auth/login">
              <div>
                <button className={s.login}>
                  <span>Вход</span>
                  <img src="/assets/icons/rightIcon.svg" alt="" />
                </button>
              </div>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
