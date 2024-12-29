"use client";

import { Container } from "@mui/material";
import TaskForm from "../molecules/TaskForm";
import Header from "../organisms/Header";
import { selectUserTaskAll, selectTaskDetail } from "@/api/task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

type TaskTemplateProps = {
  mode: "new" | "edit";
  taskId?: number;
};

type WorkContent = {
  id: number;
  category: string;
  content: string;
};

const TaskTemplate = ({ mode, taskId }: TaskTemplateProps) => {
  const [initialCategories, setInitialCategories] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<WorkContent | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const toastId = toast.loading("処理中・・・・。");
      try {
        const tasks = await selectUserTaskAll();
        setInitialCategories(
          Array.from(
            new Set(tasks?.map((task: WorkContent) => task.category) || [])
          )
        );

        if (mode === "edit" && taskId) {
          const taskDetail = await selectTaskDetail(taskId);
          setInitialData(taskDetail ? taskDetail[0] : undefined);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。";
        toast.update(toastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      } finally {
        toast.dismiss(toastId);
      }
    };
    fetchInitialData();
  }, [mode, taskId]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ToastContainer position="top-center" />
      {mode === "new" ? (
        <Header title="作業内容登録" />
      ) : (
        <Header title="作業内容編集" />
      )}
      <TaskForm
        mode={mode}
        taskId={taskId}
        initialCategories={initialCategories}
        initialData={initialData}
      />
    </Container>
  );
};

export default TaskTemplate;
