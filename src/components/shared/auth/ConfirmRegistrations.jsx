import React, { useRef } from "react";
import s from "@/styles/pages/auth/Register.module.scss";

export default function ConfirmRegistrations({ onSubmit }) {
  const createRef = (idx) => {
    if (!inputRefs.current[idx]) {
      inputRefs.current[idx] = React.createRef();
    }
    return inputRefs.current[idx];
  };

  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const input = e.target;
    let value = input.value;

    if (value.length > 1) {
      value = value.slice(0, 1);
      input.value = value;
    }

    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !inputRefs.current[index].current.value
    ) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <img className={s.steps} src="/assets/images/step3.svg" alt="step1" />
      <form className={s.register_form} onSubmit={handleSubmit}>
        <p>Вам на почту пришел 6-ти значный код. Введите его:</p>
        <div className={s.activation_inputs}>
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={createRef(index)}
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
  );
}
