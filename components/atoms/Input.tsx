import { FormControl, FormLabel, TextField } from "@mui/material";
type InputProps = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  placeholder,
  multiline = false,
  rows,
  value,
  onChange,
}) => (
  <FormControl fullWidth margin="normal">
    {/* 外部ラベル */}
    <FormLabel>{label}</FormLabel>
    {/* 入力フィールド */}
    <TextField
      name={name}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      rows={rows}
    />
  </FormControl>
);

export default Input;
