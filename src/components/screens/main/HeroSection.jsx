import React, { useEffect } from "react";
import s from "@/styles/screens/main/HeroSection.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js";
    script.onload = () => {
      const gradient = new Gradient();
      gradient.initGradient("#canvas");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleButtonClick = () => {
    const token = getCookie("accessToken");
    if (token) {
      router.push("/markets");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div className={s.header_hero}>
        <div className={s.heroSection_page} data-aos="fade-up">
          <div className={`${s.heroSection_page_container} container`}>
            <div className={s.heroSection_info}>
              <h1>
                <strong>OWAY USA:</strong> Ваш мост к мировым покупкам
              </h1>
              <div className={s.heroSection_info_span}>
                <div></div>
                <span>
                  Легко, надежно и выгодно доставляем товары из зарубежных
                  <br />
                  интернет-магазинов прямо к вам домой
                </span>
              </div>
              <button onClick={handleButtonClick} className={s.button}>
                <span>Закупиться</span>
                <img src="/assets/icons/rightIconwhite.svg" alt="logo" />
              </button>
            </div>
          </div>
        </div>
        <div className="background--custom">
          <canvas
            id="canvas"
            // style={{ width: "calc(100% - 100px)" }}
          />
        </div>
      </div>
      <div className={s.heroSection_img} data-aos="fade-left">
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
