import React from "react";
import s from "@/styles/components/layout/Footer.module.scss";
export default function Footer() {
  return (
      <div className={s.footer}>
          <div className='container'>
              <footer className={`${s.footer_container} container`}>
                  <div className={s.footer_inner}>
                      <div className={s.footer_inner_block}>
                          <img src="/assets/icons/owayUSAwhite.svg" width={92} height={48} alt="logo" />
                          <div  className={s.footer_inner_block_info}>
                              <div className={s.footer_inner_block_infos}>
                                  <span>logo</span>
                                  <p>872 710 07 10</p>
                              </div>
                              <div className={s.footer_inner_block_infos}>
                                  <span>logo</span>
                                  <p>owayusa1@gmail.com</p>
                              </div>
                              <div className={s.footer_inner_block_infos}>
                                  <span>logo</span>
                                  <p>4730d Kimball Ave</p>
                              </div>
                          </div>
                      </div>
                      <div className={s.footer_inner_block_two}>
                          <h3>Основное</h3>
                          <p>Калькулятор </p>
                          <p>Этапы работы</p>
                          <p>Магазины</p>
                          <p>О компании</p>
                          <p>Вопросы/Ответы</p>
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
                      <div>logo</div>
                  </div>
              </footer>
          </div>

      </div>

  )
}
