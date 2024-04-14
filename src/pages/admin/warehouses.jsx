import React from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";

export default function AdminWarehousesPage() {
  return (
    <div className={s.warehouses_page}>
      <div className={s.filters}>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input type="text" placeholder="Поиск по названию" />
        </div>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input type="number" placeholder="Поиск по трак номеру" />
        </div>
        <select className={s.select} name="" id="">
          <option value="">Статус</option>
          <option value="">Оплачено</option>
          <option value="">Не оплачено</option>
        </select>
        <select className={s.select} name="" id="">
          <option value="">Страна отправки</option>
          <option value="">США</option>
          <option value="">Турция</option>
        </select>
      </div>
      <WarehousesProductsTable />
    </div>
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
