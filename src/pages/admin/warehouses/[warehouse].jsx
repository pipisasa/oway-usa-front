import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import WarehousesProductsTable from "@/components/shared/admin/WarehousesProductsTable";
import useWarehouses from "@/hooks/admin/useWarehouses";
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
    setFilters,
    deleteMultipleWarehouses,
  } = useWarehouses(currentPage);

  const [nameFilter, setNameFilter] = useState("");
  const [trackNumberFilter, setTrackNumberFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    fetchWarehouses({
      currentPage,
      name: nameFilter,
      track_number: trackNumberFilter,
      status: statusFilter,
      country: countryFilter,
    });
  }, [currentPage, nameFilter, trackNumberFilter, statusFilter, countryFilter]);

  const handleNameFilterChange = (value) => {
    setNameFilter(value);
    setFilters({ name: value });
  };

  const handleTrackNumberFilterChange = (value) => {
    setTrackNumberFilter(value);
    setFilters({ track_number: value });
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setFilters({ status: value });
  };

  const handleCountryFilterChange = (value) => {
    setCountryFilter(value);
    setFilters({ country: value });
  };

  return (
    <div className={s.warehouses_page}>
      <div className={s.filters}>
        <CustomSelect
          onNameFilterChange={handleNameFilterChange}
          onTrackNumberFilterChange={handleTrackNumberFilterChange}
          onStatusFilterChange={handleStatusFilterChange}
          onCountryFilterChange={handleCountryFilterChange}
        />
      </div>
      <WarehousesProductsTable
        currentPage={currentPage}
        setCurrent={setCurrentPage}
        current={currentPage}
        deleteMultipleWarehouses={deleteMultipleWarehouses}
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
