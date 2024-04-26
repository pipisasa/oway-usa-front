import s from "./Table.module.scss";

export default function MenClothingPlusSize() {
    // Значения для международного размера
    const internationalSizes = ['3XL', '3XL', '4XL', '4XL','5XL','5XL', '6XL', '6XL'];

    // Значения для обхвата груди (см)
    const chestSizes = ['137.2', '142.2', '142.2', '152.4', '157.5', '162.6', '167.6', '172.7'];

    // Значения для обхвата талии (см)
    const waistSizes = ['111.8', '119.4', '121.9', '129.5', '132.1', '139.7', '142.2', '147.3'];

    return (
        <div className={s.table_container}>
            <table className={s.table}>
                <tbody>
                    <tr>
                        <th>Международный размер</th>
                        {internationalSizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват груди (см)</th>
                        {chestSizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват талии (см)</th>
                        {waistSizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
