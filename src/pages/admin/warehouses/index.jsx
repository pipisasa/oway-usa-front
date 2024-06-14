import React, { useEffect } from "react";
import WarehousesCard from "@/components/shared/cards/WarehousesCard";
import s from "@/styles/pages/admin/Warehouses.module.scss";
import AddWarehouses from "@/components/shared/admin/modals/AddWarehouses";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import Loading from "@/components/shared/admin/Loading";

export default function WarehousesPage() {
  const { warehouses, fetchWarehouses, deleteWarehouse, loading, error } =
    useMainWarehouses();
  useEffect(() => {
    fetchWarehouses();
  }, []);
  console.log(warehouses);

  return (
    <section className={s.warehouses_container}>
      <AddWarehouses />
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : (
        warehouses.map((warehouse) => (
          <WarehousesCard key={warehouse.id} warehouse={warehouse} />
        ))
      )}
    </section>
  );
}
