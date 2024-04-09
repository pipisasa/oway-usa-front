import React, { useState } from "react";
import s from "@/styles/partials/SiteList.module.scss";
import useCountries from "@/hooks/admin/useCountries";
import { Checkbox } from "@nextui-org/react";
import useCategories from "@/hooks/admin/useCategories";
import useSites from "@/hooks/useSites";

export default function SiteList() {
  const [activeTab, setActiveTab] = useState("Все");
  const { countries } = useCountries();
  const { sites, isLoading, error } = useSites();

  const handleTabClick = (country) => {
    setActiveTab(country === "Все" ? "Все" : country.name);
    setSelectedCountry(country === "Все" ? "Все" : country);
    setSelectedCategory([]);
  };

  const { categories } = useCategories();

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category.id)) {
      setSelectedCategory(selectedCategory.filter((id) => id !== category.id));
    } else {
      setSelectedCategory([...selectedCategory, category.id]);
    }
  };

  return (
    <section className="container">
      <div className={s.site_container}>
        <div className={s.left_block}>
          <div className={s.tabs}>
            <button
              className={activeTab === "Все" ? s.active : ""}
              onClick={() => {
                setActiveTab("Все");
                setSelectedCountry(null);
                setSelectedCategory([]);
              }}
            >
              Все
            </button>
            {countries.map((country) => (
              <button
                key={country.id}
                className={activeTab === country.name ? s.active : ""}
                onClick={() => handleTabClick(country)}
              >
                <img
                  width={16}
                  height={16}
                  src={country.icon}
                  alt={country.name}
                />
                {country.name}
              </button>
            ))}
          </div>
          <div className={s.category_block}>
            <h3>Категории</h3>
            <div className={s.checkboxes}>
              {categories.map((category) => (
                <div className={s.checkboxes_block} key={category.id}>
                  <Checkbox
                    size="md"
                    onChange={() => handleCategoryChange(category)}
                  >
                    {category.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.site_list}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            sites.map((site, index) => (
              <div className={s.site_card} key={index}>
                <img src={site.logo} alt={site.name} />
                <h2>{site.name}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
