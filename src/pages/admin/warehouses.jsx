import React from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import { Pagination } from "@nextui-org/react";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";

export default function AdminWarehousesPage() {
  return (
    <div className={s.warehouses_page}>
      <div className={s.search}>
        <img src="/assets/icons/search.svg" alt="icon" />
        <input type="text" placeholder="Поиск" />
      </div>
      <WarehousesProductsTable />
      <div className={s.pagination}>
        <Pagination variant="bordered" total={10} initialPage={1} />
      </div>
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
