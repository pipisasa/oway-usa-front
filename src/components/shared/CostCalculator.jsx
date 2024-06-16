import React, { useState, useEffect } from "react";
import s from "@/styles/shared/main/CostCalculator.module.scss";
import { useRouter } from "next/router";
import CustomSelect from "../partials/CustomSelect";

export default function CostCalculator() {
  const [formData, setFormData] = useState({
    fromCountry: "",
    toCountry: "",
    width: 0,
    length: 0,
    height: 0,
    weight: 0,
    deliveryType: "стандарт",
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
    const width = parseFloat(formData.width);
    const length = parseFloat(formData.length);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const volumeWeight = (width * length * height) / 6000;
    const actualWeight = Math.max(volumeWeight, weight);

    let rate = 0;
    let time = "";

    if (formData.fromCountry === "США" && formData.toCountry === "Россия") {
      rate = 16;
      time = "12-17 дней";
    } else if (
      formData.fromCountry === "США" &&
      formData.toCountry === "Кыргызстан"
    ) {
      rate = 12;
      time = "7-9 дней";
    } else if (
      formData.fromCountry === "Турция" &&
      formData.toCountry === "Россия"
    ) {
      rate = formData.deliveryType === "стандарт" ? 9.5 : 12;
      time = formData.deliveryType === "стандарт" ? "5-7 дней" : "2-3 дня";
    }

    setCost(rate * actualWeight);
    setDeliveryTime(time);
  }, [formData]);

  const calcStyle = {};
  if (router.pathname === "/") {
    calcStyle.background = "var(--bue_light_2, #fff)";
  } else if (router.pathname === "/calculator") {
    calcStyle.background = "var(--bue_light_2, #f7f9fc)";
    calcStyle.paddingTop = "50px";
    calcStyle.paddingBottom = "50px";
  }

  const marginTopStyle =
    router.pathname === "/user/calculator"
      ? { marginTop: "0px" }
      : { marginTop: "120px" };

  const showHeader = router.pathname !== "/user/calculator";

  return (
    <div className={s.calc} style={calcStyle ? marginTopStyle : ""}>
      <div
        className={`${s.calc_container} container`}
        data-aos="zoom-out-right"
      >
        {showHeader && <h1>Калькулятор стоимости</h1>}
        <div className={s.calc_inner}>
          <div className={s.calc_inner_forms}>
            <div className={s.calc_inner_forms_inputs}>
              <div className={s.select}>
                <label>Выбор страны отправки</label>
                <CustomSelect
                  options={["США", "Турция"]}
                  value={formData.fromCountry || "Выберите страну"}
                  onChange={(value) =>
                    handleChange({ target: { name: "fromCountry", value } })
                  }
                />
              </div>
              <div className={s.select}>
                <label>Выбор страны получения</label>
                <CustomSelect
                  options={["Россия", "Кыргызстан"]}
                  value={formData.toCountry || "Выберите страну"}
                  onChange={(value) =>
                    handleChange({ target: { name: "toCountry", value } })
                  }
                />
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
              {formData.fromCountry === "Турция" && (
                <div div className={s.select}>
                  <div className={s.calc_inner_forms_inputs}>
                    <div className={s.select}>
                      <label>Выбор типа доставки</label>
                      <CustomSelect
                        options={["стандарт", "экспресс"]}
                        value={formData.deliveryType || "Выберите"}
                        onChange={(value) =>
                          handleChange({
                            target: { name: "deliveryType", value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
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
              <img src="/assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из США в Россию - <strong>1кг - 16$</strong> стандарт
                </h3>
                <p>Срок доставки 12-17 дней</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="/assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из США в Кыргызстан - <strong>1кг - 12$</strong>{" "}
                  стандарт
                </h3>
                <p>Срок доставки 7-9 дня</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="/assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из Турции в Россию - <strong>1кг - 9.5$</strong>{" "}
                  стандарт
                </h3>
                <p>Срок доставки 5-7 дней</p>
              </div>
            </div>
            <div className={s.calc_inner_info}>
              <img src="/assets/icons/calc_icon.svg" alt="" />
              <div>
                <h3>
                  Доставка из Турции в Россию -<strong> 1кг - 12$</strong>{" "}
                  экспресс
                </h3>
                <p>Срок доставки 2-3 дня</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.calc_img}>
          <img src="/assets/images/dron.png" width={370} height={370} alt="" />
        </div>
      </div>
    </div>
  );
}
