import s from "@/styles/components/layout/Header.module.scss";
import Link from "next/link";

export default function ModalHeader ({isAuthenticated, links, handleOpen, isHomePage}){

    return(
        <div className={s.mobile}>
        <nav>
          <ul>
            {links.map((link) => (
              <li onClick={handleOpen} key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            {isAuthenticated ? (
              <div
                className={`${s.auth_btn} ${isHomePage ? s.whiteText : ""}`}
              >
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
              <div
                className={`${s.auth_btn} ${isHomePage ? s.whiteText : ""}`}
              >
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
          </ul>
        </nav>
      </div>
    )
}