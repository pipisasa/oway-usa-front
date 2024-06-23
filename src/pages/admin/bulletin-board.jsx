import React from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import AddBulletinBoard from "@/components/shared/admin/modals/AddBulletinBoard";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import Loading from "@/components/shared/admin/Loading";
import BulletinFilters from "@/components/shared/admin/BulletinFilters";
import BulletinBoardCards from "@/components/shared/admin/BulletinBoardCards";

export default function BulletinBoardPage() {
  const { bulletins, loading, error, getBulletinBoards } = useBulletinBoard();

  const handleSearchChange = (searchText) => {
    getBulletinBoards(searchText);
  };

  if (loading) return <Loading />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <section>
      <BulletinFilters onSearchChange={handleSearchChange} />
      <div className={s.boards_page}>
        <AddBulletinBoard />
        {bulletins.map((bulletin) => (
          <BulletinBoardCards key={bulletin.id} bulletin={bulletin} />
        ))}
      </div>
    </section>
  );
}
