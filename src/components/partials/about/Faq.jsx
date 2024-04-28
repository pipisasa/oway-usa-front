import React, { useState } from "react";
import s from "@/styles/partials/Faq.module.scss";
import FaqItem from "../FaqItem";

const data = [
  {
    question: "Вопросc",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    question: "Вопрос",
    answer:
      'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
  },
  {
    question: "Какой у вас график работы?",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
  {
    question: "Какой у вас график работы?",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
  {
    question: "Какой у вас график работы?",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
  {
    question: "Какой у вас график работы?",
    answer: "Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
  },
];

export default function Faq() {
  return (
    <div className={`${s.faq} container`}>
      <div className={s.faq_inner}>
        <span>FAQ</span>
        <h1 className={s.faq_h1}>
          Дополнительные вопросы <br />и ответы на них
        </h1>
        <div className={s.questions}>
          {data.map((item, index) => (
            <FaqItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <div
        className={s.faq_air}
        data-aos="fade-up"
        data-aos-anchor-placement="center-center"
      >
        <img src="assets/images/aboutAir.png" width={697} height={697} alt="" />
      </div>
    </div>
  );
}
