import React from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import BulletinBoardCard from "@/components/shared/admin/BulletinBoardCard";
import AddBulletinBoard from "@/components/shared/admin/modals/AddBulletinBoard";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import Loading from "@/components/shared/admin/Loading";

export default function BulletinBoardPage() {
  const { bulletins, loading, error } = useBulletinBoard();

  if (loading) return <Loading />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <section className={s.boards_page}>
      <AddBulletinBoard />
      {bulletins.map((bulletin) => (
        <BulletinBoardCard key={bulletin.id} bulletin={bulletin} />
      ))}
    </section>
  );
}
