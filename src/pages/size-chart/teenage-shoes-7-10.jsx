import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function womanjeans() {
  return (
    <>
      <TheHeader />
      <div className={s.table_container}>
        <h6>Подростковая обувь (от 7 до 10 лет)</h6>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td colspan="7">7 лет</td>
              <td colspan="3">8 лет</td>
              <td colspan="2">9 лет</td>
              <td>10 лет</td>
            </tr>
            <tr>
              <th>Сантиметры</th>
              <td>19.7</td>
              <td>20.3</td>
              <td>20.6</td>
              <td>21</td>
              <td>21.6</td>
              <td>21.9</td>
              <td>22.2</td>
              <td>22.9</td>
              <td>23.2</td>
              <td>23.5</td>
              <td>24.1</td>
              <td>24.4</td>
              <td>24.8</td>
            </tr>
            <tr>
              <th>США</th>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
              <td>2.5</td>
              <td>3</td>
              <td>3.5</td>
              <td>4</td>
              <td>4.5</td>
              <td>5</td>
              <td>5.5</td>
              <td>6</td>
              <td>6.5</td>
              <td>7</td>
            </tr>
            <tr>
              <th>Великобритания</th>
              <td>13</td>
              <td>14</td>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
              <td>2.5</td>
              <td>3</td>
              <td>3.5</td>
              <td>4</td>
              <td>4.5</td>
              <td>5</td>
              <td>5.5</td>
              <td>6</td>
            </tr>
            <tr>
              <th>Европа</th>
              <td>32</td>
              <td>33</td>
              <td>33</td>
              <td>34</td>
              <td>34</td>
              <td>35</td>
              <td>36</td>
              <td>36</td>
              <td>37</td>
              <td>37</td>
              <td>38</td>
              <td>38</td>
              <td>39</td>
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
