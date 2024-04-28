import React from "react";
import s from "./modali.module.scss";
import useIllinois from "@/hooks/admin/useIllinois";
import { useForm } from "react-hook-form";

const Illinois = () => {
  const { formData, handleSubmit, handleChange } = useIllinois();
  const {
    register,
    
    formState: { errors },
  } = useForm();


  return (
<>
    <form
        className={s.purchase} 
        onSubmit={handleSubmit}
      >
        <div className={s.img123} data-aos="fade-up-left">
          <img src="/assets/icons/142.svg" width={510} height={510} alt="" />
        </div>
        <div className={s.purchase_container}>
          <div className={s.purchase_header} data-aos="fade-up">
            <h1>
            Клиентам за пределами штата Иллинойс
            </h1>
          </div>
          <div className={s.form_container}>
            <div className={s.purchase_inner}>
              <div className={s.purchase_inner_froms}>
                <div
                  className={`${
                    errors?.full_name ? s.error : s.purchase_inner_froms_inputs
                  }`}
                >
                  <label>ФИО<span>*</span></label>
              <input
                type="text"
                name="full_name"
                placeholder="ФИО"
                value={formData?.full_name}
                onChange={handleChange}
              />
                  {errors?.full_name && (
                    <p>Это поле обязательно к заполнению!</p>
                  )}
                </div>

                
              </div>

              <div className={s.purchase_inner_froms}>
                <div
                  className={`${
                    errors?.name_of_purchase
                      ? s.error
                      : s.purchase_inner_froms_inputs
                  }`}
                >
                  <label>Адрес<span>*</span></label>
              <input
                type="text"
                name="address"
                placeholder="Адрес..."
                value={formData?.address}
                onChange={handleChange}
              />
                  {errors?.name_of_purchase && (
                    <p>Это поле обязательно к заполнению!</p>
                  )}
                </div>
                <div
                  className={`${
                    errors?.count ? s.error : s.purchase_inner_froms_inputs
                  }`}
                >
                <label>Номер телефона<span>*</span></label>
              <input
                type="number"
                name="phone_number"
                placeholder="Номер телефона..."
                value={formData?.phone_number}
                onChange={handleChange}
              />
                  {errors?.count && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>

              <div className={s.purchase_inner_froms}>
                <div
                  className={`${
                    errors?.email ? s.error : s.purchase_inner_froms_inputs
                  }`}
                >
                       <label>Электронная почта <span>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Электронная почта..."
                value={formData?.email}
                onChange={handleChange}
              />
                  {errors?.email && <p>Это поле обязательно к заполнению!</p>}
                </div>
                <div
                  className={`${
                    errors?.email ? s.error : s.purchase_inner_froms_inputs
                  }`}
                >
                    <label>Вес груза<span>*</span></label>
              <input
                type="number"
                placeholder="Вес груза..."
                name="cargo_weight"
                value={formData?.cargo_weight}
                onChange={handleChange}
              />
                  {errors?.email && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>
              <div className={s.purchase_inner_froms}>
                <div
                  className={`${
                    errors?.telegram ? s.error : s.purchase_inner_froms_inputs
                  }`}
                >
                  <label>Telegram<span>*</span></label>
                  <div className={s.icon_input}>
                    <img src="/assets/icons/telegram.svg" alt="telegram" />
                    <input
                type="text"
                placeholder="Введите @username"
                name="telegram"
                value={formData?.telegram}
                onChange={handleChange}
              />
                  </div>

                  {errors?.telegram && (
                    <p>Это поле обязательно к заполнению!</p>
                  )}
                </div>
                <div
                  className={`${
                    errors?.phone_number
                      ? s.error
                      : s.purchase_inner_froms_inputs
                  }`}
                >
                  <label>WhatsApp<span>*</span></label>
                  <div className={s.icon_input}>
                    <img src="/assets/icons/whatsapp.svg" alt="whatsapp" />
                  
              <input
                type="text"
                name="whatsapp"
                placeholder="Введите номер телефона"
                value={formData?.whatsapp}
                onChange={handleChange}
              />
                  </div>

                  {errors?.phone_number && (
                    <p>Это поле обязательно к заполнению!</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className={s.button}>
                <span>Отправить</span>
                <img src="/assets/icons/rightIcon.svg" alt="logo" />
              </button>
            </div>
          </div>
        </div>
        
      </form>
    </>
  );
};

export default Illinois;
