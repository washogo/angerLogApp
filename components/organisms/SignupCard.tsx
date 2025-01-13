"use client";

import SignupForm from "../molecules/SignupForm";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "@/api/auth";
import { redirect } from "next/navigation";

const SignupCard: React.FC = () => {
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading("処理中・・・・。");
    const formData = new FormData(e.currentTarget);
    let msg = "サインアップに成功しました。";
    let errorFlg = false;
    try {
      await signup(formData);
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
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
          サインアップ
        </Typography>
        <hr></hr>
        <SignupForm onSubmit={handleSignUp} />
        <Link
          href="/auth/login"
          sx={{ mt: 2, display: "block", textAlign: "center" }}
        >
          ログインへ戻る
        </Link>
      </Box>
    </>
  );
};

export default SignupCard;
