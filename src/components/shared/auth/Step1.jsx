import React, { useState } from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Step1({ onSubmit, setUserData }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // Валидация имени на английские буквы
  const validateFirstName = (value) => {
    if (!/^[A-Za-z]*$/.test(value)) {
      setFirstNameError("Имя должно содержать только английские буквы");
    } else {
      setFirstNameError("");
    }
    setValue("first_name", value.replace(/[^A-Za-z]/g, ""));
  };

  // Валидация фамилии на английские буквы
  const validateLastName = (value) => {
    if (!/^[A-Za-z]*$/.test(value)) {
      setLastNameError("Фамилия должна содержать только английские буквы");
    } else {
      setLastNameError("");
    }
    setValue("last_name", value.replace(/[^A-Za-z]/g, ""));
  };

  const onSubmitHandler = (data) => {
    if (!firstNameError && !lastNameError) {
      setUserData(data);
      onSubmit();
    }
  };

  return (
    <>
      <img className={s.steps} src="/assets/images/step1.svg" alt="step1" />
      <form
        className={s.register_form}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className={s.register_inputs}>
          <div className={firstNameError ? s.error : ""}>
            <label htmlFor="first_name">Имя</label>
            <input
              id="first_name"
              type="text"
              placeholder="Введите Имя"
              {...register("first_name", { required: true })}
              onChange={(e) => validateFirstName(e.target.value)}
            />
            {firstNameError && <div>{firstNameError}</div>}
          </div>
          <div className={lastNameError ? s.error : ""}>
            <label htmlFor="last_name">Фамилия</label>
            <input
              id="last_name"
              type="text"
              placeholder="Введите Фамилию"
              {...register("last_name", { required: true })}
              onChange={(e) => validateLastName(e.target.value)}
            />
            {lastNameError && <div>{lastNameError}</div>}
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
