import React, { useState } from "react";
import s from "@/styles/screens/main/Advantage.module.scss";
const calc = [
    {
        img: '/assets/icons/container.png',
        text: 'Фактический вес',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        img: '/assets/icons/container.png',
        text: 'Объемный вес',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        img: '/assets/icons/container.png',
        text: 'Гиперобъемный вес',
        answer: 'Ты работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
];

const menu = [
    {
        img: '/assets/icons/container.png',
        text: 'Глобальный выбор товаров',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        img: '/assets/icons/container.png',
        text: 'Экономия времени и усилий',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        img: '/assets/icons/container.png',
        text: 'Международная доставка с удобством',
        answer: 'Мы работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
];

export default function Advantage(props) {
    const [selectedItem, setSelectedItem] = useState(1);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    console.log(props, "props")

    return (
        <div className={props?.menu === "menu" ? s.advantage : s.advantage_calc}>
            <div className={`${s.advantage_container} container`}>
                <div className={s.advantage_inner}>
                    <p>{props.p}</p>
                    <h2>{props.h2}</h2>
                    <div className={s.menu}>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 1 ? s.active : ""}`}
                            onClick={() => handleItemClick(1)}
                        >
                            {props?.menu === "menu" ?
                                menu[0]?.text
                                :
                                calc[0]?.text
                            }
                        </div>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 2 ? s.active : ""}`}
                            onClick={() => handleItemClick(2)}
                        >
                            {props?.menu === "menu" ?
                                menu[1]?.text
                                :
                                calc[1]?.text
                            }
                        </div>
                        <div
                            className={`${s["menu-item"]} ${selectedItem === 3 ? s.active : ""}`}
                            onClick={() => handleItemClick(3)}
                        >
                            {props?.menu === "menu" ?
                                menu[2]?.text
                                :
                                calc[2]?.text
                            }
                        </div>
                    </div>
                </div>
                <div className={s.info}>
                    {selectedItem === 1 && (
                        <div className={s["info-content"]}>
                            <img src={props?.menu === "menu" ? menu[0]?.img : calc[0]?.img} width={825} height={327} alt="logo"/>
                            <p>
                                {props?.menu === "menu" ?
                                    menu[0]?.answer
                                    :
                                    calc[0]?.answer
                                }
                            </p>
                        </div>
                    )}
                    {selectedItem === 2 && (
                        <div className={s["info-content"]}>
                            <img src={props?.menu === "menu" ? menu[1]?.img : calc[1]?.img} width={825} height={327} alt="logo"/>
                            <p>
                                {props?.menu === "menu" ?
                                    menu[1]?.answer
                                    :
                                    calc[1]?.answer
                                }
                            </p>
                        </div>
                    )}
                    {selectedItem === 3 && (
                        <div className={s["info-content"]}>
                            <img src={props?.menu === "menu" ? menu[2]?.img : calc[2]?.img} width={825} height={327} alt="logo"/>
                            <p>
                                {props?.menu === "menu" ?
                                    menu[2]?.answer
                                    :
                                    calc[2]?.answer
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
