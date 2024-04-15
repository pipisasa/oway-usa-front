import React from "react";
import s from "@/styles/pages/user/MyWarehouse.module.scss";
import useWarehouses from "@/hooks/user/useWarehouses";
import Loading from "@/components/shared/admin/Loading";

export default function MyWarehouses() {
  const { products, isLoading, deleteWarehouses } = useWarehouses();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={s.my}>
      <div className={s.filters}>
        <div className={s.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input type="number" placeholder="Поиск по трак номеру" />
        </div>
        <select className={s.select} name="" id="">
          <option value="">Склад</option>
          <option value="">США</option>
          <option value="">Турция</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Склад</th>
            <th>Трак номер</th>
            <th>Курьерская служба</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.warehouse}</td>
              <td>{product.tracking_number}</td>
              <td>{product.courier_service}</td>
              <td className={s.actions}>
                <button onClick={() => deleteWarehouses(product.id)}>
                  <img src="/assets/icons/delete.svg" alt="delete" />
                </button>
                <button>
                  <img src="/assets/icons/edit.svg" alt="edit" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
