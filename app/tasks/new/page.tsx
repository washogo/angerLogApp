import TaskTempalte from "@/components/templates/TaskTemplate";
import Loading from "@/app/loading";
import { fetchInitialCategories } from "../edit/[taskId]/page";
import { Box } from "@mui/material";

/**
 * 作業内容新規登録ページ
 * @returns 作業内容新規登録ページ
 */
const TaskNewPage = async () => {
  let initialCategories: string[] | undefined;
  try {
    // カテゴリデータ取得
    initialCategories = await fetchInitialCategories();
  } catch (error) {
    console.error(error);
  }
  // ローディング判定
  if (!initialCategories) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
  return <TaskTempalte mode="new" initialCategories={initialCategories} />;
};
export const dynamic = "force-dynamic";
export default TaskNewPage;
