import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function womanjeans() {
  return (
    <>
      <TheHeader />
      <div className={s.table_container}>
        <h6>Женские джинсы</h6>
        <table>
          <tbody>
            <tr>
              <th>Размер (Россия)</th>
              <td>40</td>
              <td>42</td>
              <td>42/44</td>
              <td>44</td>
              <td>44/46</td>
              <td>46</td>
              <td>46/48</td>
              <td>48</td>
              <td>48/50</td>
            </tr>
            <tr>
              <th>Размер (США)</th>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>29-30</td>
              <td>30-31</td>
              <td>32</td>
              <td>34</td>
            </tr>
            <tr>
              <th>Обхват груди(см)</th>
              <td>63.5</td>
              <td>66</td>
              <td>68.6</td>
              <td>71.1</td>
              <td>73.7</td>
              <td>76.2</td>
              <td>80</td>
              <td>83.8</td>
              <td>87.6</td>
            </tr>
            <tr>
              <th>Обхват талии(см)</th>
              <td>88.9</td>
              <td>91.4</td>
              <td>94</td>
              <td>96.5</td>
              <td>99.1</td>
              <td>101.6</td>
              <td>105.4</td>
              <td>109.2</td>
              <td>113</td>
            </tr>
            <tr>
              <th>Обхват бедер(см)</th>
              <td>42</td>
              <td>42-44</td>
              <td>44-46</td>
              <td>46</td>
              <td>46-48</td>
              <td>48</td>
              <td>50</td>
              <td>52</td>
              <td>54</td>
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
