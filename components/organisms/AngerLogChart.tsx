"use client";

import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AngerLogIcon from "../atoms/AngerLogIcon";
import { DateTime } from "luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type AngerLogListProps = {
  filter: {
    type: "daily" | "monthly";
    year: string;
    month: string;
    day?: string;
  };
};
type AngerRecord = {
  occurredDate: string;
  _max: { level: number };
};
type CategoryData = {
  content: string;
  level: number;
};
const AngerChart: React.FC<AngerLogListProps> = ({ filter }) => {
  const [averageLevel, setAverageLevel] = useState(0);
  const [topCategories, setTopCategories] = useState<CategoryData[]>([]);
  const [lineChartData, setLineChartData] = useState({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[],
  });

  useEffect(() => {
    let toastId: string | number | undefined;
    const fetchChartLogs = async () => {
      toastId = toast.loading("チャート情報取得中・・・・。");
      try {
        const params = new URLSearchParams(filter).toString();
        const response = await fetch(`/api/angerlog/chart?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anger logs");
        }
        const data = await response.json();
        if (data.aggregatedData) {
          setAverageLevel(data.averageLevel);
          setTopCategories(data.categoryData);
          const labels = [];
          const dataPoints = [];
          if (filter.type === "daily") {
            for (let hour = 0; hour < 24; hour++) {
              const maxLevel = data.aggregatedData
                .filter(
                  (record: AngerRecord) =>
                    DateTime.fromISO(record.occurredDate, {
                      zone: "Asia/Tokyo",
                    }).hour === hour
                )
                .reduce(
                  (max: number, record: AngerRecord) =>
                    Math.max(max, record._max.level),
                  0
                );
              labels.push(`${hour}:00`);
              dataPoints.push(maxLevel);
            }
          } else if (filter.type === "monthly") {
            const daysInMonth = new Date(
              parseInt(filter.year),
              parseInt(filter.month),
              0
            ).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
              const maxLevel = data.aggregatedData
                .filter(
                  (record: AngerRecord) =>
                    DateTime.fromISO(record.occurredDate, {
                      zone: "Asia/Tokyo",
                    }).day === day
                )
                .reduce(
                  (max: number, record: AngerRecord) =>
                    Math.max(max, record._max.level),
                  0
                );
              labels.push(`${day}`);
              dataPoints.push(maxLevel);
            }
          }

          setLineChartData({
            labels,
            datasets: [
              {
                label: "怒りレベルの最大値",
                data: dataPoints,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          });
          const barLabels = data.categoryData.map(
            (cat: CategoryData) => cat.content
          );
          const barDataPoints = data.categoryData.map(
            (cat: CategoryData) => cat.level
          );
          const barColors = ["red", "blue", "yellow", "green", "purple"];
          while (barLabels.length < 5) {
            barLabels.push("");
            barDataPoints.push(0);
          }
          setBarChartData({
            labels: barLabels,
            datasets: [
              {
                label: "怒りレベル",
                data: barDataPoints,
                backgroundColor: barColors,
                borderColor: barColors,
                borderWidth: 1,
              },
            ],
          });
          toast.update(toastId, {
            render: "アンガーログを取得しました。",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            closeOnClick: true,
          });
        } else {
          toast.update(toastId, {
            render: "アンガーログが登録されていません。",
            type: "info",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。";
        toast.update(toastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      } finally {
        if (toastId && toast.isActive(toastId)) {
          toast.dismiss(toastId);
        }
      }
    };

    fetchChartLogs();
  }, [filter]);
  return (
    <Box>
      <Typography variant="h6" component="div">
        平均: 怒りレベル {averageLevel.toFixed(2)}{" "}
        <AngerLogIcon level={parseInt(averageLevel.toFixed(0))} />
      </Typography>
      <Line data={lineChartData} />
      <Typography component="div" sx={{ mt: 2 }}>
        {topCategories.map((cat, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" component="div">
              {index + 1}位: {cat.content} 怒りレベル {cat.level}{" "}
              <AngerLogIcon level={cat.level} />
            </Typography>
          </Box>
        ))}
      </Typography>

      <Bar data={barChartData} />
    </Box>
  );
};

export default AngerChart;
