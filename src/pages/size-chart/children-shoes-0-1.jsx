import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function womanjeans() {
  return (
    <>
      <TheHeader />
      <div className={s.table_container}>
        <h6>Обувь (от 0 до 1 года)</h6>
        <table>
          <tbody>
            <tr>
              <th>Сантиметры</th>
              <td>8.3</td>
              <td>8.9</td>
              <td>9.2</td>
              <td>9.5</td>
              <td>10.2</td>
              <td>10.5</td>
              <td>10.8</td>
              <td>11.4</td>
              <td>11.7</td>
              <td>12.1</td>
            </tr>
            <tr>
              <th>США</th>
              <td>0.5</td>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
              <td>2.5</td>
              <td>3</td>
              <td>3.5</td>
              <td>4</td>
              <td>4.5</td>
              <td>5</td>
            </tr>
            <tr>
              <th>Великобритания</th>
              <td>0</td>
              <td>0.5</td>
              <td>1</td>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
              <td>2.5</td>
              <td>3</td>
              <td>3.5</td>
              <td>4</td>
            </tr>
            <tr>
              <th>Европа</th>
              <td>16</td>
              <td>16</td>
              <td>17</td>
              <td>17</td>
              <td>18</td>
              <td>18</td>
              <td>19</td>
              <td>19</td>
              <td>20</td>
              <td>20</td>
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
