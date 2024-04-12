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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ImportedProducts() {
  const [activePeriod, setActivePeriod] = useState("today");
  const [percentageChange, setPercentageChange] = useState(0);
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
    fetchData(activePeriod);
  }, [activePeriod]);

  const fetchData = async (period) => {
    const accessToken = getCookie("accessToken");
    const url = `https://api-owayusa.com/api/statics/admin_panel/warehouse-delivered/`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    updateChartData(data, period);
  };

  const updateChartData = (data, period) => {
    const periodData = data[period];
    const labels = Object.keys(periodData);
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
      </div>
      <div className={s.line}></div>
      <div className={s.chart_nav}>
        <div className={s.percentage}>
          <span>{percentageChange}%</span>
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
