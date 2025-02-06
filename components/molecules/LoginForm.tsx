"use client";
import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { Box } from "@mui/material";

type LoginFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
/**
 * ログインフォーム
 * @param param ログイン時の処理
 * @returns ログインフォーム
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーションチェック
    const newErrors = {
      email: !email,
      password: !password,
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      onSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Input
        name="email"
        type="email"
        label="メールアドレス"
        placeholder="sample@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helperText={errors.email ? "メールアドレスは必須です" : ""}
      />
      <Input
        name="password"
        type="password"
        label="パスワード"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        helperText={errors.password ? "パスワードは必須です" : ""}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
      <Button type="submit" color="primary">
        ログイン
      </Button>
    </Box>
  );
};

export default LoginForm;
