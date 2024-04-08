import React, { useEffect, useState } from "react";
import s from "@/styles/screens/main/HeroSection.module.scss";
import { getCookie } from "@/utils/cookieHelpers";

export default function HeroSection() {
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
