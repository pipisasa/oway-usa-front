import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import s from "@/styles/admin/UserCount.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UserCount() {
  const [activePeriod, setActivePeriod] = useState("week");
  const [chartData, setChartData] = useState({
    labels: ["28 Мар", "29 Мар", "30 Мар", "31 Мар", "1 Апр", "2 Апр", "3 Апр"],
    datasets: [
      {
        data: [3123, 2000, 4650, 2240, 3050, 2600, 3000],
        backgroundColor: "#027DDB",
      },
    ],
  });

  const handlePeriodClick = (period) => {
    setActivePeriod(period);

    const newData = {
      today: [3500, 3600, 2400],
      week: [3000, 2900, 3200, 3100, 2800, 3500, 3700],
      month: [
        1000, 1200, 1400, 1300, 1700, 1600, 1500, 1900, 1800, 2000, 2100, 2200,
        2400, 2300, 2600, 2500, 2900, 2800, 3100, 3000, 3300, 3200, 3400, 3600,
        3800, 4000, 3900, 3700, 3500, 3400,
      ],
    };

    setChartData({
      ...chartData,
      labels: newData[period].map((_, index) => `${index + 1}`),
      datasets: [
        {
          ...chartData.datasets[0],
          data: newData[period],
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        barThickness: 20,
      },
      y: {
        grid: {
          drawBorder: true,
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={s.chart_section}>
      <div className={s.title}>
        <h2>Новые пользователи</h2>
      </div>
      <div className={s.line}></div>
      <div className={s.chart_nav}>
        <div className={s.percentage}>
          <span>45%</span>{" "}
        </div>
        <div className={s.date_btn}>
          <button
            className={activePeriod === "today" ? s.active : ""}
            onClick={() => handlePeriodClick("today")}
          >
            Сегодня
          </button>
          <button
            className={activePeriod === "week" ? s.active : ""}
            onClick={() => handlePeriodClick("week")}
          >
            Неделя
          </button>
          <button
            className={activePeriod === "month" ? s.active : ""}
            onClick={() => handlePeriodClick("month")}
          >
            Месяц
          </button>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
