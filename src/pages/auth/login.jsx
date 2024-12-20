import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "@/styles/pages/auth/Login.module.scss";
import Link from "next/link";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "next/router";
import GoogleLoginButton from "@/hooks/auth/GoogleLoginButton";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmitHandler = async (data) => {
    await login(data.email, data.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className={s.login_page}>
      <img
        className={s.left_img}
        height={400}
        src="/assets/images/autholeftblock.png"
        alt="cdads"
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      />
      <section className={s.login_section}>
        <div onClick={() => router.push("/")} className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        <h1>Авторизация</h1>
        <form className={s.login_form} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.login_inputs}>
            <div className={`${errors.email ? s.error : ""}`}>
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                placeholder="Введите почту"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className={s.error}>
                  Это поле обязательно к заполнению!
                </span>
              )}
            </div>
            <div className={`${errors.password ? s.error : ""}`}>
              <label htmlFor="password">Пароль</label>
              <div className={s.password_input}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Введите пароль"
                  {...register("password", { required: true })}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  <img  
                    src={
                      showPassword
                        ? "/assets/icons/eyes-open.svg"
                        : "/assets/icons/eyes-close.svg"
                    }
                    alt="view password"
                  />
                </button>
              </div>

              {errors.password && (
                <spanz className={s.error}>
                  Это поле обязательно к заполнению!
                </spanz>
              )}
            </div>
          </div>
          {error && <p className={s.error}>{error}</p>}
          <div className={s.forgot_pass}>
            <div className={s.remember_me}>
              <input type="checkbox" />
              <label className={s.label} htmlFor="remember-me">
                Запомнить пароль
              </label>
            </div>
            <Link href="/auth/forgot-password">Забыли пароль?</Link>
          </div>
          <div className={s.ili}>
            <div></div>
            <span>Или</span>
            <div></div>
          </div>
          <div className={s.google}>
            <GoogleLoginButton />
          </div>
          <div className={s.submit_login}>
            <button type="submit">
            {isLoading ? "Загрузка..." : "Авторизоваться"}
              <img src="/assets/icons/next-icon.svg" alt="next" />
            </button>
            <span>
              Не имеете аккаунта?{" "}
              <Link href="/auth/register">Создать аккаунт.</Link>
            </span>
          </div>
        </form>
      </section>
      <img
        className={s.right_img}
        src="/assets/images/39.png"
        alt=""
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      />
    </main>
  );
}
