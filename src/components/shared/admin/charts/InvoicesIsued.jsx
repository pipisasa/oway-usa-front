import React, { useState, useEffect } from "react";
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
import { getCookie } from "@/utils/cookieHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export default function InvoicesIssued() {
  const [activePeriod, setActivePeriod] = useState("month");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#027DDB",
      },
    ],
  });
  const [percentageChange, setPercentageChange] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(3);

  useEffect(() => {
    fetchData(activePeriod, currentCountry);
  }, [activePeriod, currentCountry]);

  const fetchData = async (period, countryId) => {
    const accessToken = getCookie("accessToken");
    const response = await fetch(
      `https://api-owayusa.com/api/statics/admin_panel/warehouse-paid/?country=${countryId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    updateChartData(data, period);
  };

  const handleCountryChange = (countryId) => {
    setCurrentCountry(countryId);
  };

  const updateChartData = (data, period) => {
    const periodData = data[period];
    const labels = Object.keys(periodData);
    const values = Object.values(periodData);

    const previousTotal = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
    const currentTotal = values.reduce((a, b) => a + b, 0);
    const change = previousTotal
      ? ((currentTotal - previousTotal) / previousTotal) * 100
      : 0;
    setPercentageChange(change.toFixed(2));

    let formattedLabels;
    if (period === "today") {
      formattedLabels = labels.map((label) => `${label}:00`);
    } else if (period === "week" || period === "month") {
      formattedLabels = labels.map((label) => {
        const [year, month, day] = label.split("-");
        return `${day} ${monthNames[month]}`;
      });
    } else {
      formattedLabels = labels;
    }

    setChartData({
      labels: formattedLabels,
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
        <h2>Сумма выписанных счетов</h2>
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
      <Bar data={chartData} options={options} />
    </div>
  );
}
