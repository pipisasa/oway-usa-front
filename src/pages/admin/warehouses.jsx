import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";
import useWarehouses from "@/hooks/admin/useWarehouses";
import CustomSelect from "@/components/partials/CustomSelect";

export default function AdminWarehousesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { warehouses, fetchWarehouses, isLoading, error, count } =
    useWarehouses(currentPage);
  const [nameFilter, setNameFilter] = useState("");
  const [trackNumberFilter, setTrackNumberFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    fetchWarehouses(currentPage);
  }, [currentPage]);

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
              if (e.key === "Enter") {
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
            placeholder="Поиск по трек номеру"
            value={trackNumberFilter}
            onChange={(e) => setTrackNumberFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWarehouses(currentPage, {
                  trackNumber: trackNumberFilter,
                });
              }
            }}
          />
        </div>

        <div className={s.select}>
          <CustomSelect
            options={[
              "Получен на складе получателя",
              "Отправлен",
              "Доставлено",
              "Готов к выдаче",
            ]}
            value={statusFilter || "Выберите статус"}
            onChange={(value) => setStatusFilter(value)}
          />
        </div>
        <div className={s.select}>
          <CustomSelect
            options={["США", "Турция"]}
            value={countryFilter || "Страна отправки"}
            onChange={(value) => setCountryFilter(value)}
          />
        </div>
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
