import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";

export default function Step1({ onSubmit, setUserData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone_number: e.target.phone_number.value,
    });
    onSubmit();
  };
  return (
    <>
      <img className={s.steps} src="/assets/images/step1.svg" alt="step1" />
      <form className={s.register_form} onSubmit={handleSubmit}>
        <div className={s.register_inputs}>
          <div>
            <label htmlFor="">Имя</label>
            <input id="first_name" type="text" placeholder="Введите Имя" />
          </div>
          <div>
            <label htmlFor="">Фамилия</label>
            <input id="last_name" type="text" placeholder="Введите Фамилия" />
          </div>
          <div>
            <label htmlFor="">Номер телефона</label>
            <input
              id="phone_number"
              type="text"
              placeholder="Введите номер телефона"
            />
          </div>
        </div>
        <div className={s.register_btn}>
          <button type="submit">
            Продолжить
            <img src="/assets/icons/next-icon.svg" alt="next" />
          </button>
          <span>
            Вы имеете аккаунт? <Link href="/auth/login">Авторизаваться</Link>
          </span>
        </div>
      </form>
    </>
  );
}
