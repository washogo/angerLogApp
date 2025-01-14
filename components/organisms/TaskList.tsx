"use client";

import React, { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Task = {
  id: number;
  category: string;
  content: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const toastId = toast.loading("処理中・・・・。");
      try {
        const response = await fetch(`/api/task`);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTasks(data || []);
        if (data?.length === 0) {
          toast.update(toastId, {
            render: "作業内容が登録されていません。",
            type: "info",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
        } else {
          toast.update(toastId, {
            render: "作業内容を取得しました。",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            closeOnClick: true,
          });
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
      }
    };
    fetchTasks();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button variant="contained" color="success" href="/tasks/new">
          新規登録
        </Button>
      </Box>
      {tasks.length === 0 ? (
        <Box>作業内容は登録されていません。</Box>
      ) : (
        tasks.map((task, index) => (
          <TaskListItem
            key={`${task.category}-${task.content}-${index}`}
            id={task.id}
            category={task.category}
            content={task.content}
          />
        ))
      )}
    </Box>
  );
};

export default TaskList;
