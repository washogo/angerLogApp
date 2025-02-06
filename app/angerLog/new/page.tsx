import { fetchTaskData } from "@/app/api/utils/task";
import Loading from "@/app/loading";
import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
import { Box } from "@mui/material";

type WorkContent = {
  id: number;
  userId: string;
  content: string;
  category: string;
};

/**
 * アンガーログ新規作成ページ
 * @returns アンガーログ新規作成ページ
 */
const AngerLogNewPage = async () => {
  let initTasksData: WorkContent[] | undefined;

  try {
    // タスクデータ取得
    initTasksData = await fetchTaskData();
  } catch (error) {
    console.error(error);
  }

  // ローディング判定
  if (!initTasksData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }

  return <AngerLogTemplate mode="new" initTasksData={initTasksData} />;
};
export const dynamic = "force-dynamic";
export default AngerLogNewPage;
