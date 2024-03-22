import React from "react";
import s from "@/styles/pages/user/UserMain.module.scss";

export default function UserMainPage() {
  return (
    <section>
      <div className={s.user_info}>
        <h2>Кудайбергенов Акбар</h2>
        <div>
          <p>+7 (747) 123-12-12</p>
          <p>dzholdaspaevalim@gmail.com</p>
          <p>Казахстан, Караганда, Кузембаева 32, кв. 12</p>
        </div>
      </div>
    </section>
  );
}
