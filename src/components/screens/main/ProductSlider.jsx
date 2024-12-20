import React, { useRef } from "react";
import s from "@/styles/screens/main/CurrentProducts.module.scss";
import TopProductCard from "@/components/shared/cards/TopProductCard";
import useProducts from "../../../hooks/admin/useProducts";

export default function ProductSlider() {
  const { products, isLoading } = useProducts();
  const slideWidth = 300;
  const sliderRef = useRef(null);

  const handlePrevSlide = () => {
    sliderRef.current.scrollBy({
      left: -slideWidth,
      behavior: "smooth",
    });
  };

  const handleNextSlide = () => {
    sliderRef.current.scrollBy({
      left: slideWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${s.current} container`} data-aos="fade-right"
    data-aos-offset="300"
        data-aos-easing="ease-in-sine"
    >
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
      <div ref={sliderRef} className={s.current_block}>
        {products.map((products, index) => (
          <div key={products?.id} className={s.slide}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <TopProductCard
                image={products?.image}
                title={products?.title}
                link={products?.link}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
