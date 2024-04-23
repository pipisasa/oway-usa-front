import { useState } from "react";
import { useForgot } from "@/hooks/auth/useforgot";
import Link from "next/link";
import s from "@/styles/pages/auth/Register.module.scss";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const { sendCodeToEmail, forgot, confirmEmail, isLoading } = useForgot();

  const router = useRouter();

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    await confirmEmail(email);
    setIsEmailConfirmed(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailConfirmed) {
      setError({ message: "Please confirm your email first" });
      return;
    }

    if (password !== password2) {
      setError({ message: "Passwords do not match" });
      return;
    }

    await forgot({ email, code, password, password2 });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <main className={s.register_page}>
      <img
        className={s.left_img}
        src="/assets/images/autholeftblock.png"
        alt=""
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      />
      <section className={s.section}>
        <div onClick={() => router.push("/")} className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        <h1>Восстановление аккаунта</h1>
        <form
          onSubmit={!isEmailConfirmed ? handleConfirmEmail : handleSubmit}
          className={s.register_form}
        >
          <div className={s.register_inputs}>
            {!isEmailConfirmed && (
              <div className={s.email ? s.error : ""}>
                <label htmlFor="email">Электронная почта :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Введите почту"
                />
              </div>
            )}
            {isEmailConfirmed && (
              <>
                <div>
                  <label>Code:</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <div className={s.password_input}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                      <img
                        src={
                          showPassword
                            ? "/assets/icons/eyes-open.svg"
                            : "/assets/icons/eyes-close.svg"
                        }
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <label>Confirm New Password:</label>
                  <div className={s.password_input}>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                    />
                    <button type="button" onClick={togglePassword2Visibility}>
                      <img
                        src={
                          showPassword2
                            ? "/assets/icons/eyes-open.svg"
                            : "/assets/icons/eyes-close.svg"
                        }
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={s.register_btn}>
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : !isEmailConfirmed
                ? "Confirm Email"
                : "Reset Password"}
            </button>
            <span>
              Вы имеете аккаунт? <Link href="/auth/login">Авторизоваться</Link>
            </span>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
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
};

export default ForgotPassword;
