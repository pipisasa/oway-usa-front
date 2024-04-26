import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function MenClothingPlusSize() {
    // Значения для международного размера
    const internationalSizes = ['3XL', '3XL', '4XL', '4XL','5XL','5XL', '6XL', '6XL'];

    // Значения для обхвата груди (см)
    const chestSizes = ['137.2', '142.2', '142.2', '152.4', '157.5', '162.6', '167.6', '172.7'];

    // Значения для обхвата талии (см)
    const waistSizes = ['111.8', '119.4', '121.9', '129.5', '132.1', '139.7', '142.2', '147.3'];

    return (
      <>
      <TheHeader/>
      <div className={s.table_container}>
        <h6>Мужская одежда больших размеров</h6>
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
            <h5>
      Несмотря на то, что американские онлайн-магазины в большинстве случаев отталкиваются от         международного стандарта, размеры разных производителей и даже разных линеек у одного бренда могут сильно отличаться. Чтобы не ошибиться с выбором, советуем смотреть размерные сетки прямо на сайте магазина, а также проверить отзывы по конкретной модели, которую вы        собираетесь купить.
    </h5>
        </div>
      </>
    );
}
