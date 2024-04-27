import React from "react";
import s from "@/styles/components/layout/Footer.module.scss";
import Link from "next/link";
import Illinois from "@/pages/size-chart/Illinois";

export default function Footer() {
  const Mobile = () => {
    return (
      <div className={s.footer_inner_block1}>
        <div className={s.footer_inner_block_two1}>
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
        <div className={s.footer_inner_block_two1}>
          <h3>Информация</h3>
          <Link href="/">Общие положение и условия </Link>
          <Link href="/">Договоро о международных грузоперевозках</Link>
          <Link href="/">Политика конфиденциальности</Link>
          <Link href="/">Заявление о возврате средств</Link>
          <Link href="/">Реквизиты компании</Link>
          <Link href="/size-chart">Таблица размеров</Link>
        </div>
      </div>
    );
  };

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
                  <p>4730DN Kimball Ave</p>
                </div>
              </div>
            </div>
            <div className={s.footer_inner_block_two}>
              <h3>Основное</h3>
              <nav>
                <ul>
                  <li>
                    <Link href="/about">О компании</Link>
                  </li>
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
                    <Link href="/faq">Вопрос/Ответы</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={s.footer_inner_block_two}>
              <h3>Информация</h3>
              <Link href="/">Общие положение и условия </Link>
              <Link href="/">Договоро о международных грузоперевозках</Link>
              <Link href="/">Политика конфиденциальности</Link>
              <Link href="/">Заявление о возврате средств</Link>
              <Link href="/">Реквизиты компании</Link>
              <Link href="/size-chart">Таблица размеров</Link>
              <Illinois/> 
            </div>
            <Mobile />
          </div>
          <div className={s.footer_inner_down}>
            <span>2024 OWAY USA. All Rights Reserved</span>

            <div className={s.social}>
              <Link target="__blank" href="https://www.instagram.com/oway_usa">
                <img src="/assets/icons/instagram4.svg" alt="instagram" />
              </Link>
              <Link target="__blank" href="https://youtube.com/@owayusa">
                <img src="/assets/icons/youtube2.svg" alt="youtube" />
              </Link>
              <Link target="__blank" href="https://www.tiktok.com/@owayusa1">
                <img src="/assets/icons/tiktok.svg" alt="tiktok" />
              </Link>
              <Link
                className={s.telegram}
                target="__blank"
                href="https://t.me/owayusa_chat"
              >
                <img
                  src="/assets/icons/brand_telegram_icon_151521.svg"
                  alt="tiktok"
                />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
