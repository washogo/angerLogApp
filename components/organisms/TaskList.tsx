import React from "react";
import TaskListItem from "./TaskListItem";
import { Box, Button } from "@mui/material";

const tasks = [
  { category: "仕事", content: "電話対応" },
  { category: "仕事", content: "通勤" },
  { category: "趣味", content: "ランニング" },
];

const TaskList: React.FC = () => (
  <Box>
    <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
      <Button variant="contained" color="success" href="/tasks/new">
        新規登録
      </Button>
    </Box>
    {tasks.map((task, index) => (
      <TaskListItem
        key={index}
        category={task.category}
        content={task.content}
      />
    ))}
  </Box>
);

export default TaskList;
