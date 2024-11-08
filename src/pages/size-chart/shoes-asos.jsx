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
                <th>Английский</th>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>7.5</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
                <td>9.5</td>
                <td>10</td>
                <td>10.5</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>35.5</td>
                <td>37</td>
                <td>38</td>
                <td>39</td>
                <td>40.5</td>
                <td>41</td>
                <td>42</td>
                <td>42.5</td>
                <td>43</td>
                <td>44</td>
                <td>44.5</td>
                <td>45</td>
                <td>46</td>
                <td>47</td>
                <td>48</td>
                <td>49.5</td>
              </tr>
              <tr>
                <th>Американский</th>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
                <td>9.5</td>
                <td>10</td>
                <td>10.5</td>
                <td>11</td>
                <td>11.5</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
              </tr>
              <tr>
                <th>Длина стопы (MM)</th>
                <td>220</td>
                <td>229</td>
                <td>237</td>
                <td>246</td>
                <td>254</td>
                <td>258</td>
                <td>262</td>
                <td>266</td>
                <td>271</td>
                <td>275</td>
                <td>279</td>
                <td>283</td>
                <td>288</td>
                <td>296</td>
                <td>305</td>
                <td>314</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.table_container}>
          <h6>Женская обувь</h6>
          <table>
            <tbody>
              <tr>
                <th>Английский</th>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>
              <tr>
                <th>Австралийский</th>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
              </tr>
              <tr>
                <th>Американский</th>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>35</td>
                <td>36</td>
                <td>37</td>
                <td>38</td>
                <td>39</td>
                <td>40</td>
                <td>41</td>
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
