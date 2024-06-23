import React, { useState, useEffect } from "react";
import s from "@/styles/pages/admin/BulletinBoardPage.module.scss";
import { useRouter } from "next/router";

export default function BulletinFilters({ onSearchChange }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (router.pathname === "/admin/bulletin-board") {
      setActiveCategory("bulletin");
    } else if (router.pathname === "/admin/board-category") {
      setActiveCategory("category");
    }
  }, [router.pathname]);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    onSearchChange(searchText);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: searchText },
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleReset = () => {
    setSearchText("");
    onSearchChange("");
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: "" },
    });
  };

  return (
    <div className={s.filtr}>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleReset} className={s.reset_button}>
          Сбросить
        </button>
      </div>
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
