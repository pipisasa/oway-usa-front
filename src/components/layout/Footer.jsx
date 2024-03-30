import React from "react";
import s from "@/styles/components/layout/Footer.module.scss";
import Link from "next/link";
export default function Footer() {
  return (
    <div className={s.footer}>
      <div className="container">
        <footer className={`${s.footer_container} container`}>
          <div className={s.footer_inner}>
            <div className={s.footer_inner_block}>
              <img
                src="/assets/icons/owayUSAwhite.svg"
                width={92}
                height={48}
                alt="logo"
              />
              <div className={s.footer_inner_block_info}>
                <div className={s.footer_inner_block_infos}>
                  <img src="/assets/icons/footer/phone.svg" alt="phone" />
                  <p>872 710 07 10</p>
                </div>
                <div className={s.footer_inner_block_infos}>
                  <img src="/assets/icons/footer/email.svg" alt="email" />
                  <p>owayusa1@gmail.com</p>
                </div>
                <div className={s.footer_inner_block_infos}>
                  <img
                    src="/assets/icons/footer/locations.svg"
                    alt="location"
                  />
                  <p>4730d Kimball Ave</p>
                </div>
              </div>
            </div>
            <div className={s.footer_inner_block_two}>
              <h3>Основное</h3>
              <nav>
                <ul>
                  <li>
                    <Link href="/calculator">Калькулятор</Link>
                  </li>
                  <li>
                    <Link href="/steps">Этапы работы</Link>
                  </li>
                  <li>
                    <Link href="/markets">Магазины</Link>
                  </li>
                  <li>
                    <Link href="/about">О компании</Link>
                  </li>
                  <li>
                    <Link href="/faq">Вопрос/Ответы</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={s.footer_inner_block_two}>
              <h3>Информация</h3>
              <p>Общие положение и условия </p>
              <p>Договоро о международных грузоперевозках</p>
              <p>Политика конфиденциальности</p>
              <p>Заявление о возврате средств</p>
              <p>Реквизиты компании</p>
            </div>
          </div>
          <div className={s.footer_inner_down}>
            <span>2024 OWAY USA. All Rights Reserved</span>

            <div className={s.social}>
              <Link target="__blank" href="https://www.instagram.com/oway_usa">
                <img src="/assets/icons/footer/instagram.svg" alt="instagram" />
              </Link>
              <Link target="__blank" href="https://youtube.com/@owayusa">
                <img src="/assets/icons/footer/youtube.svg" alt="youtube" />
              </Link>
              <Link target="__blank" href="https://www.tiktok.com/@owayusa1">
                <img src="/assets/icons/footer/tik-tok.svg" alt="tiktok" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
