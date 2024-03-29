import React, {useState} from "react";
import s from "@/styles/partials/FaqItem.module.scss";

export default function FaqItem({index, item}) {
    const [expanded, setExpanded] = useState(null);

    const toggleAnswer = (index) => {
        if (expanded === index) {
            setExpanded(null);
        } else {
            setExpanded(index);
        }
    };
    return (
        <div className={`${s.join} container`}>
            <div key={index} className={`${s.faqItem} ${expanded === index ? s.expanded : ''}`}>
                <div className={s.question} onClick={() => toggleAnswer(index)}>
                    <h3>{item.question}</h3>
                    <span>{expanded === index ?
                        <div>-</div>
                        :
                        <div>+</div>
                    }</span>
                </div>
                <div className={s.answers}></div>
                <div className={s.answer}>
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    )
}

