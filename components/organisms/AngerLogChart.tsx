"use client";

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
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

const lineData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Red",
      data: [5, 8, 4, 6, 7, 8, 9],
      borderColor: "red",
      fill: false,
    },
    {
      label: "Green",
      data: [3, 6, 7, 5, 4, 6, 8],
      borderColor: "green",
      fill: false,
    },
    {
      label: "Blue",
      data: [6, 7, 8, 5, 6, 4, 7],
      borderColor: "blue",
      fill: false,
    },
  ],
};

const barData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Levels",
      data: [10, 20, 5, 15, 3, 12],
      backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"],
    },
  ],
};

const AngerChart: React.FC = () => (
  <Box>
    <Typography variant="h6">平均: 😌 (5.6 レベル)</Typography>
    <Line data={lineData} />
    <Typography sx={{ mt: 2 }}>
      1位: 接客 (8レベル) 2位: 電話 (7レベル)
    </Typography>
    <Bar data={barData} />
  </Box>
);

export default AngerChart;
