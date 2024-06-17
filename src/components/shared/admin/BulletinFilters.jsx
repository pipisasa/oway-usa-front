import React, { useState, useEffect } from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import { useRouter } from "next/router";

export default function BulletinFilters({ onSearchChange }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (router.pathname === "/admin/bulletin-board") {
      setActiveCategory("bulletin");
    } else if (router.pathname === "/admin/board-category") {
      setActiveCategory("category");
    }
  }, [router.pathname]);

  return (
    <div className={s.filtr}>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Поиск по названию"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {/* <div className={s.oldest_newest}>
        <button
          className={activeFilter === "newest" ? s.active : s.not_active}
          onClick={() => setActiveFilter("newest")}
        >
          Новые
        </button>
        <button
          className={activeFilter === "oldest" ? s.active : s.not_active}
          onClick={() => setActiveFilter("oldest")}
        >
          Старые
        </button>
      </div> */}
      <div className={s.adv_category}>
        <button
          className={activeCategory === "bulletin" ? s.active : s.not_active}
          onClick={() => {
            setActiveCategory("bulletin");
            router.push("/admin/bulletin-board");
          }}
        >
          Объявления
        </button>
        <button
          className={activeCategory === "category" ? s.active : s.not_active}
          onClick={() => {
            setActiveCategory("category");
            router.push("/admin/board-category");
          }}
        >
          Категории
        </button>
      </div>
    </div>
  );
}
