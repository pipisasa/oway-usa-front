import React, { useState } from "react";
import s from "@/styles/partials/Faq.module.scss";
import { useRouter } from "next/router";

export default function Faq() {
  const faqItems = [
    { question: "Вопрос 1", answer: "Ответ на вопрос 1." },
    { question: "Вопрос 2", answer: "Ответ на вопрос 2." },
    { question: "Вопрос 3", answer: "Ответ на вопрос 3." },
    { question: "Вопрос 4", answer: "Ответ на вопрос 4." },
    { question: "Вопрос 5", answer: "Ответ на вопрос 5." },
    { question: "Вопрос 6", answer: "Ответ на вопрос 6." },
    { question: "Вопрос 7", answer: "Ответ на вопрос 7." },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqStyle = {};
  if (router.pathname === "/") {
    faqStyle.background = "var(--bue_light_2, #fff)";
    faqStyle.marginTop = "120px";
  } else if (router.pathname === "/faq") {
    faqStyle.background = "var(--bue_light_2, #f7f9fc)";
  }

  return (
    <section style={faqStyle}>
      <div className={`${s.faq_container} container`}>
        <div className={s.faq_block}>
          <div className={s.faq_header}>
            <span>FAQ</span>
            <h2>Часто задаваемые вопросы</h2>
          </div>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={s.question}
              style={{
                backgroundColor: openIndex === index ? "#027DDB" : "#fff",
              }}
              onClick={() => toggleQuestion(index)}
            >
              <div className={s.close_block}>
                <p style={{ color: openIndex === index ? "#fff" : "#000" }}>
                  {item.question}
                </p>
                <button>
                  <img
                    src={
                      openIndex === index
                        ? "/assets/icons/minus.svg"
                        : "/assets/icons/plus.svg"
                    }
                    alt={openIndex === index ? "close" : "open"}
                  />
                </button>
              </div>

              {openIndex === index && <p className={s.answer}>{item.answer}</p>}
            </div>
          ))}
        </div>
        <div className={s.door_img} data-aos="zoom-in-up">
          <img src="assets/icons/faq_door.png" alt="" />
        </div>
      </div>
    </section>
  );
}
