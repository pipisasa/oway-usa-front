import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import s from "@/styles/shared/main/Purchase.module.scss";
import usePurchase from "@/hooks/usePurchase";
import PurchaseModal from "./main/PurchaseModal";

export default function Purchase() {
  const { handleChange, submitPurchase, isSubmitted } = usePurchase();
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit,  formState: { errors }  } = useForm();

  const onSubmitHandler = async (data) => {
    await submitPurchase({
      full_name: data.full_name,
      url: data.url,
      name_of_purchase: data.name_of_purchase,
      articul: data.articul,
      count: data.count,
      color: data.color,
      description: data.description,
      telegram: data.telegram,
      phone_number: data.phone_number,
      purchase_image: data.purchase_image,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      setIsOpen(true);
    }
  }, [isSubmitted]);

  return (
      <>
        <PurchaseModal isOpen={isOpen} onClose={closeModal} />
        <form className={`${s.purchase} container`} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={s.purchase_container}>
            <div className={s.purchase_header}>
              <p>Заявка на выкуп</p>
              <h1>Уникальная возможность приобретения товаров по выгодным ценам!</h1>
            </div>
            <div className={s.purchase_inner}>
              <div className={s.purchase_inner_froms}>
                <div className={`${errors?.full_name ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>ФИО</label>
                  <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Введите ФИО"
                      onChange={handleChange}
                      {...register("full_name", { required: true })}
                  />
                  {errors?.full_name && <p>Это поле обязательно к заполнению!</p>}
                </div>

                <div className={` ${errors?.url ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Ссылка на товар <span>*</span></label>
                  <input
                      id="url"
                      name="url"
                      type="text"
                      placeholder="https://"
                      onChange={handleChange}
                      {...register("url", { required: true })}
                  />
                  {errors?.url && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>

              <div className={s.purchase_inner_froms}>
                <div className={`${errors?.name_of_purchase ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Название товара, как в магазине<span>*</span></label>
                  <input
                      id="name_of_purchase"
                      name="name_of_purchase"
                      type="text"
                      placeholder="Введите название товара"
                      onChange={handleChange}
                      {...register("name_of_purchase", { required: true })}
                  />
                  {errors?.name_of_purchase && <p>Это поле обязательно к заполнению!</p>}
                </div>

                <div className={`${errors?.articul ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Артикул товара</label>
                  <input
                      id="articul"
                      name="articul"
                      type="text"
                      placeholder="Введите артикул товара"
                      onChange={handleChange}
                      {...register("articul", { required: true })}
                  />
                  {errors?.articul && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>
              <div className={s.purchase_inner_froms}>
                <div className={`${errors?.count ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Количество <span>*</span></label>
                  <input
                      id="count"
                      name="count"
                      type="text"
                      placeholder="Введите количество"
                      onChange={handleChange}
                      {...register("count", { required: true })}
                  />
                  {errors?.count && <p>Это поле обязательно к заполнению!</p>}
                </div>
                <div className={`${errors?.color ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Цвет</label>
                  <input
                      id="color"
                      name="color"
                      type="text"
                      placeholder="Введите цвет"
                      onChange={handleChange}
                      {...register("color", { required: true })}
                  />
                  {errors?.color && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>
              <div className={` ${errors?.description ? s.error : s.purchase_inner_form}`}>
                <label>Комментарий к товару <span>*</span></label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Введите комментарий"
                    onChange={handleChange}
                    {...register("description", { required: true })}
                />
                {errors?.description && <p>Это поле обязательно к заполнению!</p>}
              </div>
              <div className={s.purchase_inner_froms}>
                <div className={`${errors?.telegram ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Telegram<span>*</span></label>
                  <input
                      id="telegram"
                      name="telegram"
                      type="text"
                      placeholder="Введите @username"
                      onChange={handleChange}
                      {...register("telegram", { required: true })}
                  />
                  {errors?.telegram && <p>Это поле обязательно к заполнению!</p>}
                </div>
                <div className={`${errors?.phone_number ? s.error : s.purchase_inner_froms_inputs}`}>
                  <label>Номер телефона</label>
                  <input
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      placeholder="Введите номер телефона"
                      onChange={handleChange}
                      {...register("phone_number", { required: true })}
                  />
                  {errors?.phone_number && <p>Это поле обязательно к заполнению!</p>}
                </div>
              </div>
              <div className={`${errors?.purchase_image ? s.errorr : s.purchase_inner_from}`}>
                <label>Добавьте скриншот</label>
                <input
                    id="purchase_image"
                    type="file"
                    onChange={handleChange}
                    {...register("purchase_image", { required: true })}
                />
                {errors?.purchase_image && <p>Выберите фото обязательно!</p>}
                <p>
                  Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512
                </p>
              </div>
            </div>
            <div>
              <button type="submit" className={s.button}>
                <span>Далее</span>
                <img src="/assets/icons/rightIcon.svg" alt="logo" />
              </button>
            </div>
          </div>
          <div className={s.purchase_img}>
            <img src="assets/images/busket.png" width={510} height={510} alt="" />
          </div>
        </form>
      </>
  );
}
