import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";

export default function Step3({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    onSubmit(); // Переходим к следующему шагу
  };
  return (
    <>
      <img className={s.steps} src="/assets/images/step3.svg" alt="step1" />
      <form className={s.register_form} onSubmit={handleSubmit}>
        <div className={s.register_inputs}>
          <div>
            <label htmlFor="">Лицевая сторона паспорта</label>
            <input type="file" />
          </div>
          <div>
            <label htmlFor="">Обратная сторона паспорта</label>
            <input type="file" />
          </div>
        </div>
        <div className={s.register_btn}>
          <button type="submit">
            Завершить регистрацию
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
