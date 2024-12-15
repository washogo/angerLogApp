import React from "react";
import { Container } from "@mui/material";
import TaskForm from "@/components/molecules/TaskForm";
import Header from "../organisms/Header";

const TaskNewPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Header title="作業内容登録" />
    <TaskForm mode="new" />
  </Container>
);

export default TaskNewPage;
