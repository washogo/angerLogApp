import {
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type InputProps = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
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
  error = false,
  helperText = "",
  showPassword = false,
  onTogglePassword,
}) => (
  <FormControl fullWidth margin="normal">
    <FormLabel>{label}</FormLabel>
    <TextField
      name={name}
      type={type === "password" && showPassword ? "text" : type}
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      rows={rows}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={onTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  </FormControl>
);

export default Input;
