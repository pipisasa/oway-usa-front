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
                <td>M7</td>
                <td>M8</td>
                <td>M9</td>
                <td>M10</td>
                <td>M11</td>
                <td>M12</td>
                <td>M13</td>
                <td>M14</td>
                <td>M15</td>
                <td>M16</td>
                <td>M17</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>39-40</td>
                <td>41-42</td>
                <td>42-43</td>
                <td>43-44</td>
                <td>45-46</td>
                <td>46-47</td>
                <td>48-49</td>
                <td>49-50</td>
                <td>50-51</td>
                <td>51-52</td>
                <td>52-53</td>
              </tr>
              <tr>
                <th>Российский</th>
                <td>40</td>
                <td>41</td>
                <td>42</td>
                <td>43</td>
                <td>44</td>
                <td>45</td>
                <td>46</td>
                <td>47</td>
                <td>48</td>
                <td>49</td>
                <td>50</td>
              </tr>
              <tr>
                <th>Сантиметры</th>
                <td>24,6</td>
                <td>25,5</td>
                <td>26,3</td>
                <td>27,2</td>
                <td>28,0</td>
                <td>28,8</td>
                <td>29,7</td>
                <td>30,5</td>
                <td>31,4</td>
                <td>32,3</td>
                <td>33,1</td>
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
                <td>W5</td>
                <td>W6</td>
                <td>W7</td>
                <td>W8</td>
                <td>W9</td>
                <td>W10</td>
                <td>W11</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>34-35</td>
                <td>36-37</td>
                <td>37-38</td>
                <td>38-39</td>
                <td>39-40</td>
                <td>41-42</td>
                <td>42-43</td>
              </tr>
              <tr>
                <th>Российский</th>
                <td>35</td>
                <td>36</td>
                <td>37</td>
                <td>38</td>
                <td>39</td>
                <td>40</td>
                <td>41</td>
              </tr>
              <tr>
                <th>Сантиметры</th>
                <td>22,1</td>
                <td>22,9</td>
                <td>23,8</td>
                <td>24,6</td>
                <td>25,5</td>
                <td>26,3</td>
                <td>27,2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.table_container}>
          <h6>Размеры унисекс</h6>
          <table>
            <tbody>
              <tr>
                <th>Американский</th>
                <td>M4/W6</td>
                <td>M5/W7</td>
                <td>M6/W8</td>
                <td>M7/W9</td>
                <td>M8/W10</td>
                <td>M9/W11</td>
                <td>M10/W12</td>
              </tr>
              <tr>
                <th>Европейский</th>
                <td>36-37</td>
                <td>37-38</td>
                <td>38-39</td>
                <td>39-40</td>
                <td>41-42</td>
                <td>42-43</td>
                <td>43-44</td>
              </tr>
              <tr>
                <th>Российский</th>
                <td>36-37</td>
                <td>37-38</td>
                <td>38-39</td>
                <td>39-40</td>
                <td>40-41</td>
                <td>41-42</td>
                <td>42-43</td>
              </tr>
              <tr>
                <th>Сантиметры</th>
                <td>22,1</td>
                <td>22,9</td>
                <td>23,8</td>
                <td>24,6</td>
                <td>25,5</td>
                <td>26,3</td>
                <td>27,2</td>
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
