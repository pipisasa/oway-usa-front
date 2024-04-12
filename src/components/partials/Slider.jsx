import React, { useRef, useState } from "react";
import s from "./qwe.module.scss";

export const Slider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef(null);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchEndX - touchStartX;
    const threshold = 50;
    if (touchDiff > threshold) {
      prevSlide();
    } else if (touchDiff < -threshold) {
      nextSlide();
    }
  };

  const updateCurrentIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      const newIndex = (currentIndex + 1) % children.length;
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * newIndex,
        behavior: "smooth",
      });
      updateCurrentIndex(newIndex);
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const newIndex = (currentIndex - 1 + children.length) % children.length;
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * newIndex,
        behavior: "smooth",
      });
      updateCurrentIndex(newIndex);
    }
  };

  const handleIndicatorClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * index,
        behavior: "smooth",
      });
      updateCurrentIndex(index);
    }
  };

  return (
    <div className={s.sliderContainer}>
      <div
        className={s.slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`${s.slide} ${index === currentIndex ? s.active : ""}`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className={s.indicators}>
        {children.map((child, index) => (
          <span
            key={index}
            className={`${s.indicator} ${
              index === currentIndex ? s.active : ""
            }`}
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
