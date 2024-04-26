import s from "./Table.module.scss";

export default function WomenClothing() {
    // Значения для международного размера
    const internationalSizes = ['XS', 'XS', 'S', 'S','M','M', 'L','L', 'XL','XL'];

    // Значения для обхвата груди (см)
    const chestSizes = ['78.7', '81.3', '83.8', '86.4', '88.9', '91.4', '94', '96.5', '100.3', '105.4'];

    // Значения для обхвата талии (см)
    const waistSizes = ['63.5', '63.5', '66', '68.6', '71.1', '73.7', '76.2', '80', '83.8', '87.6'];

    // Значения для обхвата бедер (см)
    const hipSizes = ['88.9', '88.9','91.4', '94', '96.5', '99.1', '101.6', '105.4', '109.2', '113'];

    // Значения для российского размера
    const russianSizes = ['42', '42', '42-44', '44-46', '46', '46-48', '48', '50', '52', '54'];

    return (
        <div className={s.table_container}>
            <table>
                <tbody>
                    <tr>
                        <th>Международный размер</th>
                        {internationalSizes.map((size, index) => <td key={index}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват груди(см)</th>
                        {chestSizes.map((size, index) => <td key={index}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват талии(см)</th>
                        {waistSizes.map((size, index) => <td key={index}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Обхват бедер(см)</th>
                        {hipSizes.map((size, index) => <td key={index}>{size}</td>)}
                    </tr>
                    <tr>
                        <th>Российский размер</th>
                        {russianSizes.map((size, index) => <td key={index}>{size}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
