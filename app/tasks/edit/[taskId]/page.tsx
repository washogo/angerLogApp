import TaskTempalte from "@/components/templates/TaskTemplate";

type PageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

const TaskEditPage = async ({ params }: PageProps) => {
  const taskId = parseInt((await params).taskId);
  return <TaskTempalte mode="edit" taskId={taskId} />;
};

export default TaskEditPage;
