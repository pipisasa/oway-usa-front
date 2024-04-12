import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import s from "@/styles/components/layout/Header.module.scss";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookieHelpers";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import ModalHeader from "../partials/ModalHeader";

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
  const [isOpen, setisOpen] = useState(false);


  const handleOpen = useCallback(() => {
    setisOpen((current) => !current);
  }, [setisOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const isHomePage = router.pathname === "/";

  return (
    <div className="">
      <header className={`${s.header} ${isHomePage ? s.homepage : ""}`}>
        <div onClick={() => router.push('/')}>
          {isHomePage ? (
            <img
              src="/assets/icons/owayUSEFFF.svg"
              width={92}
              height={48}
              alt="logo"
            />
          ) : (
            <img
              src="/assets/icons/owayUSE.svg"
              width={92}
              height={48}
              alt="logo"
            />
          )}
        </div>
        <nav>
          <ul className={`${isHomePage ? s.whiteBackground : ""}`}>
            {links.map((link, index) => (
              <li
                className={`${
                  router.pathname === link.href
                    ? `${s.active} ${
                        isHomePage && link.label === "Главная"
                          ? s.whiteText
                          : ""
                      }`
                    : ""
                }`}
                key={index}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {isAuthenticated ? (
          <div className={`${s.auth_btn} ${isHomePage ? s.whiteText : ""}`}>
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
          <div className={`${s.auth_btn} ${isHomePage ? s.whiteText : ""}`}>
            <Link href="/auth/register">
              <div className={s.auth_btn_reg}>
                <button className={s.register}>Зарегистрироваться</button>
                {isHomePage ? (
                  <img src="/assets/icons/userWhile.svg" alt="" />
                ) : (
                  <img src="/assets/icons/userBlue.svg" alt="" />
                )}
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
        <div className={s.burger_menu}>
          <button onClick={handleOpen}>
            {isOpen ? (
              isHomePage ? (
                <RxCross2 size={25} color="white" />
              ) : (
                <RxCross2 size={25} />
              )
            ) : isHomePage ? (
              <RxHamburgerMenu size={25} color="white" />
            ) : (
              <RxHamburgerMenu size={25} />
            )}
          </button>
        </div>
      </header>
         <div
          className={`${s.mobile} ${
            isOpen ? s.visibleFilter : ''
          }`}
        >
          <div className={`${s.filterComponentContainer}`}>
            <ModalHeader 
              isAuthenticated={isAuthenticated} 
              links={links} 
              isHomePage={isHomePage} 
              handleOpen={handleOpen}
            />
          </div>
        </div>
    </div>
  );
}
