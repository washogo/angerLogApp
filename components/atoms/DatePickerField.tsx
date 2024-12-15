"use client";
import React from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

type DatePickerFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <FormControl fullWidth margin="normal">
    {/* 外部ラベル */}
    <FormLabel>{label}</FormLabel>
    {/* 入力フィールド */}
    <TextField
      type="date"
      value={value}
      onChange={onChange}
      name={name}
      fullWidth
      margin="normal"
    />
  </FormControl>
);

export default DatePickerField;
