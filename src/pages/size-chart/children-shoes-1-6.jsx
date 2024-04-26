import s from "./Table.module.scss"
import TheHeader from "./TheHeader"

export default function womanjeans () {
    return(
       <>
	   <TheHeader/>
	   <div className={s.table_container}>
		<h6>Детская обувь 1-6</h6>
<table>
	<tbody>
		<tr>
			<td>
			<p></p>
			</td>
			<td colspan="5">1 - 1.5 года</td>
			<td colspan="3">2 года</td>
			<td colspan="3">3 года</td>
			<td colspan="2">4 года</td>
			<td colspan="2">5 лет</td>
			<td colspan="2">6 лет</td>
		</tr>
		<tr>
			<th>Сантиметры</th>
			<td>12.7</td>
			<td>13</td>
			<td>13.3</td>
			<td>14</td>
			<td>14.3</td>
			<td>14.6</td>
			<td>15.2</td>
			<td>15.6</td>
			<td>15.9</td>
			<td>16.5</td>
			<td>16.8</td>
			<td>17.1</td>
			<td>17.8</td>
			<td>18.1</td>
			<td>18.4</td>
			<td>19.1</td>
			<td>19.4</td>
		</tr>
		<tr>
			<th>США</th>
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
			<td>11.5</td>
			<td>12</td>
			<td>12.5</td>
			<td>13</td>
			<td>13.5</td>
		</tr>
		<tr>
			<th>Великобритания</th>
			<td>4.5</td>
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
			<td>11.5</td>
			<td>12</td>
			<td>12.5</td>
		</tr>
		<tr>
			<th>Европа</th>
			<td>21</td>
			<td>22</td>
			<td>22</td>
			<td>23</td>
			<td>23</td>
			<td>24</td>
			<td>25</td>
			<td>25</td>
			<td>26</td>
			<td>27</td>
			<td>27</td>
			<td>28</td>
			<td>28</td>
			<td>30</td>
			<td>30</td>
			<td>31</td>
			<td>31</td>
		</tr>
	</tbody>
</table>
<h5>
      Несмотря на то, что американские онлайн-магазины в большинстве случаев отталкиваются от         международного стандарта, размеры разных производителей и даже разных линеек у одного бренда могут сильно отличаться. Чтобы не ошибиться с выбором, советуем смотреть размерные сетки прямо на сайте магазина, а также проверить отзывы по конкретной модели, которую вы        собираетесь купить.
    </h5>
        </div>
	   </>
    )
}