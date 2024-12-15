"use client";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const ProfileForm: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("プロフィール更新");
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
      <Input
        name="goal"
        type="text"
        label="目標"
        placeholder="自分の感情を理解し、コントロールできるようになる"
        multiline
        rows={3}
      />
      <Button type="submit" color="primary">
        保存
      </Button>
    </Box>
  );
};

export default ProfileForm;
