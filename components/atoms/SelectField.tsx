"use client";

import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
};

/**
 * セレクトボックスコンポーネント
 * @param param ラベル　名前　値　変更時の処理　オプション
 * @returns セレクトボックス
 */
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth margin="normal">
    <FormLabel>{label}</FormLabel>
    <Select value={value} onChange={onChange} name={name} label="">
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
