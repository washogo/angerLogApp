"use client";

import LoginForm from "../molecules/LoginForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";

/**
 * ログインカード
 */
const LoginCard: React.FC = () => {
  const router = useRouter();
  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with", email, password);
    router.push(`/dashboard`);
    router.refresh();
  };

  return (
    <Box
      sx={{
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 400,
        mx: "auto",
        minHeight: "50vh",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        アンガーログアプリ
      </Typography>
      <hr></hr>
      <LoginForm onSubmit={handleLogin} />
      <Link
        href="/auth/signup"
        variant="body2"
        sx={{ mt: 2, display: "block", textAlign: "center" }}
      >
        サインアップ
      </Link>
    </Box>
  );
};

export default LoginCard;
