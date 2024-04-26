import s from './TheHeader.module.scss';
import Link from 'next/link';

export default function TheHeader() {
    const categories = [
        {
            title: 'Мужчины',
            links: [
                { text: 'Одежда', href: '/size-chart/men-clothing' },
                { text: 'Одежда больших размеров', href: '/size-chart/men-clothing-plus-size' },
                { text: 'Джинсы', href: '/size-chart/men-jeans' }
            ]
        },
        {
            title: 'Женщины',
            links: [
                { text: 'Одежда', href: '/size-chart/women-clothing' },
                { text: 'Одежда больших размеров', href: '/size-chart/women-clothing-plus-size' },
                { text: 'Джинсы', href: '/size-chart/woman-jeans' }
            ]
        },
        {
            title: 'Дети',
            links: [
                { text: 'Обувь (от 0 до 1 года)', href: '/size-chart/children-shoes-0-1' },
                { text: 'Обувь (от 1 до 6 лет)', href: '/size-chart/children-shoes-1-6' },
                { text: 'Обувь (от 7 до 10 лет)', href: '/size-chart/teenage-shoes-7-10' }
            ]
        },
        {
            title: 'Бренды',
            links: [
                { text: 'Обувь Adidas', href: '/size-chart/shoes-adidas' },
                { text: 'Обувь Nike', href: '/size-chart/shoes-nike' },
                { text: 'Обувь Puma', href: '/size-chart/shoes-puma' },
                { text: 'Обувь Reebok', href: '/size-chart/shoes-reebok' },
                { text: 'Обувь Crocs', href: '/size-chart/shoes-crocs' },
                { text: 'Обувь New Balance', href: '/size-chart/shoes-new-balance' },
                { text: 'Обувь The North Face', href: '/size-chart/shoes-north-face' },
                { text: 'Обувь Asos', href: '/size-chart/shoes-asos' },
                { text: 'Обувь Guess', href: '/size-chart/shoes-guess' },
                { text: 'Обувь Calvin Klein', href: '/size-chart/shoes-calvin-klein' }
            ]
        }
    ];

    return (
        <div className={s.header}>
            <h1>Таблица размеров мужской одежды</h1>
            <div className={s.table}>
                {categories.map((category, index) => (
                    <div key={index} className={s.table_text}>
                        <h2>{category.title}</h2>
                        {category.links.map((link, linkIndex) => (
                            <Link key={linkIndex} href={link.href} passHref>
                                <p>{link.text}</p>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
