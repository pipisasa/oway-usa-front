import React, { useEffect, useState } from "react";
import s from "@/styles/screens/main/HeroSection.module.scss";
import Link from "next/link";
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
export default function HeroSection() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <div className={s.header_hero}>
        <div className={s.header_back}>
          <header className={`${s.header} container`}>
            <div>
              <img
                src="/assets/icons/owayUSAwhite.svg"
                width={92}
                height={48}
                alt="logo"
              />
            </div>
            <nav>
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      className={router.pathname === link.href ? s.active : ""}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
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
        <div className={s.heroSection_page}>
          <div className={`${s.heroSection_page_container} container`}>
            <div className={s.heroSection_info}>
              <h1>
                <strong>OWAY USA:</strong> Ваш мост к мировым покупам
              </h1>
              <div className={s.heroSection_info_span}>
                <div></div>
                <span>
                  Легко, надежно и выгодно доставляем товары из зарубежных{" "}
                  <br /> интернет-магазинов прямо к вам домой
                </span>
              </div>
              <button className={s.button}>
                <span>Закупиться</span>
                <img src="/assets/icons/rightIconwhite.svg" alt="logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={s.heroSection_img}>
        <img
          src="/assets/icons/earthAfrica.png"
          width={685}
          height={685}
          alt=""
        />
      </div>
    </>
  );
}
