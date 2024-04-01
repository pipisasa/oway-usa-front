import React, { useState } from "react";
import s from "@/styles/screens/main/CurrentProducts.module.scss";
import TopProductCard from "@/components/shared/cards/TopProductCard";
import useProducts from "@/hooks/admin/useProducts";

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 10;
  const { products, isLoading, error, deleteProduct } = useProducts();
  const [loadingStates, setLoadingStates] = useState({});

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

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
        {products.map((product) => (
          <div
            key={product.id}
            className={`${s.slide} ${
              product.id === currentIndex ? s.active : ""
            }`}
          >
            <TopProductCard
              title={product.title}
              link={product.link}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
