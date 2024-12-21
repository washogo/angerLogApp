"use client";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SignupForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: !name,
      email: !email,
      password: !password,
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      onSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Input
        name="name"
        type="text"
        label="名前"
        placeholder="やまだ たろう"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        helperText={errors.name ? "名前は必須です" : ""}
      />
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
        サインアップ
      </Button>
    </Box>
  );
};

export default SignupForm;
