import React, { useState } from "react";
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
  const [activePeriod, setActivePeriod] = useState("today");

  const [chartData, setChartData] = useState({
    labels: ["28 Мар", "29 Мар", "30 Мар", "31 Мар", "1 Апр", "2 Апр", "3 Апр"], // Начальные метки
    datasets: [
      {
        label: "Кг было провезено",
        data: [3123, 4000, 2500, 3100, 2000, 2200, 3123], // Начальные данные
        fill: true,
        backgroundColor: "rgba(2, 125, 219, 0.2)",
        borderColor: "rgba(2, 125, 219, 1)",
        pointBackgroundColor: "rgba(2, 125, 219, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  });

  const handlePeriodClick = (period) => {
    setActivePeriod(period);
    const updatedData = {
      today: [4000, 2000, 3000],
      week: [3000, 3100, 2900, 2800, 3200, 3300, 3400],
      month: [
        2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100,
        3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300,
        4400, 4500, 4600, 4700, 4800, 4900,
      ],
    };
    setChartData({
      ...chartData,
      labels: updatedData[period].map((_, index) => `${index + 1}`),
      datasets: [
        {
          ...chartData.datasets[0],
          data: updatedData[period],
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
        <h2>Кг было провезено</h2>
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
      <Line data={chartData} options={options} />
    </div>
  );
}
