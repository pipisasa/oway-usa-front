import React from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function Step1({ onSubmit, setUserData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    setUserData(data);
    onSubmit();
  };

  return (
    <>
      <img className={s.steps} src="/assets/images/step1.svg" alt="step1" />
      <form
        className={s.register_form}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className={s.register_inputs}>
          <div className={errors.first_name ? s.error : ""}>
            <label htmlFor="first_name">Имя</label>
            <input
              id="first_name"
              type="text"
              placeholder="Введите Имя"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && <div>это поле обязательно к заполнению!</div>}
          </div>
          <div className={errors.last_name ? s.error : ""}>
            <label htmlFor="last_name">Фамилия</label>
            <input
              id="last_name"
              type="text"
              placeholder="Введите Фамилия"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && <div>это поле обязательно к заполнению!</div>}
          </div>
          <div className={errors.phone_number ? s.error : ""}>
            <label htmlFor="phone_number">Номер телефона</label>
            <input
              id="phone_number"
              type="text"
              placeholder="Введите номер телефона"
              {...register("phone_number", { required: true })}
            />
            {errors.phone_number && (
              <div>это поле обязательно к заполнению!</div>
            )}
          </div>
        </div>
        <div className={s.register_btn}>
          <button type="submit">
            Продолжить
            <img src="/assets/icons/next-icon.svg" alt="next" />
          </button>
          <span>
            Вы имеете аккаунт? <Link href="/auth/login">Авторизоваться</Link>
          </span>
        </div>
      </form>
    </>
  );
}
