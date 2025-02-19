"use client";

import LoginForm from "../molecules/LoginForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { login } from "@/api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

/**
 * ログインカード
 */
const LoginCard: React.FC = () => {
  // ログイン処理
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading("処理中・・・・。");
    const formData = new FormData(e.currentTarget);
    let msg = "ログインに成功しました。";
    let errorFlg = false;
    try {
      // ログイン処理
      await login(formData);
    } catch (error) {
      if (error instanceof Error) {
        msg = error.message;
      } else {
        msg = "予期しないエラーが発生しました。";
      }
      errorFlg = true;
    }
    if (errorFlg) {
      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      return;
    } else {
      toast.update(toastId, {
        render: msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    // ダッシュボードに遷移
    redirect("/dashboard");
  };

  return (
    <>
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
    </>
  );
};

export default LoginCard;
