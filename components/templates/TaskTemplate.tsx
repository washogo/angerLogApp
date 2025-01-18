"use client";

import { Box, Container } from "@mui/material";
import TaskForm from "../molecules/TaskForm";
import Header from "../organisms/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
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
        const tasks = await response.json();
        setInitialCategories(
          Array.from(
            new Set(tasks?.map((task: WorkContent) => task.category) || [])
          )
        );

        if (mode === "edit" && taskId) {
          const response = await fetch(`/api/task/detail?taskId=${taskId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch task");
          }
          const taskDetail = await response.json();
          setInitialData(taskDetail ? taskDetail : undefined);
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
    fetchInitialData();
  }, [mode, taskId]);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
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
