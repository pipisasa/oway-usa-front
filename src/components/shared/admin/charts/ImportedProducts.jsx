import React, { useState, useEffect } from "react";
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
import { baseAxios } from "../../../../utils/baseAxios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function ImportedProducts() {
  const [activePeriod, setActivePeriod] = useState("month");
  const [percentageChange, setPercentageChange] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(3);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Провезенных товаров",
        data: [],
        fill: true,
        backgroundColor: "rgba(2, 125, 219, 0.2)",
        borderColor: "rgba(2, 125, 219, 1)",
        pointBackgroundColor: "rgba(2, 125, 219, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  });

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

  useEffect(() => {
    fetchData(activePeriod, currentCountry);
  }, [activePeriod, currentCountry]);

  const fetchData = async (period, countryId) => {
    const { data } = await baseAxios.get(
      "/statics/admin_panel/warehouse-delivered/",
      {
        params: {
          country_of_destination_id: countryId,
        },
      }
    );
    updateChartData(data, period);
  };

  const handleCountryChange = (countryId) => {
    setCurrentCountry(countryId);
  };

  const updateChartData = (data, period) => {
    const periodData = data[period];
    const labels = Object?.keys(periodData);
    const values = Object.values(periodData);

    const currentTotal = values.reduce((a, b) => a + b, 0);
    const previousTotal = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

    const change =
      previousTotal > 0
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : 0;
    setPercentageChange(change.toFixed(2));

    setChartData({
      ...chartData,
      labels: labels.map((label) => formatLabel(label, period)),
      datasets: [
        {
          ...chartData.datasets[0],
          data: values,
        },
      ],
    });
  };

  const handlePeriodClick = (period) => {
    setActivePeriod(period);
  };

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

  return (
    <div className={s.chart_container}>
      <div className={s.title}>
        <h2>Провезенных товаров</h2>
        <div className={s.country}>
          <button
            className={currentCountry === 3 ? s.active : s.not_active}
            onClick={() => handleCountryChange(3)}
          >
            <img src="/assets/icons/usa.svg" alt="USA" />
            США
          </button>
          <button
            className={currentCountry === 4 ? s.active : s.not_active}
            onClick={() => handleCountryChange(4)}
          >
            <img src="/assets/icons/turkey.svg" alt="Turkey" />
            Турция
          </button>
        </div>
      </div>
      <div className={s.line}></div>
      <div className={s.chart_nav}>
        <div className={s.percentage}>
          <span>{percentageChange}%</span>
        </div>
        <div className={s.date_btn}>
          <button
            className={activePeriod === "today" ? s.active : s.not_active}
            onClick={() => handlePeriodClick("today")}
          >
            Сегодня
          </button>
          <button
            className={activePeriod === "week" ? s.active : s.not_active}
            onClick={() => handlePeriodClick("week")}
          >
            Неделя
          </button>
          <button
            className={activePeriod === "month" ? s.active : s.not_active}
            onClick={() => handlePeriodClick("month")}
          >
            Месяц
          </button>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
