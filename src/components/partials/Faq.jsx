import React, {useState} from "react";
import s from "@/styles/partials/Faq.module.scss";

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


export default function Faq() {

    const [expanded, setExpanded] = useState(null);

    const toggleAnswer = (index) => {
        if (expanded === index) {
            setExpanded(null);
        } else {
            setExpanded(index);
        }
    };
  return (
      <div className={`${s.faq} container`}>
          <div className={s.faq_inner}>
              <span>FAQ</span>
              <h1>Часто задаваемые вопросы</h1>
              <div className={s.questions}>
                  {data.map((item, index) => (
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
                  ))}
              </div>
          </div>
          <div className={s.faq_img}>
              <img src="assets/icons/faq_door.png" alt=""/>
          </div>
      </div>
  )
}
