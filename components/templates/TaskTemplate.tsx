import { Container } from "@mui/material";
import TaskForm from "../molecules/TaskForm";
import Header from "../organisms/Header";

type TaskTemplateProps = {
  mode: "new" | "edit";
  taskId?: number;
  initialCategories: string[];
  initialData?: {
    category: string;
    content: string;
  };
};

/**
 * 作業内容テンプレート
 * @param param mode:new | edit taskId:作業内容ID initialCategories:カテゴリ一覧 initialData:初期データ
 * @returns 作業内容テンプレート
 */
const TaskTemplate = ({
  mode,
  taskId,
  initialCategories,
  initialData,
}: TaskTemplateProps) => {
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
