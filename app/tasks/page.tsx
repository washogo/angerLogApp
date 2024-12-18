import React from "react";
import { Container } from "@mui/material";
import TaskList from "@/components/organisms/TaskList";
import Header from "@/components/organisms/Header";

const TaskListPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Header title="作業内容一覧" />
    <TaskList />
  </Container>
);

export default TaskListPage;
