import React from "react";
import s from "@/styles/screens/main/MoreInfo.module.scss";
export default function MoreInfo(props) {
  return (
      <div  className={props?.menu === "menu" ? s.more_info : s.more_info_culc}>
        <div className={`${s.more_info_container} container`}>
        <div className={s.more_info_inner}>
            <p>Важная информация!</p>
            <h2>При заказе б/у товара, особенно с площадок, таких как eBay, рекомендуем оформить страховку.</h2>
            <div className={s.more_info_inner_span}>
                <div  className={s.more_info_inner_div}></div>
                <span>Особенно актуально для хрупких предметов — добавьте комментарий при оформлении заказа. Это обеспечит защиту от потери, недоставки или кражи вложений. </span>
            </div>
            <div className={s.more_info_inner_block}>
                <h3>Стоимость страховки зависит от ценности товара в посылке:</h3>
                <div className={s.more_info_inner_block_info}>
                    <div className={s.more_info_inner_block_infos}>
                        <div></div>
                        <p>до $100 — $3</p>
                    </div>
                    <div className={s.more_info_inner_block_infos}>
                        <div></div>
                        <p>до $500 — $5</p>
                    </div>
                    <div className={s.more_info_inner_block_infos}>
                        <div></div>
                        <p>до $1000 — $7.5</p>
                    </div>
                    <div className={s.more_info_inner_block_infos}>
                        <div></div>
                        <p>от $1000 — $15</p>
                    </div>
                </div>
            </div>
            <div className={s.more_info_inner_span}>
                <div></div>
                <span>Обязательна для всех служб доставки, кроме USPS и Новой Почты.</span>
            </div>
        </div>
        <div></div>
        </div>
      </div>
  );
}
