// Ваш файл qwe.module.scss остаётся без изменений

import React, { useState } from 'react';
import s from "./qwe.module.scss";

export const Slider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={s.slider}>
      {children[currentIndex]}
      <div className={s.indicators}>
        {children.map((child, index) => (
          <SlideIndicator
            key={index}
            active={index === currentIndex}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export const Slide = ({ content }) => {
  return <div className={s.slide}>{content}</div>;
};

const SlideIndicator = ({ active, onClick }) => {
  return (
    <span
      className={`${s.indicator} ${active ? s.active : ''}`}
      onClick={onClick}
    />
  );
};
