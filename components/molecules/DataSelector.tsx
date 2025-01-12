"use client";

import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Filter = {
  type: "daily" | "monthly";
  year: string;
  month: string;
  day?: string;
};

type DataSelectorProps = {
  filter: Filter;
  onFilter: (filter: Filter) => void;
};

const DataSelector: React.FC<DataSelectorProps> = ({ filter, onFilter }) => {
  const [viewType, setViewType] = useState<"daily" | "monthly">(filter.type);
  const [year, setYear] = useState(filter.year);
  const [month, setMonth] = useState(filter.month);
  const [day, setDay] = useState(filter.day);
  const [error, setError] = useState<string | null>(null);

  const isValidDate = (y: string, m: string, d?: string) => {
    if (!d) return true;
    const date = new Date(`${y}-${m}-${d}`);
    return (
      date.getFullYear().toString() === y &&
      (date.getMonth() + 1).toString().padStart(2, "0") === m &&
      date.getDate().toString().padStart(2, "0") === d
    );
  };

  const handleFilter = () => {
    if (!isValidDate(year, month, day)) {
      setError("無効な日付が選択されています。");
      return;
    }
    setError(null);

    const filter = {
      type: viewType,
      year,
      month,
      ...(viewType === "daily" && { day }),
    };
    onFilter(filter);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          onClick={() =>
            setViewType(viewType === "daily" ? "monthly" : "daily")
          }
          color="inherit"
          sx={{ bgcolor: "black", color: "white" }}
        >
          {viewType === "daily" ? "日次" : "月次"}
        </Button>
        <FormControl>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            size="small"
          >
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            size="small"
          >
            {[...Array(12)].map((_, idx) => (
              <MenuItem key={idx} value={(idx + 1).toString().padStart(2, "0")}>
                {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {viewType === "daily" && (
          <FormControl>
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              size="small"
            >
              {[...Array(31)].map((_, idx) => (
                <MenuItem
                  key={idx}
                  value={(idx + 1).toString().padStart(2, "0")}
                >
                  {idx + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant="contained" color="success" onClick={handleFilter}>
          表示
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default DataSelector;
