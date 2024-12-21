"use client";

import LoginForm from "../molecules/LoginForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { login } from "@/api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

/**
 * ログインカード
 */
const LoginCard: React.FC = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading("処理中・・・・。");
    const formData = new FormData(e.currentTarget);
    let msg = "ログインに成功しました。";
    let errorFlg = false;
    try {
      await login(formData);
    } catch (error: any) {
      msg = error.message;
      errorFlg = true;
    }
    errorFlg
      ? toast.update(toastId, {
          render: msg,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        })
      : toast.update(toastId, {
          render: msg,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
    redirect("/dashboard");
  };

  return (
    <>
      <ToastContainer position="top-center" />
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
