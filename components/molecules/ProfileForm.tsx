"use client";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type UserProfile = {
  name: string;
  email: string;
  goal: string;
};

const ProfileForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    goal: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        if (data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            goal: data.goal || "",
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。";
        toast.error(errorMessage);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("処理中・・・・。");
    try {
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          goal: formData.goal,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch user");
      }
      toast.update(toastId, {
        render: "プロフィールを更新しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      router.push(`/dashboard`);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました。";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="名前"
          placeholder="やまだ たろう"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          label="メールアドレス"
          placeholder="sample@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="goal"
          type="text"
          label="目標"
          placeholder="自分の感情を理解し、コントロールできるようになる"
          multiline
          rows={3}
          value={formData.goal}
          onChange={handleChange}
        />
        <Button type="submit" color="primary">
          保存
        </Button>
      </Box>
    </>
  );
};

export default ProfileForm;
