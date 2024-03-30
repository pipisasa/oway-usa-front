import React, { useState } from "react";
import s from "@/styles/screens/main/CurrentProducts.module.scss";
import TopProductCard from "@/components/shared/cards/TopProductCard";

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 10; // Общее количество слайдов
  const productNames = [
    "CAKEDECOR.KZ форма PS286-28, сталь",
    "Название продукта 2",
    "Название продукта 3",
    "Название продукта 4",
    "Название продукта 5",
    "Название продукта 6",
    "Название продукта 7",
    "Название продукта 8",
    "Название продукта 9",
    "Название продукта 10",
  ];

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalSlides - 1));
  };

  return (
    <div className={`${s.current} container`}>
      <div className={s.current_header}>
        <div className={s.current_header_title}>
          <p>Интересные товары</p>
          <h1>Подборка последних актуальных товаров</h1>
        </div>
        <div className={s.current_header_icon}>
          <button onClick={handlePrevSlide}>
            <img src="assets/icons/arrowLeft.svg" alt="" />
          </button>
          <button onClick={handleNextSlide}>
            <img src="assets/icons/arrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div className={s.current_block}>
        {productNames.map((productName, index) => (
          <div
            key={index}
            className={`${s.slide} ${index === currentIndex ? s.active : ""}`}
          >
            <TopProductCard productName={productName} />
          </div>
        ))}
      </div>
    </div>
  );
}
