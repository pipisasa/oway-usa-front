import React, { useState } from "react";
import s from "@/styles/pages/auth/Register.module.scss";
import Step1 from "@/components/shared/auth/Step1";
import Step2 from "@/components/shared/auth/Step2";
import ConfirmRegistrations from "@/components/shared/auth/ConfirmRegistrations";
import { useRouter } from "next/router";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onSubmit={nextStep} />;
      case 2:
        return <Step2 onSubmit={nextStep} />;
      case 3:
        return <ConfirmRegistrations onSubmit={nextStep} />;
      default:
        return <Step1 onSubmit={nextStep} />;
    }
  };

  return (
    <main className={s.register_page}>
      <img className={s.left_img} src="/assets/images/28.png" alt="" />
      <section className={s.section}>
        <div onClick={() => router.push("/")} className={s.logo}>
          <img src="/assets/icons/owayUSE.svg" alt="OWAY USA" />
        </div>
        {currentStep === 3 ? (
          <h1>Подтверждение аккаунта</h1>
        ) : (
          <h1>Регистрация</h1>
        )}
        {renderStep()}
      </section>
      <img className={s.right_img} src="/assets/images/39.png" alt="" />
    </main>
  );
}
