import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "@/components/shared/Modal";
import { Switch } from "@nextui-org/react";

export default function WarehouseProductsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleModal = () => setIsOpen(!isOpen);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const Step1 = () => (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <img src="/assets/images/step1.svg" alt="step 1" />
      </div>
      <form action="" className={s.step_form}>
        <div className={c.first_block}>
          <div>
            <label htmlFor="">Название товара</label>
            <input type="text" placeholder="Введите название товара" />
          </div>
          <div>
            <label htmlFor="">ID товара</label>
            <input type="text" placeholder="Введите ID товара" />
          </div>
          <div>
            <label htmlFor="">Адрес заказа</label>
            <input type="text" placeholder="Введите адрес" />
          </div>
          <div>
            <label htmlFor="">Страна получения</label>
            <input type="text" placeholder="Выберите страну" />
          </div>
          <div>
            <label htmlFor="">Вес</label>
            <input type="text" placeholder="Впишите вес" />
          </div>
          <div>
            <label htmlFor="">Трек-номер</label>
            <input type="text" placeholder="Введите ID товара" />
          </div>
        </div>
        <div>
          <label htmlFor="">Комментарий</label>
          <input type="text" placeholder="Пришитие комментарий" />
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
    </div>
  );

  const Step2 = () => (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <img src="/assets/images/step2.svg" alt="step 2" />
      </div>
      <form action="" className={s.step_form}>
        <div>
          <label htmlFor="">Выберите статус товара</label>
          <input type="text" placeholder="Укажите статус" />
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
    </div>
  );

  const Step3 = () => (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <img src="/assets/images/steps3.svg" alt="step 3" />
      </div>
      <form action="" className={s.step_form}>
        <div>
          <label htmlFor="">Выбор клиента</label>
          <input type="text" placeholder="Напишити ID" />
        </div>
        <div className={c.notification}>
          <label htmlFor="">Оповещение клиента</label>
          <div className={c.switch}>
            <p>Уведомление к оплате</p>
            <div>
              <Switch />
            </div>
          </div>
        </div>
      </form>
      <button className={c.submit_btn} onClick={nextStep}>
        Продолжить
      </button>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />; // Возвращаемся к шагу 1 если что-то пошло не так
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить товар
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить товар</h3>
        {renderStep()}
      </Modal>
    </div>
  );
}
