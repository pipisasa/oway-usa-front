import React from "react";
import s from "@/styles/partials/Contact.module.scss";
export default function Contacts() {
  return (
      <div className={`${s.contacts} container`}>
        <p>Контакты</p>
        <h1>Связаться с нами</h1>
        <div className={s.contact_inner}>
          <div className={s.contact_inner_block}>
            <h2>Главный офис</h2>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>Address</p>
                  <h3>4730d Kimball Ave</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>City</p>
                  <h3>Chicago</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>State</p>
                  <h3>Illinois</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>Zip code</p>
                  <h3>60625</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>Number</p>
                  <h3>872 710 07 10 </h3>
              </div>
              <div className={s.contact_inner_block_info}>
                  <span>logo</span>
                  <p>Mail</p>
                  <h3>owayusa1@gmail.com</h3>
              </div>
            </div>
          </div>


            <div className={s.contact_inner_block}>
                <h2>Пункты приема в Чикаго: </h2>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Address</p>
                        <h3>1550 Oak Brook</h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>City</p>
                        <h3>205</h3>
                    </div>
                </div>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>State</p>
                        <h3>Illinois</h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Zip code</p>
                        <h3>60625</h3>
                    </div>
                </div>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Number</p>
                        <h3>872 710 07 10 </h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Mail</p>
                        <h3>owayusa1@gmail.com</h3>
                    </div>
                </div>
            </div>


            <div className={s.contact_inner_block}>
                <h3>Пункт  приема онлайн заказов в Delaware</h3>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Address</p>
                        <h3>4730d Kimball Ave</h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>City</p>
                        <h3>Chicago</h3>
                    </div>
                </div>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>State</p>
                        <h3>Illinois</h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Zip code</p>
                        <h3>60625</h3>
                    </div>
                </div>

                <div className={s.contact_inner_block_infos}>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Number</p>
                        <h3>872 710 07 10 </h3>
                    </div>
                    <div className={s.contact_inner_block_info}>
                        <span>logo</span>
                        <p>Mail</p>
                        <h3>owayusa1@gmail.com</h3>
                    </div>
                </div>
            </div>
        </div>

      </div>
  )
}
