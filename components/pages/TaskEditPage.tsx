import React from "react";
import { Container } from "@mui/material";
import TaskForm from "@/components/molecules/TaskForm";
import Header from "../organisms/Header";

const TaskEditPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Header title="作業内容編集" />
    <TaskForm mode="edit" />
  </Container>
);

export default TaskEditPage;
