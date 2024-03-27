import React, { useState, useEffect } from 'react';
import s from "@/styles/screens/main/CurrentProducts.module.scss";
import CurrentCard from "../../partials/card/CurrentCard";

export default function CurrentProducts() {

    return (
       <div className={`${s.current} container`}>
           <div className={s.current_header}>
               <div className={s.current_header_title}>
                   <p>Интересные товары</p>
                   <h1>Подборка последних актуальных товаров</h1>
               </div>
               <div className={s.current_header_icon}>
                       <button>
                           <img src="assets/icons/arrowLeft.svg" alt=""/>
                       </button>
                       <button>
                           <img src="assets/icons/arrowRight.svg" alt=""/>
                       </button>
               </div>
           </div>
           <div className={s.current_block} >
                <CurrentCard/>
                <CurrentCard/>
                <CurrentCard/>
                <CurrentCard/>
                <CurrentCard/>
           </div>
       </div>

    );
}
