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
                <th>Американский</th>
                <td>7</td>
                <td>7.5</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
                <td>9.5</td>
                <td>10</td>
                <td>10.5</td>
                <td>11</td>
                <td>11.5</td>
                <td>12</td>
                <td>12.5</td>
                <td>13</td>
                <td>13.5</td>
                <td>14</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>39</td>
                <td>40</td>
                <td>40.5</td>
                <td>41</td>
                <td>42</td>
                <td>42.5</td>
                <td>43</td>
                <td>44</td>
                <td>44.5</td>
                <td>45</td>
                <td>45.5</td>
                <td>46</td>
                <td>47</td>
                <td>47.5</td>
                <td>48</td>
              </tr>
              <tr>
                <th>ДЛИНА СТЕЛЬКИ, см</th>
                <td>25</td>
                <td>25.5</td>
                <td>26</td>
                <td>26.5</td>
                <td>27</td>
                <td>27.5</td>
                <td>28</td>
                <td>28.5</td>
                <td>29</td>
                <td>29.5</td>
                <td>30</td>
                <td>30.5</td>
                <td>31</td>
                <td>31.5</td>
                <td>32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.table_container}>
          <h6>Женская обувь</h6>
          <table>
            <tbody>
              <tr>
                <th>Американский</th>
                <td>5</td>
                <td>5.5</td>
                <td>6</td>
                <td>6.5</td>
                <td>7</td>
                <td>7.5</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
                <td>9.5</td>
                <td>10</td>
                <td>10.5</td>
                <td>11</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>36</td>
                <td>36.5</td>
                <td>37</td>
                <td>37.5</td>
                <td>38</td>
                <td>38.5</td>
                <td>39</td>
                <td>39.5</td>
                <td>40</td>
                <td>40.5</td>
                <td>41</td>
                <td>41.5</td>
                <td>42</td>
              </tr>
              <tr>
                <th>ДЛИНА СТЕЛЬКИ, см</th>
                <td>22</td>
                <td>22.5</td>
                <td>23</td>
                <td>23.5</td>
                <td>24</td>
                <td>24.5</td>
                <td>25</td>
                <td>25.5</td>
                <td>26</td>
                <td>26.5</td>
                <td>27</td>
                <td>28</td>
                <td>28.5</td>
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
