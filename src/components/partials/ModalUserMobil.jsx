import s from "@/styles/users/UserMobileHeaeder.module.scss";
import Link from "next/link";

export default function ModalUserMobil ({links, isActive, logout,toggleNav}) {
    return (
        <ul>
          {links.map((link) => (
            <li
              className={isActive(link.href) ? s.active : ""}
              key={link.href}
              onClick={toggleNav}
            >
              <img
                className={isActive(link.href) ? s.active_icon : ""}
                src={link.icons}
                alt=""
              />
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <button onClick={logout} className={s.logout}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            Выйти
          </button>
        </ul>
    )
}