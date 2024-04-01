import React, { useState } from "react";
import s from "@/styles/shared/main/Calculator.module.scss";
import Button from "../partials/Button";

export default function Calculator() {
  const [countryFrom, setCountryFrom] = useState("");
  const [countryTo, setCountryTo] = useState("");
  const [weight, setWeight] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [cost, setCost] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const calculateCostAndTime = () => {
    console.log('fhjdsd')
    if (
      countryFrom === "USA" &&
      countryTo === "Russian" &&
      deliveryType === "standart"
    ) {
      setCost(16 * weight);
      setDeliveryTime("10-15 дней");
    } else if (
      countryFrom === "Turkey" &&
      countryTo === "Russian" &&
      deliveryType === "standart"
    ) {
      setCost(9.5 * weight);
      setDeliveryTime("5-7 дней");
    } else if (
      countryFrom === "Turkey" &&
      countryTo === "Russian" &&
      deliveryType === "express"
    ) {
      setCost(12 * weight);
      setDeliveryTime("2-3 дня");
    } else if (
      countryFrom === "USA" &&
      countryTo === "Kyrgzstan" &&
      deliveryType === "express"
    ) {
      setCost(12 * weight);
      setDeliveryTime("7-9 дней");
    } else {
      setCost("");
      setDeliveryTime("");
    }
  };

  return (
    <div className={`${s.calc} container`}>
      <h1>Калькулятор стоимости</h1>
      <div className={s.calc_inner}>
        <div className={s.calc_inner_forms}>
          <div className={s.calc_inner_forms_inputs}>
            <div className={s.country_select}>
              <label htmlFor="">Выбор страны доставки</label>
              <select
                id="countryFrom"
                name="countryFrom"
                value={countryFrom}
                onChange={(e) => setCountryFrom(e.target.value)}
              >
                <option value="">Выберите страну</option>
                <option value="USA">США</option>
                <option value="Turkey">Турция</option>
                <option value="Russian">Россия</option>
                <option value="Kyrgzstan">Кыргызстан</option>
              </select>
            </div>
            <div className={s.country_select}>
              <label htmlFor="">Выбор страны получения</label>
              <select
                id="countryTo"
                name="countryTo"
                value={countryTo}
                onChange={(e) => setCountryTo(e.target.value)}
              >
                <option value="">Выберите страну</option>
                {countryFrom === "USA" ? (
                  <>
                    <option value="Russian">Россия</option>
                    <option value="Kyrgzstan">Кыргызстан</option>
                  </>
                ) : countryFrom === "Turkey" ? (
                  <>
                    <option value="Russian">Россия</option>
                    <option value="Kyrgzstan">Кыргызстан</option>
                  </>
                ) : (
                  <>
                    <option value="USA">США</option>
                    <option value="Turkey">Турция</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className={s.calc_inner_forms_input}>
            <label htmlFor="">Ввод веса</label>
            <input
              type="text"
              placeholder="Введите вес"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className={s.calc_inner_forms_input}>
            <label htmlFor="">Выбор типа доставки</label>
            <select
              id="deleveryType"
              name="deleveryType"
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
            >
              <option value="">Выберите тип доставки</option>
              <option value="standart">Стандарт</option>
              <option value="express">Экспресс</option>
            </select>
          </div>
          <div className={s.calc_inner_forms_inputss}>
            <div>
              <label htmlFor="">Расчет стоимости</label>
              <input type="text" value={cost} readOnly />
            </div>
            <div>
              <label htmlFor="">Вывод сроков доставки</label>
              <input type="text" value={deliveryTime} readOnly />
            </div>
          </div>
          <Button button='Рассчитать' onClick={calculateCostAndTime}/>
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
                Доставка из Турции в РФ -<strong> 1кг - 12$</strong> экспресс
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
    </div>
  );
}
