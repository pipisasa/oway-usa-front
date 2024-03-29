import React from "react";
import s from "@/styles/screens/main/AboutWorld.module.scss";
import Button from "../../partials/Button";
export default function AboutWorld() {
    return (
        <div className={`${s.join} container`}>
            <div className={s.join_info}>
                <p>Мы в СНГ</p>
                <h1>Наша компания обладает обширной сетью курьеров, охватывающей все уголки <span>России</span>, <span>Кыргызстана</span>, <span>Казахстана</span> и <span>Узбекистана</span></h1>

                <div>
                    <div></div>
                    <span><strong>Мы гордимся</strong> прекрасными партнерскими отношениями, установленными с местными курьерскими службами, что обеспечивает нам доступ в каждый город и регион СНГ. </span>
                </div>
                <div>
                    <div></div>
                    <span>Благодаря этим устойчивым путям, мы гарантируем надежную и бережную доставку всех видов грузов в самые отдаленные точки, обеспечивая при этом минимальные сроки доставки. </span>
                </div>
            </div>
            <div className={s.join_img}>
                <img src="assets/images/world.png" alt=""/>
            </div>
        </div>
    )
}

