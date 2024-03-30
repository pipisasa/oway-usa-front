import React, {useState} from "react";
import s from "@/styles/partials/Faq.module.scss";
import FaqItem from "./FaqItem";

const data = [
    {
        question: 'Вопрос',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        question: 'Вопрос',
        answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    },
    {
        question: 'Какой у вас график работы?',
        answer: 'Мы работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
    {
        question: 'Какой у вас график работы?',
        answer: 'Мы работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
    {
        question: 'Какой у вас график работы?',
        answer: 'Мы работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
    {
        question: 'Какой у вас график работы?',
        answer: 'Мы работаем с понедельника по пятницу с 9:00 до 18:00.',
    },
    // Другие вопросы и ответы
];


export default function Faq({margin}) {
  return (
      <div className={`${s.faq} container`} style={margin === 'no' ? {paddingTop:"40px"} : {marginTop:"120px"}}>
          <div className={s.faq_inner}>
              {margin === 'no' ?
                  null
                  :
                  <span>FAQ</span>
              }
              <h1 className={margin === 'no' ? s.h1 : s.faq_h1}>Часто задаваемые вопросы</h1>
              <div className={s.questions}>
                  {data.map((item, index) => (
                      <FaqItem key={index} item={item} index={index}/>
                  ))}
              </div>
          </div>
          <div className={s.faq_img}>
              <img src="assets/icons/faq_door.png" alt=""/>
          </div>
      </div>
  )
}
