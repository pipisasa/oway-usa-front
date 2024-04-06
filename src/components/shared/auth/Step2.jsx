import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";
import {useForm} from "react-hook-form";

export default function Step2({ onSubmit, setUserData }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmitHandler = (data) => {
    setUserData(data);
    onSubmit(data);
  };

  return (
      <>
        <img className={s.steps} src="/assets/images/step2.svg" alt="step1" />
        <form className={s.register_form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.register_inputs}>
            <div className={errors.email ? s.error : ''}>
              <label htmlFor="email">Электронная почта</label>
              <input id="email" type="email" placeholder="Введите Электронную почту" {...register("email", { required: true })} />
              {errors.email && <div>это поле обязательно к заполнению!</div>}
            </div>
           <div className={errors.password ? s.error : ''}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "minLength" && (
              <div>Пароль должен содержать не менее 6 символов!</div>
            )}
          </div>
          <div className={errors.password2 ? s.error : ''}>
            <label htmlFor="password2">Повторите пароль</label>
            <input
              id="password2"
              type="password"
              placeholder="Введите пароль повторно"
              {...register("password2", {
                required: true,
                validate: (value) => value === watch("password")
              })}
            />
            {errors.password2 && errors.password2.type === "validate" && (
              <div>Пароли должны совпадать!</div>
            )}
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

