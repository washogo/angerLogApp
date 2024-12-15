import TextField from "../atoms/Input";
import Button from "../atoms/Button";
import Box from "@mui/material/Box";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

/**
 * ログインフォーム
 * @param param0
 * @returns
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit(email, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        name="email"
        type="email"
        label="メールアドレス"
        placeholder="sample@gmail.com"
      />
      <TextField
        name="password"
        type="password"
        label="パスワード"
        placeholder="password"
      />
      <Button type="submit" color="primary">
        ログイン
      </Button>
    </Box>
  );
};

export default LoginForm;
