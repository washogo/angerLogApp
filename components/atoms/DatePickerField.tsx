"use client";
import React from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

type DatePickerFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
/**
 * 日付入力フィールド
 * @param param0 ラベル　名前　値　変更時の処理
 * @returns 日次入力
 */
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
