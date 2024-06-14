import React from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import BulletinBoardCard from "@/components/shared/admin/BulletinBoardCard";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import Loading from "@/components/shared/admin/Loading";
import { useRouter } from "next/router";
import BulletinFilters from "@/components/shared/admin/BulletinFilters";
import AddBulletinCategoryBoard from "@/components/shared/admin/modals/AddBulletinBoardCategory";

export default function BulletinCategoryBoardPage() {
  const { bulletins, loading, error } = useBulletinBoard();
  const router = useRouter();

  if (loading) return <Loading />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <section>
      <BulletinFilters />
      <div className={s.boards_page}>
        <AddBulletinCategoryBoard />
        {bulletins.map((bulletin) => (
          <BulletinBoardCard key={bulletin.id} bulletin={bulletin} />
        ))}
      </div>
    </section>
  );
}
