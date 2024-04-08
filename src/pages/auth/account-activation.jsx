import React, { useEffect } from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import { useRouter } from "next/router";
import useActivation from "../../hooks/auth/useActivation";
import { useMemo } from "react";

function useRefs(length) {
  const refs = useMemo(() => {
    const refsArray = [];
    for (let i = 0; i < length; i++) {
      refsArray.push(React.createRef());
    }
    return refsArray;
  }, [length]);

  return refs;
}

export default function AccountActivation({ onSubmit }) {
  const { activation, error } = useActivation();
  const inputRefs = useRefs(6);
  const router = useRouter();

  const handleInputChange = (index, e) => {
    const input = e.target;
    let value = input.value;

    if (value.length > 1) {
      value = value.slice(0, 1);
      input.value = value;
    }

    if (value.length > 0) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const input = inputRefs[index].current;
      const value = input.value;

      if (!value && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = inputRefs.map((ref) => ref.current.value).join("");
    const email = localStorage.getItem("email");
    activation(email, code);
  };

  return (
    <main className={s.register_page}>
      <img className={s.left_img} src="/assets/images/28.png" alt="" data-aos="fade-right"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500"
     />
      <section className={s.section}>
        <div onClick={() => router.push("/")} className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        <h1>Подтверждение аккаунта</h1>
        <>
          <img className={s.steps} src="/assets/images/step3.svg" alt="step1" />
          <form className={s.register_form} onSubmit={handleSubmit}>
            <p>Вам на почту пришел 6-ти значный код. Введите его:</p>
            <div className={s.activation_inputs}>
              {inputRefs.map((inputRef, index) => (
                <input
                  key={index}
                  ref={inputRef}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            <div className={s.register_btn}>
              <button type="submit">
                Подтвердить аккаунт
                <img src="/assets/icons/next-icon.svg" alt="next" />
              </button>
            </div>
          </form>
        </>
      </section>
      <img className={s.right_img} src="/assets/images/39.png" alt=""
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
      />
    </main>
  );
}
