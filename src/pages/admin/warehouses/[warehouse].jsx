import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";
import useWarehouses from "@/hooks/admin/useWarehouses";
import AdminCustomSelect from "@/components/partials/AdminCustomSelect";
import SearchSelect from "@/components/partials/SearchSelect";
import CustomSelect from "@/components/partials/select/SearchSelectCustom";

export default function AdminWarehousesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    warehouses,
    fetchWarehouses,
    deleteWarehouse,
    isLoading,
    error,
    count,
  } = useWarehouses(currentPage);
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
        <CustomSelect />
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
        deleteWarehouse={deleteWarehouse}
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
