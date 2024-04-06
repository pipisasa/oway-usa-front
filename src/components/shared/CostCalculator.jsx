import React from "react";
import s from "@/styles/shared/main/CostCalculator.module.scss";
import { useRouter } from "next/router";

export default function CostCalculator() {
  const router = useRouter();

  const calcStyle = {};
  if (router.pathname === "/") {
    calcStyle.background = "var(--bue_light_2, #fff)";
    calcStyle.marginTop = "120px";
  } else if (router.pathname === "/calculator") {
    calcStyle.background = "var(--bue_light_2, #f7f9fc)";
  }

  return (
    <div className={s.calc} style={calcStyle}>
      <div className={`${s.calc_container} container`}>
        <h1>Калькулятор стоимости</h1>
        <div className={s.calc_inner}>
          <div className={s.calc_inner_forms}>
            <div className={s.calc_inner_forms_inputs}>
              <div>
                <label htmlFor="">Выбор страны доставки</label>
                <input type="text" placeholder="Выберите страну" />
              </div>
              <div>
                <label htmlFor="">Выбор страны получения</label>
                <input type="text" placeholder="Выберите страну" />
              </div>
            </div>
            <div className={s.calc_inner_forms_input}>
              <label htmlFor="">Ввод веса</label>
              <input type="text" placeholder="Введите вес" />
            </div>
            <div className={s.calc_inner_forms_input}>
              <label htmlFor="">Выбор типа доставки</label>
              <input type="text" placeholder="Выберите тип доставки" />
            </div>
            <div className={s.calc_inner_forms_inputss}>
              <div>
                <label htmlFor="">Расчет стоимости</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Вывод сроков доставки</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className={s.calc_inner_infos}>
            <div className={s.calc_inner_info}>
              <img src="assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из США в РФ - <strong>1кг - 16$</strong> стандарт
                </h3>
                <p>Срок доставки 10-15 дней</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из Турции в РФ - <strong>1кг - 9.5$</strong> стандарт
                </h3>
                <p>Срок доставки 5-7 дней</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из Туркции в РФ -<strong> 1кг - 12$</strong> экспресс
                </h3>
                <p>Срок доставки 2-3 дня</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из США в КР - <strong>1кг - 12$</strong> экспресс
                </h3>
                <p>Срок доставки 7-9 дня</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.calc_img}>
          <img src="assets/images/dron.png" width={370} height={370} alt="" />
        </div>
      </div>
    </div>
  );
}
