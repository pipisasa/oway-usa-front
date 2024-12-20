import s from "./Table.module.scss";
import TheHeader from "./TheHeader";

export default function womanjeans() {
  return (
    <>
      <TheHeader />
      <div>
        <div className={s.table_container}>
          <h6>Мужская обувь</h6>
          <table>
            <tbody>
              <tr>
                <th>Европейский</th>
                <td>40</td>
                <td>41</td>
                <td>41½</td>
                <td>42</td>
                <td>42½</td>
                <td>43</td>
                <td>43½</td>
                <td>44</td>
                <td>44½</td>
                <td>45</td>
                <td>46</td>
              </tr>
              <tr>
                <th>Английский</th>
                <td>6</td>
                <td>7</td>
                <td>7½</td>
                <td>8</td>
                <td>8½</td>
                <td>9</td>
                <td>9½</td>
                <td>10</td>
                <td>10½</td>
                <td>11</td>
                <td>12</td>
              </tr>
              <tr>
                <th>Американский</th>
                <td>7½</td>
                <td>8</td>
                <td>8½</td>
                <td>9</td>
                <td>9½</td>
                <td>10</td>
                <td>10½</td>
                <td>11</td>
                <td>11½</td>
                <td>12</td>
                <td>13</td>
              </tr>
              <tr>
                <th>Длина подошвы(см)</th>
                <td>26.67</td>
                <td>27.33</td>
                <td>27.67</td>
                <td>28</td>
                <td>28.33</td>
                <td>28.67</td>
                <td>29</td>
                <td>29.33</td>
                <td>29.67</td>
                <td>30</td>
                <td>30.67</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.table_container}>
          <h6>Женская обувь</h6>
          <table>
            <tbody>
              <tr>
                <th>Европейский</th>
                <td>35</td>
                <td>36</td>
                <td>36½</td>
                <td>37</td>
                <td>37½</td>
                <td>38</td>
                <td>38½</td>
                <td>39</td>
                <td>39½</td>
                <td>40</td>
                <td>41</td>
              </tr>
              <tr>
                <th>Английский</th>
                <td>2</td>
                <td>3</td>
                <td>3½</td>
                <td>4</td>
                <td>4½</td>
                <td>5</td>
                <td>5½</td>
                <td>6</td>
                <td>6½</td>
                <td>7</td>
                <td>8</td>
              </tr>
              <tr>
                <th>Американский</th>
                <td>5</td>
                <td>5½</td>
                <td>6</td>
                <td>6½</td>
                <td>7</td>
                <td>7½</td>
                <td>8</td>
                <td>8½</td>
                <td>9</td>
                <td>9½</td>
                <td>10</td>
              </tr>
              <tr>
                <th>Сапоги(см)</th>
                <td>24.3</td>
                <td>25.1</td>
                <td>25.5</td>
                <td>25.9</td>
                <td>26.4</td>
                <td>26.8</td>
                <td>27.2</td>
                <td>27.6</td>
                <td>28.1</td>
                <td>28.5</td>
                <td>29.3</td>
              </tr>
              <tr>
                <th>Открытая обувь(см)</th>
                <td>23.0</td>
                <td>23.6</td>
                <td>24.0</td>
                <td>24.3</td>
                <td>24.6</td>
                <td>25.0</td>
                <td>25.3</td>
                <td>25.6</td>
                <td>26.0</td>
                <td>26.3</td>
                <td>27.0</td>
              </tr>
              <tr>
                <th>Туфли-лодочки(см)</th>
                <td>25.0</td>
                <td>257</td>
                <td>26.0</td>
                <td>26.3</td>
                <td>26.7</td>
                <td>27.0</td>
                <td>27.3</td>
                <td>27.7</td>
                <td>28.0</td>
                <td>28.3</td>
                <td>29.0</td>
              </tr>
              <tr>
                <th>Сникеры(см)</th>
                <td>23.3</td>
                <td>24.0</td>
                <td>24.3</td>
                <td>24.7</td>
                <td>25.0</td>
                <td>25.3</td>
                <td>25.7</td>
                <td>26.0</td>
                <td>26.3</td>
                <td>26.7</td>
                <td>27.3</td>
              </tr>
            </tbody>
          </table>
          <h5>
            Несмотря на то, что американские онлайн-магазины в большинстве
            случаев отталкиваются от международного стандарта, размеры разных
            производителей и даже разных линеек у одного бренда могут сильно
            отличаться. Чтобы не ошибиться с выбором, советуем смотреть
            размерные сетки прямо на сайте магазина, а также проверить отзывы по
            конкретной модели, которую вы собираетесь купить.
          </h5>
        </div>
      </div>
    </>
  );
}
