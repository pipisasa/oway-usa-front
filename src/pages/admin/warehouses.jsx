import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";
import useWarehouses from "@/hooks/admin/useWarehouses";

export default function AdminWarehousesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { warehouses, fetchWarehouses, isLoading, error, count } =
    useWarehouses(currentPage);
  const [nameFilter, setNameFilter] = useState("");
  const [trackNumberFilter, setTrackNumberFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

 
  return (
    <div className={s.warehouses_page}>
      <div className={s.filters}>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input
            type="text"
            placeholder="Поиск по названию"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWarehouses(currentPage, {
                  name: nameFilter,
                });
              }
            }}
          />
        </div>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input
            type="number"
            placeholder="Поиск по трак номеру"
            value={trackNumberFilter}
            onChange={(e) => setTrackNumberFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchWarehouses(currentPage, {
                  trackNumber: trackNumberFilter,
                });
              }
            }}
          />
        </div>
        <select
          className={s.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Статус</option>
          <option value="Получен на складе получателя">Получен на складе получателя</option>
          <option value="Отправлен">Отправлен</option>
          <option value="Доставлено">Доставлено</option>
          <option value="Готов к выдаче">Готов к выдаче</option>
        </select>
        <select
          className={s.select}
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">Страна отправки</option>
          <option value="США">США</option>
          <option value="Турция">Турция</option>
        </select>
      </div>
      <WarehousesProductsTable
        currentPage={currentPage}
        setCurrent={setCurrentPage}
        current={currentPage}
        isLoading={isLoading}
        error={error}
        count={count}
        warehouses={warehouses}
        fetchWarehouses={fetchWarehouses}
        nameFilter={nameFilter}
        trackNumberFilter={trackNumberFilter}
        statusFilter={statusFilter}
        countryFilter={countryFilter}
      />
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
