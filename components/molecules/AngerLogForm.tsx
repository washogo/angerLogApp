"use client";

import React, { useState, useEffect } from "react";
import InputField from "../atoms/Input";
import SelectField from "../atoms/SelectField";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuth } from "@/api/auth";
import { DateTime } from "luxon";
import Loading from "@/app/loading";

export type AngerLog = {
  id?: number;
  level: number;
  workTypeId: number;
  date: string;
  time: string;
  situation: string;
  feeling: string;
};

type WorkContent = {
  id: number;
  userId: string;
  content: string;
  category: string;
};

type AngerLogFormProps = {
  mode: "new" | "edit";
  angerId?: number;
  baseUrl?: string;
};

const AngerLogForm = ({ mode, angerId, baseUrl }: AngerLogFormProps) => {
  const isEdit = mode === "edit";
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<WorkContent[]>([]);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [contents, setContents] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState<AngerLog>({
    level: 5,
    workTypeId: 0,
    date: "",
    time: "",
    situation: "",
    feeling: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/task`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const fetchedTasks: WorkContent[] = await response.json();

        setTasks(fetchedTasks);

        const uniqueCategories = Array.from(
          new Set(fetchedTasks.map((task: WorkContent) => task.category))
        ).map((category: string) => ({ value: category, label: category }));

        setCategories(uniqueCategories);

        const initialCategory = uniqueCategories[0]?.value || "";
        setSelectedCategory(initialCategory);

        const initialContents = fetchedTasks
          .filter((task: WorkContent) => task.category === initialCategory)
          .map((task: WorkContent) => ({
            value: task.id.toString(),
            label: task.content,
          }));

        setContents(initialContents);
      } catch (error) {
        toast.error("取得中にエラーが発生しました");
        console.log(error);
      }
      if (mode === "edit" && angerId) {
        try {
          const response = await fetch(
            `${baseUrl}/api/angerlog/detail?angerId=${angerId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.log(response);
            throw new Error("データ取得に失敗しました");
          }
          const data = await response.json();
          const occurredDate = DateTime.fromISO(data.occurredDate, {
            zone: "Asia/Tokyo",
          });

          setFormData({
            level: data.level,
            workTypeId: data.workTypeId,
            date: occurredDate.toFormat("yyyy-MM-dd"),
            time: occurredDate.toFormat("HH:mm"),
            situation: data.situation || "",
            feeling: data.feeling || "",
          });
          const task = tasks.find((task) => task.id === data.workTypeId);
          if (task) {
            setSelectedCategory(task.category);
            handleCategoryChange(task.category);
          }
        } catch (error) {
          toast.error("取得中にエラーが発生しました");
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const filteredContents = tasks
      .filter((task) => task.category === value)
      .map((task) => ({ value: task.id.toString(), label: task.content }));
    setContents(filteredContents);
  };

  const handleChange =
    (key: keyof AngerLog) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };

  const validateForm = () => {
    if (!formData.level) return "怒りレベルを選択してください。";
    if (!selectedCategory) return "カテゴリを選択してください。";
    if (!formData.workTypeId) return "コンテンツを選択してください。";
    if (!formData.date) return "日付を入力してください。";
    if (!formData.time) return "時間を入力してください。";
    if (!formData.situation) return "状況を入力してください。";
    if (!formData.feeling) return "気持ちを入力してください。";
    return null;
  };

  const handleInsert = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    const toastId = toast.loading("処理中・・・・。");

    try {
      const user = await checkAuth();
      const response = await fetch(`/api/angerlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          level: formData.level,
          workTypeId: formData.workTypeId,
          occurredDate: `${formData.date}T${formData.time}`,
          situation: formData.situation,
          feeling: formData.feeling,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("登録に失敗しました");
      }
      toast.update(toastId, {
        render: "アンガーログを登録しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      router.push(`/dashboard`);
      router.refresh();
    } catch (error) {
      toast.update(toastId, {
        render: "登録中にエラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (mode === "edit" && angerId) {
      handleUpdate();
    } else {
      handleInsert();
    }
  };

  const handleUpdate = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    const toastId = toast.loading("処理中・・・・。");

    try {
      if (!angerId) throw new Error("IDが存在しません。");
      const response = await fetch(`/api/angerlog`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: angerId,
          level: formData.level,
          workTypeId: formData.workTypeId,
          occurredDate: `${formData.date}T${formData.time}`,
          situation: formData.situation,
          feeling: formData.feeling,
        }),
      });

      if (!response.ok) {
        throw new Error("更新に失敗しました");
      }

      toast.update(toastId, {
        render: "アンガーログを更新しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      router.push(`/dashboard`);
      router.refresh();
    } catch (error) {
      toast.update(toastId, {
        render: "更新中にエラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      console.log(error);
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
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SelectField
        label="怒りレベル（レベル10人生最大）"
        name="angerLevel"
        value={formData.level.toString()}
        onChange={(e) =>
          setFormData({ ...formData, level: parseInt(e.target.value) })
        }
        options={[
          { value: "1", label: "😞 レベル1" },
          { value: "2", label: "😖 レベル2" },
          { value: "3", label: "😩 レベル3" },
          { value: "4", label: "😭 レベル4" },
          { value: "5", label: "😤 レベル5" },
          { value: "6", label: "😡 レベル6" },
          { value: "7", label: "🤬 レベル7" },
          { value: "8", label: "👿 レベル8" },
          { value: "9", label: "😱 レベル9" },
          { value: "10", label: "💀 レベル10" },
        ]}
      />
      <SelectField
        label="カテゴリ"
        name="category"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        options={categories}
      />
      <SelectField
        label="コンテンツ"
        name="content"
        value={formData.workTypeId.toString()}
        onChange={(e) =>
          setFormData({ ...formData, workTypeId: parseInt(e.target.value) })
        }
        options={contents}
      />

      <InputField
        type="date"
        label="いつ？"
        name="date"
        value={formData.date}
        onChange={handleChange("date")}
      />
      <InputField
        type="time"
        label="何時くらい？"
        name="time"
        value={formData.time}
        onChange={handleChange("time")}
      />
      <InputField
        type="text"
        label="どんな状況？"
        name="situation"
        value={formData.situation}
        onChange={handleChange("situation")}
      />
      <InputField
        type="text"
        label="どんな気持ちになった？"
        name="feeling"
        value={formData.feeling}
        onChange={handleChange("feeling")}
      />
      {!isEdit ? (
        <Button variant="contained" color="success" onClick={handleSubmit}>
          登録
        </Button>
      ) : (
        <Button variant="contained" color="success" onClick={handleUpdate}>
          更新
        </Button>
      )}
    </Box>
  );
};

export default AngerLogForm;
