import React, { useEffect, useState } from "react";
import s from "@/styles/partials/Contact.module.scss";
import Button from "./Button";
import { getCookie } from "../../utils/cookieHelpers";
import { Slide, Slider } from "./Slider";

export default function Contacts() {
  const [state, setState] = useState();
  const isAuthenticated = !!getCookie("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      setState(true);
    }
  }, [isAuthenticated]);

  return (
    <div className={`${s.contacts} container`}>
      <p>Контакты</p>
      <h1>Связаться с нами</h1>
      <div className={s.contact_inner}>
        <div className={s.contact_inner_block} data-aos="fade-up-right">
          <h2>Главный офис</h2>
          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_address.svg" alt="" />
              <p>Address</p>
              <h3>4730d Kimball Ave</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_city.svg" alt="" />
              <p>City</p>
              <h3>Chicago</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_america.svg" alt="" />
              <p>State</p>
              <h3>Illinois</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_zip-code.svg" alt="" />
              <p>Zip code</p>
              <h3>60625</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_call.svg" alt="" />
              <p>Number</p>
              <h3>872 710 07 10 </h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_email.svg" alt="" />
              <p>Mail</p>
              <h3>owayusa1@gmail.com</h3>
            </div>
          </div>
        </div>

        <div className={s.contact_inner_block}>
          <h2>Пункты приема в Чикаго: </h2>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_address.svg" alt="" />
              <p>Address</p>
              <h3>1550 Oak Brook</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_city.svg" alt="" />
              <p>City</p>
              <h3>205</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_america.svg" alt="" />
              <p>State</p>
              <h3>Illinois</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_zip-code.svg" alt="" />
              <p>Zip code</p>
              <h3>60625</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/module.svg" alt="" />
              <p>Number</p>
              <h3>872 710 07 10 </h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_call.svg" alt="" />
              <p>Mail</p>
              <h3>owayusa1@gmail.com</h3>
            </div>
          </div>
        </div>

        <div className={s.contact_inner_block} data-aos="fade-up-left">
          <h3>Пункт приема онлайн заказов в Delaware</h3>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_address.svg" alt="" />
              <p>Address</p>
              <h3>4730d Kimball Ave</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_city.svg" alt="" />
              <p>City</p>
              <h3>Chicago</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_america.svg" alt="" />
              <p>State</p>
              <h3>Illinois</h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_zip-code.svg" alt="" />
              <p>Zip code</p>
              <h3>60625</h3>
            </div>
          </div>

          <div className={s.contact_inner_block_infos}>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/module.svg" alt="" />
              <p>Number</p>
              <h3>872 710 07 10 </h3>
            </div>
            <div className={s.contact_inner_block_info}>
              <img src="assets/icons/contact_call.svg" alt="" />
              <p>Mail</p>
              <h3>owayusa1@gmail.com</h3>
            </div>
          </div>
          {!state ? (
            <div className={s.contact_inner_block_auth}>
              <div className={s.contact_inner_block_auth_inner}>
                <span>
                  Адрес онлайн заказов в Delaware <br /> после регистрации
                </span>
                <Button path={"auth/login"} button="Зарегистрироваться" />
              </div>
            </div>
          ) : null}
        </div>
        <Slider>
          <div className={s.contact_inner_block1}>
            <h2>Главный офис</h2>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_address.svg" alt="" />
                <p>Address</p>
                <h3>4730d Kimball Ave</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_city.svg" alt="" />
                <p>City</p>
                <h3>Chicago</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_america.svg" alt="" />
                <p>State</p>
                <h3>Illinois</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_zip-code.svg" alt="" />
                <p>Zip code</p>
                <h3>60625</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_call.svg" alt="" />
                <p>Number</p>
                <h3>872 710 07 10 </h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_email.svg" alt="" />
                <p>Mail</p>
                <h3>owayusa1@gmail.com</h3>
              </div>
            </div>
          </div>

          <div className={s.contact_inner_block1}>
            <h2>Пункты приема в Чикаго: </h2>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_address.svg" alt="" />
                <p>Address</p>
                <h3>1550 Oak Brook</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_city.svg" alt="" />
                <p>City</p>
                <h3>205</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_america.svg" alt="" />
                <p>State</p>
                <h3>Illinois</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_zip-code.svg" alt="" />
                <p>Zip code</p>
                <h3>60625</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/module.svg" alt="" />
                <p>Number</p>
                <h3>872 710 07 10 </h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_call.svg" alt="" />
                <p>Mail</p>
                <h3>owayusa1@gmail.com</h3>
              </div>
            </div>
          </div>

          <div className={s.contact_inner_block1}>
            <h3>Пункт приема онлайн заказов в Delaware</h3>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_address.svg" alt="" />
                <p>Address</p>
                <h3>4730d Kimball Ave</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_city.svg" alt="" />
                <p>City</p>
                <h3>Chicago</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_america.svg" alt="" />
                <p>State</p>
                <h3>Illinois</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_zip-code.svg" alt="" />
                <p>Zip code</p>
                <h3>60625</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/module.svg" alt="" />
                <p>Number</p>
                <h3>872 710 07 10 </h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_call.svg" alt="" />
                <p>Mail</p>
                <h3>owayusa1@gmail.com</h3>
              </div>
            </div>
            {!state ? (
              <div className={s.contact_inner_block_auth}>
                <div className={s.contact_inner_block_auth_inner}>
                  <span>
                    Адрес онлайн заказов в Delaware <br /> после регистрации
                  </span>
                  <Button path={"auth/login"} button="Зарегистрироваться" />
                </div>
              </div>
            ) : null}
          </div>
        </Slider>
      </div>
    </div>
  );
}
