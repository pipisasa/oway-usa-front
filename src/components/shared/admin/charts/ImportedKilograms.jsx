import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import s from "@/styles/admin/LineChart.module.scss";
import { baseAxios } from "@/utils/baseAxios";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      grid: {
        drawBorder: true,
        display: true,
      },
      beginAtZero: true,
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
};

const monthNames = {
  "01": "янв",
  "02": "фев",
  "03": "мар",
  "04": "апр",
  "05": "май",
  "06": "июн",
  "07": "июл",
  "08": "авг",
  "09": "сен",
  10: "окт",
  11: "ноя",
  12: "дек",
};

const formatLabel = (label, period) => {
  if (period === "today") {
    return `${label}:00`;
  } else {
    const [year, month, day] = label.split("-");
    return `${parseInt(day, 10)} ${monthNames[month]}`;
  }
};

export default function ImportedKilograms() {
  const [activePeriod, setActivePeriod] = useState("month");
  const [currentCountry, setCurrentCountry] = useState(null);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await baseAxios.get(
        "/statics/admin_panel/warehouse-weight/",
        {
          params: {
            country: currentCountry,
          },
        }
      );
      return data;
    },
    queryKey: ["warehouses-weight", { currentCountry }],
  });

  const selectedPeriodData = data?.[activePeriod];

  const chartData = useMemo(() => {
    if (!selectedPeriodData) {
      return {
        labels: [],
        change: 0,
        datasets: [
          {
            label: "Кг было провезено",
            data: [],
            fill: true,
            backgroundColor: "rgba(2, 125, 219, 0.2)",
            borderColor: "rgba(2, 125, 219, 1)",
            pointBackgroundColor: "rgba(2, 125, 219, 1)",
            pointBorderColor: "#fff",
            tension: 0.4,
          },
        ],
      };
    }

    const labels = Object?.keys(selectedPeriodData);
    const values = Object.values(selectedPeriodData);

    // const currentTotal = values.reduce((a, b) => a + b, 0);
    // const previousTotal = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

    // const change =
    //   previousTotal > 0
    //     ? ((currentTotal - previousTotal) / previousTotal) * 100
    //     : 0;

    return {
      // ...chartData,
      change: 0,
      labels: labels.map((label) => formatLabel(label, activePeriod)),
      datasets: [
        {
          // ...chartData.datasets[0],
          data: values,
        },
      ],
    };
  }, [selectedPeriodData, activePeriod]);

  return (
    <div className={s.chart_container}>
      <div className={s.title}>
        <h2>Кг было провезено</h2>
        <div className={s.country}>
          <button
            className={currentCountry === 3 ? s.active : s.not_active}
            onClick={() => setCurrentCountry(3)}
          >
            <img src="/assets/icons/usa.svg" alt="USA" />
            США
          </button>
          <button
            className={currentCountry === 4 ? s.active : s.not_active}
            onClick={() => setCurrentCountry(4)}
          >
            <img src="/assets/icons/turkey.svg" alt="Turkey" />
            Турция
          </button>
        </div>
      </div>
      <div className={s.line}></div>
      <div className={s.chart_nav}>
        <div className={s.percentage}>
          <span>{chartData.change.toFixed(2)}%</span>
        </div>
        <div className={s.date_btn}>
          <button
            className={activePeriod === "today" ? s.active : s.not_active}
            onClick={() => setActivePeriod("today")}
          >
            Сегодня
          </button>
          <button
            className={activePeriod === "week" ? s.active : s.not_active}
            onClick={() => setActivePeriod("week")}
          >
            Неделя
          </button>
          <button
            className={activePeriod === "month" ? s.active : s.not_active}
            onClick={() => setActivePeriod("month")}
          >
            Месяц
          </button>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
