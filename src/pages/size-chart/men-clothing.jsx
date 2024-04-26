import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function MenClothing() {
    const internationalSizes = ['S', 'S', 'M','M', 'L', 'L', 'XL', 'XL', 'XXL', 'XXL', 'XXXL', 'XXXL'];

    const chestSizes = ['86.4', '91.4', '96.5', '101.6', '106.7', '111.8', '116.8', '121.9', '127', '132.1', '137.2', '142.2'];

    const waistSizes = ['71.1', '73.7', '76.2', '83.8', '86.4', '91.4', '94', '101.6', '104.1', '109.2', '111.8', '119.4'];

    const russianSizes = ['44', '46', '48', '50', '52','52', '54', '54', '56', '56', '58', '58'];

    return (
        <>
            <TheHeader/>
            <div className={s.table_container}>
                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Международный размер</th>
                            {internationalSizes.map(size => <th key={size} className={s["international-size"]}>{size}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Обхват груди (см)</td>
                            {chestSizes.map(size => <td key={size} className={s.chest_size}>{size}</td>)}
                        </tr>
                        <tr>
                            <td>Обхват талии (см)</td>
                            {waistSizes.map(size => <td key={size} className={s.waist_size}>{size}</td>)}
                        </tr>
                        <tr>
                            <td>Российский размер</td>
                            {russianSizes.map(size => <td key={size} className={s.russian_size}>{size}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
