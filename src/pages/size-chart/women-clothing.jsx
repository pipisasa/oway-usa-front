import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function WomenClothing() {
  const internationalSizes = [
    "XS",
    "XS",
    "S",
    "S",
    "M",
    "M",
    "L",
    "L",
    "XL",
    "XL",
  ];

  const chestSizes = [
    "78.7",
    "81.3",
    "83.8",
    "86.4",
    "88.9",
    "91.4",
    "94",
    "96.5",
    "100.3",
    "105.4",
  ];

  const waistSizes = [
    "63.5",
    "63.5",
    "66",
    "68.6",
    "71.1",
    "73.7",
    "76.2",
    "80",
    "83.8",
    "87.6",
  ];

  const hipSizes = [
    "88.9",
    "88.9",
    "91.4",
    "94",
    "96.5",
    "99.1",
    "101.6",
    "105.4",
    "109.2",
    "113",
  ];

  const russianSizes = [
    "42",
    "42",
    "42-44",
    "44-46",
    "46",
    "46-48",
    "48",
    "50",
    "52",
    "54",
  ];

  return (
    <>
      <TheHeader />
      <div className={s.table_container}>
        <h6>Женская одежда</h6>
        <table>
          <tbody>
            <tr>
              <th>Международный размер</th>
              {internationalSizes.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <th>Обхват груди(см)</th>
              {chestSizes.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <th>Обхват талии(см)</th>
              {waistSizes.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <th>Обхват бедер(см)</th>
              {hipSizes.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
            <tr>
              <th>Российский размер</th>
              {russianSizes.map((size, index) => (
                <td key={index}>{size}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <h5>
          Несмотря на то, что американские онлайн-магазины в большинстве случаев
          отталкиваются от международного стандарта, размеры разных
          производителей и даже разных линеек у одного бренда могут сильно
          отличаться. Чтобы не ошибиться с выбором, советуем смотреть размерные
          сетки прямо на сайте магазина, а также проверить отзывы по конкретной
          модели, которую вы собираетесь купить.
        </h5>
      </div>
    </>
  );
}
