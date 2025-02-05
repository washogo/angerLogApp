import Loading from "@/app/loading";
import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTaskData } from "../edit/[angerId]/page";

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
    toast.error("データの取得に失敗しました" + (error as Error).message);
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
