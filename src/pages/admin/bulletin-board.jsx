import React, { useState } from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import AddBulletinBoard from "@/components/shared/admin/modals/AddBulletinBoard";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import Loading from "@/components/shared/admin/Loading";
import { useRouter } from "next/router";
import BulletinFilters from "@/components/shared/admin/BulletinFilters";
import BulletinBoardCards from "@/components/shared/admin/BulletinBoardCards";

export default function BulletinBoardPage() {
  const { bulletins, loading, error } = useBulletinBoard();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Loading />;
  if (error) return <p>Ошибка: {error}</p>;

  const filteredBulletins = bulletins.filter((bulletin) =>
    bulletin.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <BulletinFilters onSearchChange={setSearchTerm} />
      <div className={s.boards_page}>
        <AddBulletinBoard />
        {filteredBulletins.map((bulletin) => (
          <BulletinBoardCards key={bulletin.id} bulletin={bulletin} />
        ))}
      </div>
    </section>
  );
}
