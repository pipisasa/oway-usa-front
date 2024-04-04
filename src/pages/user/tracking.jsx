import React from "react";
import s from "@/styles/pages/user/TrackingPage.module.scss";

export default function TrackingPage() {
  return (
    <section>
      <div className={s.tracking_form}>
        <h3>Введите трек номер для отслеживания досавки</h3>
        <div>
          <label htmlFor="">Трек-номер</label>
          <input type="text" placeholder="Введите трек номер" />
        </div>
        <button>Проверить</button>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
