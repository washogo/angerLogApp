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

const AngerLogNewPage = async () => {
  let initTasksData: WorkContent[] | undefined;

  try {
    initTasksData = await fetchTaskData();
  } catch (error) {
    console.error(error);
  }

  if (!initTasksData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }

  return <AngerLogTemplate mode="new" initTasksData={initTasksData} />;
};

export default AngerLogNewPage;
