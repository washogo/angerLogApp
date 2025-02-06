"use client";

import React, { useEffect, useState } from "react";
import Input from "../atoms/Input";
import SelectField from "../atoms/SelectField";
import Button from "../atoms/Button";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TaskFormProps = {
  mode: "new" | "edit";
  taskId?: number;
  initialCategories: string[];
  initialData?: {
    category: string;
    content: string;
  };
};
/**
 * 作業内容フォーム
 * @param param mode: new | edit taskId: 作業ID initialCategories: カテゴリ一覧 initialData: 作業内容データ
 * @returns 作業内容フォーム
 */
const TaskForm: React.FC<TaskFormProps> = ({
  mode,
  taskId,
  initialCategories,
  initialData,
}) => {
  const isEdit = mode === "edit";
  const router = useRouter();
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");

  useEffect(() => {
    setCategory(initialData?.category || "");
    setContent(initialData?.content || "");
  }, [initialData]);

  // フォーム送信時の処理
  const handleSubmit = async () => {
    const toastId = toast.loading("処理中・・・・。");
    try {
      // 既存カテゴリとの重複チェック
      const response = await fetch(`/api/task/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          content,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }
      const exists = await response.json();

      if (exists && exists.length > 0) {
        toast.update(toastId, {
          render: "新規カテゴリが既存カテゴリと重複しています",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
        return;
      }
      // 作業内容登録
      const createRes = await fetch(`/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          content,
        }),
      });

      if (!createRes.ok) {
        console.log(createRes);
        throw new Error("Failed to fetch task");
      }
      toast.update(toastId, {
        render: "作業内容を登録しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      // 作業内容一覧に遷移
      router.push(`/tasks`);
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
  // 更新処理
  const handleUpdate = async () => {
    const toastId = toast.loading("処理中・・・・。");
    try {
      // 作業内容更新
      const response = await fetch(`/api/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskId,
          category,
          content,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch task");
      }
      toast.update(toastId, {
        render: "作業内容を更新しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      // 作業内容一覧に遷移
      router.push(`/tasks`);
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
  // 削除処理
  const handleDelete = async () => {
    const toastId = toast.loading("処理中・・・・。");
    try {
      // 作業内容削除
      const response = await fetch(`/api/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskId,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch task");
      }

      toast.update(toastId, {
        render: "作業内容を削除しました",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      // 作業内容一覧に遷移
      router.push(`/tasks`);
      router.refresh();
    } catch (error) {
      toast.update(toastId, {
        render: "削除中にエラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Input
        type="text"
        label="新規カテゴリ"
        name="newCategory"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="新規カテゴリを入力"
      />
      <SelectField
        label="既存カテゴリ"
        name="existingCategory"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={initialCategories.map((cat) => ({
          value: cat,
          label: cat,
          key: cat,
        }))}
      />
      <Input
        type="text"
        label="作業内容"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="作業内容を入力"
      />
      {!isEdit ? (
        <Button type="button" color="success" onClick={handleSubmit}>
          登録
        </Button>
      ) : (
        <>
          <Button type="button" color="primary" onClick={handleUpdate}>
            更新
          </Button>
          <Button type="button" color="error" onClick={handleDelete}>
            削除
          </Button>
        </>
      )}
    </Box>
  );
};

export default TaskForm;
