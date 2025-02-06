import Button from "@mui/material/Button";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "contained" | "outlined" | "text";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
/**
 * ボタンコンポーネント
 * @param param0 クリック時の処理　ボタンの種類　ボタンの色
 * @returns ボタン
 */
const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "contained",
  color,
}) => (
  <Button
    type={type}
    variant={variant}
    fullWidth
    onClick={onClick}
    color={color}
  >
    {children}
  </Button>
);

export default CustomButton;
