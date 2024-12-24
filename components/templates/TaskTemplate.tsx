import { Container } from "@mui/material";
import TaskForm from "../molecules/TaskForm";
import Header from "../organisms/Header";
import { selectUserTaskAll, selectTaskDetail } from "@/api/task";

type TaskTemplateProps = {
  mode: "new" | "edit";
  taskId?: number;
};

type WorkContent = {
  id: number;
  category: string;
  content: string;
};

const TaskTemplate = async ({ mode, taskId }: TaskTemplateProps) => {
  const { data: tasks } = await selectUserTaskAll();
  const initialCategories = Array.from(
    new Set(tasks?.map((task: WorkContent) => task.category) || [])
  );
  let initialData = undefined;
  if (mode === "edit" && taskId) {
    const { data: taskDetail } = await selectTaskDetail(taskId);
    initialData = taskDetail ? taskDetail[0] : undefined;
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
