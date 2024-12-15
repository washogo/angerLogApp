"use client";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("サインアップ成功");
    router.push(`/dashboard`);
    router.refresh();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Input name="name" type="text" label="名前" placeholder="やまだ たろう" />
      <Input
        name="email"
        type="email"
        label="メールアドレス"
        placeholder="sample@gmail.com"
      />
      <Input
        name="password"
        type="password"
        label="パスワード"
        placeholder="password"
      />
      <Button type="submit" color="inherit">
        サインアップ
      </Button>
    </Box>
  );
};

export default SignupForm;
