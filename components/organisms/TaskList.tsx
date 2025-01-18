"use client";

import React, { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/app/loading";

type Task = {
  id: number;
  category: string;
  content: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        const data = await response.json();
        setTasks(data || []);
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
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }

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
