import React, { useState } from "react";
import s from "@/styles/users/ChangePassword.module.scss";
import useChangePassword from "@/hooks/user/useChangePassword";

export default function ChangePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [old_password, setOld_password] = useState('');
  const { changePass, isLoading, error } = useChangePassword(); // Используем хук useChangePassword

  const handleCurrentPasswordSubmit = async (e) => {
    e.preventDefault();
    setShowNewPassword(true);
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    // Достаем значения из формы
    const newPassword = e.target.elements.new_password?.value;
    const confirmPassword = e.target.elements.confirm_new_password?.value;

    // Вызываем функцию для изменения пароля
    await changePass({ old_password: old_password, new_password: newPassword, confirm_new_password: confirmPassword });
    setShowNewPassword(false)
  };

  return (
      <div className={s.change_password_block}>
        {!showNewPassword && (
            <form className={s.password} onSubmit={handleCurrentPasswordSubmit}>
              <div className={s.input}>
                <label htmlFor="">Ваш текущий пароль</label>
                <input value={old_password} onChange={(e) => setOld_password(e.target.value)} name="old_password" type="password" placeholder="Введите пароль" />
              </div>
              <div className={s.btn}>
                <button type="submit">Изменить пароль</button>
              </div>
            </form>
        )}
        {showNewPassword && (
            <form className={s.new_password} onSubmit={handleNewPasswordSubmit}>
              <div className={s.new_password_inputs}>
                <div className={s.input}>
                  <label htmlFor="">Введите новый пароль</label>
                  <input name="new_password" type="password" placeholder="Введите новый пароль" />
                </div>
                <div className={s.input}>
                  <label htmlFor="">Введите пароль еще раз</label>
                  <input name="confirm_new_password" type="password" placeholder="Введите пароль еще раз" />
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
