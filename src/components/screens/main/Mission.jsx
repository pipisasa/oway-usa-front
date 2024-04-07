import React from "react";
import s from "@/styles/screens/main/MIssion.module.scss";
import { Slider } from "@/components/partials/Slider";

export default function Mission() {
  return (
    <div className={`${s.mission} container`}>
      <span>Наша миссия</span>
      <div className={s.mission_header}>
        <h1>Легкость и доступность совершения покупок</h1>
        <div className={s.mission_header_info}>
          <div></div>
          <span>
            <strong>Наша цель</strong> - предоставить нашим клиентам возможность
            покупать товары из любых мировых интернет-магазинов, не
            ограничиваясь географией или сложностями доставки.
          </span>
        </div>
      </div>
      <div className={s.mission_blocks}>
      <div className={s.mission_blockd}>
          <img src="assets/icons/mission_book.svg" alt="" />
          <h3>Доступность для всех:</h3>
          <p>
            Мы стремимся сделать международные покупки доступными для каждого,
            независимо от их местоположения и географических ограничений.
          </p>
        </div>
        <div className={s.mission_blockd}>
          <img src="assets/icons/mission_notebook.svg" alt="" />
          <h3>Удобство и простота</h3>
          <p>
            Наша цель - предоставить вам простой и прозрачный процесс заказа,
            чтобы каждый мог легко приобрести товары из любимых мировых
            магазинов.
          </p>
        </div>
        <div className={s.mission_blockd}>
          <img src="assets/icons/mission_box.svg" alt="" />
          <h3>Безопасность и надежность</h3>
          <p>
            Мы обеспечиваем безопасность и надежность каждой посылки,
            обеспечивая вашу полную уверенность в процессе доставки
          </p>
        </div>
      <Slider>
        <div className={s.mission_block}>
          <img src="assets/icons/mission_book.svg" alt="" />
          <h3>Доступность для всех:</h3>
          <p>
            Мы стремимся сделать международные покупки доступными для каждого,
            независимо от их местоположения и географических ограничений.
          </p>
        </div>
        <div className={s.mission_block}>
          <img src="assets/icons/mission_notebook.svg" alt="" />
          <h3>Удобство и простота</h3>
          <p>
            Наша цель - предоставить вам простой и прозрачный процесс заказа,
            чтобы каждый мог легко приобрести товары из любимых мировых
            магазинов.
          </p>
        </div>
        <div className={s.mission_block}>
          <img src="assets/icons/mission_box.svg" alt="" />
          <h3>Безопасность и надежность</h3>
          <p>
            Мы обеспечиваем безопасность и надежность каждой посылки,
            обеспечивая вашу полную уверенность в процессе доставки
          </p>
        </div>
      </Slider>
      </div>
    </div>
  );
}
