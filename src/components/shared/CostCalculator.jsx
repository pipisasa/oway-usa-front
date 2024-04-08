import React, { useState, useEffect } from "react";
import s from "@/styles/shared/main/CostCalculator.module.scss";
import { useRouter } from "next/router";

export default function CostCalculator() {
  const [formData, setFormData] = useState({
    fromCountry: "",
    toCountry: "",
    width: 0,
    length: 0,
    height: 0,
    weight: 0,
    deliveryType: "",
  });
  const router = useRouter();
  const [cost, setCost] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const volumeWeight =
      (formData.width * formData.length * formData.height) / 6000;
    const actualWeight = Math.max(volumeWeight, formData.weight);
    let rate = 0;
    let time = "";

    if (formData.fromCountry === "США" && formData.toCountry === "РФ") {
      rate = formData.deliveryType === "стандарт" ? 16 : 12; // Предположение для экспресс-доставки
      time = formData.deliveryType === "стандарт" ? "10-15 дней" : "7-9 дней";
    } else if (
      formData.fromCountry === "Турция" &&
      formData.toCountry === "РФ"
    ) {
      rate = formData.deliveryType === "стандарт" ? 9.5 : 12;
      time = formData.deliveryType === "стандарт" ? "5-7 дней" : "2-3 дня";
    } else if (formData.fromCountry === "США" && formData.toCountry === "КР") {
      rate = 12; // Ставка за экспресс-доставку из США в КР
      time = "7-9 дней";
    }

    setCost(rate * actualWeight);
    setDeliveryTime(time);
  }, [formData]);

  const calcStyle = {};
  if (router.pathname === "/") {
    calcStyle.background = "var(--bue_light_2, #fff)";
    calcStyle.marginTop = "120px";
  } else if (router.pathname === "/calculator") {
    calcStyle.background = "var(--bue_light_2, #f7f9fc)";
  }

  return (
    <div className={s.calc} style={calcStyle}>
      <div className={`${s.calc_container} container`} data-aos="zoom-out-right">
        <h1>Калькулятор стоимости</h1>
        <div className={s.calc_inner}>
          <div className={s.calc_inner_forms}>
            <div className={s.calc_inner_forms_inputs}>
              <div className={s.select}>
                <label>Выбор страны отправки</label>
                <select
                  name="fromCountry"
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите страну
                  </option>
                  <option value="США">США</option>
                  <option value="Турция">Турция</option>
                </select>
              </div>
              <div className={s.select}>
                <label>Выбор страны получения</label>
                <select
                  name="toCountry"
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите страну
                  </option>
                  <option value="РФ">РФ</option>
                  <option value="КР">КР</option>
                </select>
              </div>
            </div>
            <div
              className={s.calc_inner_forms_inputs}
              style={{ marginTop: "20px" }}
            >
              <div>
                <label>Ширина (см)</label>
                <input
                  type="number"
                  name="width"
                  placeholder="Введите значение"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Длина (см)</label>
                <input
                  type="number"
                  name="length"
                  placeholder="Введите значение"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Высота (см)</label>
                <input
                  type="number"
                  name="height"
                  placeholder="Введите значение"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.calc_inner_forms_input}>
              <label>Ввод веса (кг)</label>
              <input
                type="number"
                name="weight"
                placeholder="Введите вес"
                onChange={handleChange}
              />
            </div>
            <div className={s.select} style={{ marginTop: "20px" }}>
              <label>Выбор типа доставки</label>
              <select
                name="deliveryType"
                onChange={handleChange}
                defaultValue=""
                style={{ marginTop: "16px" }}
              >
                <option value="" disabled>
                  Выберите тип доставки
                </option>
                <option value="стандарт">Стандарт</option>
                <option value="экспресс">Экспресс</option>
              </select>
            </div>
            <div className={s.calc_inner_forms_inputss}>
              <div>
                <label>Расчет стоимости</label>
                <input type="text" value={`$${cost.toFixed(2)}`} readOnly />
              </div>
              <div>
                <label>Вывод сроков доставки</label>
                <input type="text" value={deliveryTime} readOnly />
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
        <div className={s.calc_img}>
          <img src="assets/images/dron.png" width={370} height={370} alt="" />
        </div>
      </div>
    </div>
  );
}
