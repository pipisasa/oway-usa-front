import React, { useState } from "react";
import s from "@/styles/screens/main/Advantage.module.scss";

export default function Advantage() {
    const [selectedItem, setSelectedItem] = useState(1);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className={s.advantage}>
            <div className={`${s.advantage_container} container`}>
                <div className={s.advantage_inner}>
                    <p>Наши преимущества</p>
                    <h2>Легкость и доступность совершения покупок</h2>
                    <div className={s.menu}>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 1 ? s.active : ""}`}
                            onClick={() => handleItemClick(1)}
                        >
                            Глобальный выбор товаров
                        </div>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 2 ? s.active : ""}`}
                            onClick={() => handleItemClick(2)}
                        >
                            Экономия времени и усилий
                        </div>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 3 ? s.active : ""}`}
                            onClick={() => handleItemClick(3)}
                        >
                            Международная доставка с удобством
                        </div>
                    </div>
                </div>
                <div className={s.info}>
                    {selectedItem === 1 && (
                        <div className={s["info-content"]}>
                            <img src="/assets/icons/container.png" width={825} height={327} alt="logo"/>
                            <p>Мы предлагаем доступ к огромному ассортименту товаров из лучших мировых интернет-магазинов, включая Amazon, eBay, Nike и многие другие. У вас есть возможность выбирать из тысяч продуктов, не ограничиваясь ассортиментом местных магазинов.</p>
                        </div>
                    )}
                    {selectedItem === 2 && (
                        <div className={s["info-content"]}>
                            <img src="/assets/icons/container.png" width={825} height={327} alt="logo"/>

                            <p>Ты предлагаем доступ к огромному ассортименту товаров из лучших мировых интернет-магазинов, включая Amazon, eBay, Nike и многие другие. У вас есть возможность выбирать из тысяч продуктов, не ограничиваясь ассортиментом местных магазинов.</p>
                        </div>
                    )}
                    {selectedItem === 3 && (
                        <div className={s["info-content"]}>
                            <img src="/assets/icons/container.png" width={825} height={327} alt="logo"/>
                            <p>Я предлагаем доступ к огромному ассортименту товаров из лучших мировых интернет-магазинов, включая Amazon, eBay, Nike и многие другие. У вас есть возможность выбирать из тысяч продуктов, не ограничиваясь ассортиментом местных магазинов.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
