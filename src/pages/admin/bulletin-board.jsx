import React from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import BulletinBoardCard from "@/components/shared/admin/BulletinBoardCard";
import AddBulletinBoard from "@/components/shared/admin/modals/AddBulletinBoard";

export default function BulletinBoardPage() {
  return (
    <main className={s.boards_page}>
      <AddBulletinBoard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
      <BulletinBoardCard />
    </main>
  );
}
