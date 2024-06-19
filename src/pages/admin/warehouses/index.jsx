import React, { useEffect } from "react";
import WarehousesCard from "@/components/shared/cards/WarehousesCard";
import s from "@/styles/pages/admin/Warehouses.module.scss";
import c from "@/styles/components/shared/cards/WarehousesCard.module.scss";
import AddWarehouses from "@/components/shared/admin/modals/AddWarehouses";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import Loading from "@/components/shared/admin/Loading";
import Link from "next/link";

export default function WarehousesPage() {
  const { warehouses, fetchWarehouses, deleteWarehouse, loading, error } =
    useMainWarehouses();
  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <section className={s.warehouses_container}>
      <AddWarehouses />
      <div>
        <div className={c.card1}>
          <div className={c.card_info1}>
            <h2>Все посылки</h2>
          </div>
          <button className={c.view1}>
            <Link href="/admin/warehouses/warehousesall">Посмотреть</Link>
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : (
        warehouses.map((warehouse) => (
          <WarehousesCard
            key={warehouse.id}
            deleteWarehouse={deleteWarehouse}
            warehouse={warehouse}
          />
        ))
      )}
    </section>
  );
}
