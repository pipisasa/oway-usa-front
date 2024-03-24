import React, { useState } from "react";
import s from "@/styles/users/ChangePassword.module.scss";

export default function ChangePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleCurrentPasswordSubmit = (e) => {
    e.preventDefault();
    setShowNewPassword(true);
  };

  return (
    <div className={s.change_password_block}>
      {!showNewPassword && (
        <form className={s.password} onSubmit={handleCurrentPasswordSubmit}>
          <div className={s.input}>
            <label htmlFor="">Ваш текущий пароль</label>
            <input type="password" placeholder="Введите пароль" />
          </div>
          <div className={s.btn}>
            <button type="submit">Изменить пароль</button>
          </div>
        </form>
      )}
      {showNewPassword && (
        <form className={s.new_password}>
          <div className={s.new_password_inputs}>
            <div className={s.input}>
              <label htmlFor="">Введите новый пароль</label>
              <input type="password" placeholder="Введите новый пароль" />
            </div>
            <div className={s.input}>
              <label htmlFor="">Введите пароль еще раз</label>
              <input type="password" placeholder="Введите пароль еще раз" />
            </div>
          </div>
          <div className={s.edit_submit_btns}>
            <button
              type="button"
              className={s.exit}
              onClick={() => setShowNewPassword(false)}
            >
              Отмена
            </button>
            <button type="submit" className={s.save}>
              Сохранить новый пароль
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
