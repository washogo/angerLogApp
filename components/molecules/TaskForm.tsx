"use client";
import React from "react";
import Input from "../atoms/Input";
import SelectField from "../atoms/SelectField";
import Button from "../atoms/Button";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

type TaskFormProps = {
  mode: "new" | "edit";
};

const TaskForm: React.FC<TaskFormProps> = ({ mode }) => {
  const isEdit = mode === "edit";
  const router = useRouter();

  const handleSubmit = () => {
    console.log("タスク登録成功");
    router.push(`/tasks`);
    router.refresh();
  };
  const handleUpdate = () => {
    console.log("タスク更新成功");
    router.push(`/tasks`);
    router.refresh();
  };
  const handleDelete = () => {
    console.log("タスク削除成功");
    router.push(`/tasks`);
    router.refresh();
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
        placeholder=""
      />
      <SelectField
        label="既存カテゴリ"
        name="existingCategory"
        value="仕事"
        onChange={() => {}}
        options={[
          { value: "仕事", label: "仕事" },
          { value: "趣味", label: "趣味" },
        ]}
      />
      <Input type="text" label="作業内容" name="content" placeholder="接客" />

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
