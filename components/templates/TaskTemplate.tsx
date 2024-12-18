import { Container } from "@mui/material";
import TaskForm from "@/components/molecules/TaskForm";
import Header from "../organisms/Header";

const TaskTempalte: React.FC<{ mode: "new" | "edit" }> = ({ mode }) => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    {mode === "new" ? (
      <Header title="作業内容登録" />
    ) : (
      <Header title="作業内容編集" />
    )}
    <TaskForm mode={mode} />
  </Container>
);

export default TaskTempalte;
