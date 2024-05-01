import { useRouter } from "next/router";
import s from "./TheHeader.module.scss";
import Link from "next/link";

export default function TheHeader() {
  const router = useRouter();

  const categories = [
    {
      title: "Мужчины",
      links: [
        {
          text: "Одежда",
          href: "/size-chart/men-clothing",
          title: "Таблица размеров мужской одежды",
        },
        {
          text: "Одежда больших размеров",
          href: "/size-chart/men-clothing-plus-size",
          title: "Таблица больших размеров мужской одежды",
        },
        {
          text: "Джинсы",
          href: "/size-chart/men-jeans",
          title: "Таблица размеров мужских джинсов",
        },
      ],
    },
    {
      title: "Женщины",
      links: [
        {
          text: "Одежда",
          href: "/size-chart/women-clothing",
          title: "Таблица размеров женской одежды",
        },
        {
          text: "Одежда больших размеров",
          href: "/size-chart/women-clothing-plus-size",
          title: "Таблица больших размеров женской одежды",
        },
        {
          text: "Джинсы",
          href: "/size-chart/woman-jeans",
          title: "Таблица размеров женских джинсов",
        },
      ],
    },
    {
      title: "Дети",
      links: [
        {
          text: "Обувь (от 0 до 1 года)",
          href: "/size-chart/children-shoes-0-1",
          title: "Таблица размеров детской обуви (от 0 до 1 года)",
        },
        {
          text: "Обувь (от 1 до 6 лет)",
          href: "/size-chart/children-shoes-1-6",
          title: "Таблица размеров детской обуви (от 1 до 6 лет)",
        },
        {
          text: "Обувь (от 7 до 10 лет)",
          href: "/size-chart/teenage-shoes-7-10",
          title: "Таблица размеров подростковой обуви (от 7 до 10 лет)",
        },
      ],
    },
    {
      title: "Бренды",
      links: [
        {
          text: "Обувь Adidas",
          href: "/size-chart/shoes-adidas",
          title: "Таблица размеров обуви Адидас",
        },
        {
          text: "Обувь Nike",
          href: "/size-chart/shoes-nike",
          title: "Таблица размеров обуви Найк",
        },
        {
          text: "Обувь Puma",
          href: "/size-chart/shoes-puma",
          title: "Таблица размеров обуви Пума",
        },
        {
          text: "Обувь Reebok",
          href: "/size-chart/shoes-reebok",
          title: "Таблица размеров обуви Рибок",
        },
        {
          text: "Обувь Crocs",
          href: "/size-chart/shoes-crocs",
          title: "Таблица размеров обуви Крокс",
        },
        {
          text: "Обувь New Balance",
          href: "/size-chart/shoes-new-balance",
          title: "Таблица размеров обуви Нью Баланс",
        },
        {
          text: "Обувь The North Face",
          href: "/size-chart/shoes-north-face",
          title: "Таблица размеров обуви The North Face",
        },
        {
          text: "Обувь Asos",
          href: "/size-chart/shoes-asos",
          title: "Таблица размеров обуви Асос",
        },
        {
          text: "Обувь Guess",
          href: "/size-chart/shoes-guess",
          title: "Таблица размеров обуви Гесс",
        },
        {
          text: "Обувь Calvin Klein",
          href: "/size-chart/shoes-calvin-klein",
          title: "Таблица размеров обуви Кельвин Кляйн",
        },
      ],
    },
  ];

  const currentCategory = categories.find((category) =>
    category.links.some((link) => router.pathname.includes(link.href))
  );

  const currentPageTitle = currentCategory
    ? currentCategory.links.find((link) => router.pathname.includes(link.href))
        .title
    : "Таблица размеров";

  return (
    <div className={s.header}>
      {currentPageTitle && <h1>{currentPageTitle}</h1>
      }
       {!currentPageTitle && <h1>Таблица размеров</h1>
      }
      <div className={s.table}>
        {categories.map((category, index) => (
          <div key={index} className={s.table_text}>
            <div className={s.border}>
            <h2>{category.title}</h2>
            </div>
            <div className={s.border}>
            {category.links.map((link, linkIndex) => (
              <Link key={linkIndex} href={link.href} passHref>
                <p>{link.text}</p>
              </Link>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
