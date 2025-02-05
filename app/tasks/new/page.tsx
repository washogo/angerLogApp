import TaskTempalte from "@/components/templates/TaskTemplate";
import Loading from "@/app/loading";
import { fetchInitialCategories } from "../edit/[taskId]/page";
import { Box } from "@mui/material";

const TaskNewPage = async () => {
  let initialCategories: string[] | undefined;
  try {
    initialCategories = await fetchInitialCategories();
  } catch (error) {
    console.error(error);
  }
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
