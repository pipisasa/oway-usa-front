import React from "react";
import s from "@/styles/screens/main/AboutBusiness.module.scss";
export default function AboutBusiness() {
    return (
        <div className={`${s.mission} container`}>
            <span>Лучшие в своем деле</span>
            <div className={s.mission_header}>
                <h1>Перевозка коммерческих и частных грузов<br/>
                    из США и Турции в страны СНГ, из СНГ <br/>
                    в США через авиацию - без весовых,<br/>
                    размерных или категорийных ограничений.</h1>
                <div>
                    <div className={s.mission_header_info}>
                        <div></div>
                        <span><strong>Мы предоставляем</strong> полный спектр логистических услуг. Для вашего удобства доступны варианты доставки "от двери до двери" или до ближайшего ПВЗ, а также возможность забора из нашего пункта выдачи в каждой стране. </span>
                    </div>
                    <div className={s.mission_header_info}>
                        <div className={s.mission_header_info_div}></div>
                        <span>А так же уникальные предложении как « отправка из США сразу в 4 стран СНГ ( или прям страны расписать, РФ, КР, РК, УЗ  ) и потом дальше написать что было</span>
                    </div>
                </div>
            </div>
            <div className={s.mission_blocks}>
                <div className={s.mission_block}>
                    <img src="assets/icons/mission_notebook.svg" alt=""/>
                    <h3>Привлекательные <br/> цены</h3>
                </div>
                <div className={s.mission_block}>
                    <img src="assets/icons/mission_book.svg" alt=""/>
                    <h3>Адекватные<br/> сроки</h3>
                </div>
                <div className={s.mission_block}>
                    <img src="assets/icons/mission_box.svg" alt=""/>
                    <h3>Высочайшую <br/>надежность</h3>
                </div>
                <div className={s.mission_block}>
                    <img src="assets/icons/mission_box.svg" alt=""/>
                    <h3>Высокий уровень<br/> безопасности</h3>
                </div>
            </div>
        </div>
    );
}
