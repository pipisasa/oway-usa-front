import Link from "next/link";
import React from "react";

export default function ConfirmRegistrations() {
  return (
    <>
      <img className={s.steps} src="/assets/images/step3.svg" alt="step1" />
      <form className={s.register_form}>
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
            Подтвердить аккаунт
            <img src="/assets/icons/next-icon.svg" alt="next" />
          </button>
        </div>
      </form>
    </>
  );
}
