import s from "./Table.module.scss";

export default function MenJeans() {
    // Значения для размера
    const sizes = ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'];

    // Значения для обхвата талии (см)
    const waistSizes = ['71.1', '73.7', '76.2', '78.7', '81.3', '83.8', '86.4', '88.9', '91.4', '94', '96.5', '99.1', '101.6'];

    // Значения для длины изнутри (см) по разным размерам
    const inseamSizes = {
        'x28': '71.1',
        'x30': '76.2',
        'x32': '81.3',
        'x34': '86.4',
        'x36': '91.4'
    };

    // Значения для российского размера
    const russianSizes = ['42', '44', '44-46', '46-48', '48', '50', '50', '50-52', '52', '52-54', '54', '54-56', '56'];

    return (
        <div className={s.table_container}>
            <table className={s.table}>
                <tbody>
                    <tr>
                        <th>Размер</th>
                        {sizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват талии (см)</th>
                        {waistSizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                    <tr>
                        <td colSpan="14">Длина изнутри (см)</td>
                    </tr>
                    {Object.entries(inseamSizes).map(([size, value]) => (
                        <tr key={size}>
                            <th>{size}</th>
                            {sizes.map(() => <td key={value}>{value}</td>)}
                        </tr>
                    ))}
                    <tr>
                        <th>Российский размер</th>
                        {russianSizes.map(size => <td key={size}>{size}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
