import React from "react";
import s from "@/styles/shared/main/Purchase.module.scss";
import Button from "../partials/Button";
export default function Purchase() {
    return (
            <div className={`${s.purchase} container`}>
                <div className={s.purchase_container}>
                    <div className={s.purchase_header}>
                        <p>Закуп на выкуп</p>
                        <h1>Уникальная возможность приобретения товаров по выгодным ценам!</h1>
                    </div>
                    <div className={s.purchase_inner}>
                        <div className={s.purchase_inner_from}>
                            <label>Ссылка на товар <span>*</span></label>
                            <input type="text" placeholder='http:'/>
                        </div>
                        <div className={s.purchase_inner_froms}>
                            <div className={s.purchase_inner_froms_inputs}>
                                <label>Название товара, как в магазине<span>*</span></label>
                                <input type="text" placeholder='Введите название товара'/>
                            </div>
                            <div  className={s.purchase_inner_froms_inputs}>
                                <div className={s.purchase_inner_froms_label}>
                                    <label>Артикул товара</label>
                                    <img src="assets/icons/questionGrey.svg" alt=""/>
                                </div>
                                <input type="text" placeholder='Введите артикул товара'/>
                            </div>
                        </div>
                        <div className={s.purchase_inner_froms}>
                            <div className={s.purchase_inner_froms_inputs}>
                                <label>Количество <span>*</span></label>
                                <input type="text" placeholder='Введити количество'/>
                            </div>
                            <div className={s.purchase_inner_froms_inputs}>
                                <label>Цвет</label>
                                <input type="text" placeholder='Введитие цвет'/>
                            </div>
                        </div>
                        <div className={s.purchase_inner_form}>
                            <label>Название товара, как в магазине <span>*</span></label>
                            <input type="text" placeholder='Введите название товара, размер и прочую информацию'/>
                        </div>
                        <div className={s.purchase_inner_from}>
                            <label>Добавьте скриншот</label>
                            <input type="text" placeholder='Вставьте картинку'/>
                            <p>Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ | 512x512</p>
                        </div>
                    </div>
                    <div>
                        <Button button={'Далее'}/>
                    </div>
                </div>
                <div className={s.purchase_img}>
                    <img src="assets/images/busket.png" width={510} height={510} alt=""/>
                </div>

            </div>

        )
}
