import Loading from "@/app/loading";
import TaskTempalte from "@/components/templates/TaskTemplate";
import getApiBase from "@/utils/apibase";
import { Box } from "@mui/material";

type PageProps = {
  params: Promise<{
    taskId: string;
  }>;
};
type WorkContent = {
  id: number;
  category: string;
  content: string;
};
/**
 * 作業内容一意リストデータを取得するAPI
 * @returns 作業内容データからカテゴリを一意にしたデータ
 */
export const fetchInitialCategories = async () => {
  const res = await import("../../../api/task/route");
  const tasks = await (await res.GET()).json();
  // カテゴリを一意にする
  const initialCategories: string[] = Array.from(
    new Set(tasks?.map((task: WorkContent) => task.category) || [])
  );
  return initialCategories;
};
/**
 * 作業内容詳細データを取得するAPI
 * @param taskId 作業内容ID
 * @returns 作業内容詳細データ
 */
const fetchTaskDetail = async (taskId: number) => {
  const apiBase = await getApiBase();
  const response = await fetch(`${apiBase}/api/task/detail?taskId=${taskId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  const taskDetail = await response.json();
  const initialData = taskDetail ? taskDetail : undefined;
  return initialData;
};
/**
 * 作業内容編集ページ
 * @param param0 作業内容ID
 * @returns 作業内容編集ページ
 */
const TaskEditPage = async ({ params }: PageProps) => {
  const taskId = parseInt((await params).taskId);
  let initialCategories: string[] | undefined;
  let initialData: WorkContent | undefined;
  try {
    // カテゴリデータ取得
    initialCategories = await fetchInitialCategories();
    // 作業内容データ取得
    initialData = await fetchTaskDetail(taskId);
  } catch (error) {
    console.error(error);
  }
  // ローディング判定
  if (!initialData || !initialCategories) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
  return (
    <TaskTempalte
      mode="edit"
      taskId={taskId}
      initialCategories={initialCategories}
      initialData={initialData}
    />
  );
};

export default TaskEditPage;
