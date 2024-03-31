import React, { useState } from "react";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";
import Link from "next/link";

const ProductsCard = ({ title, link, image, editProduct, deleteProduct }) => {
  return (
    <div className={s.card_block}>
      <div className={s.data}>
        <div className={s.card_img}>
          <img src={image} alt="" />
        </div>
        <div className={s.card_text}>
          <h2>{title}</h2>
          <Link href={link}>{link}</Link>
        </div>
      </div>
      <div className={s.btns}>
        <button onClick={editProduct} className={s.edit}>
          <img src="/assets/icons/Edit.svg" alt="Edit" />
        </button>
        <button onClick={deleteProduct} className={s.delete}>
          <img src="/assets/icons/Delete.svg" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
