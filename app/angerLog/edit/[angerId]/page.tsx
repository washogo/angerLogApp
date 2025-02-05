import { fetchTaskData } from "@/app/api/utils/task";
import Loading from "@/app/loading";
import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
import getApiBase from "@/utils/apibase";
import { Box } from "@mui/material";
import { DateTime } from "luxon";

type PageProps = {
  params: Promise<{
    angerId: string;
  }>;
};
type WorkContent = {
  id: number;
  userId: string;
  content: string;
  category: string;
};
type AngerLogData = {
  level: number;
  workTypeId: number;
  date: string;
  time: string;
  situation: string;
  feeling: string;
};

const fetchAngerLogData = async (
  angerId: number,
  baseUrl: string
): Promise<AngerLogData> => {
  const response = await fetch(
    `${baseUrl}/api/angerlog/detail?angerId=${angerId}`
  );
  if (!response.ok) throw new Error("データ取得に失敗しました");

  const data = await response.json();
  const occurredDate = DateTime.fromISO(data.occurredDate, {
    zone: "Asia/Tokyo",
  });
  return {
    level: data.level,
    workTypeId: data.workTypeId,
    date: occurredDate.toFormat("yyyy-MM-dd"),
    time: occurredDate.toFormat("HH:mm"),
    situation: data.situation || "",
    feeling: data.feeling || "",
  };
};

const AngerLogEditPage = async ({ params }: PageProps) => {
  const angerId = parseInt((await params).angerId);

  let initTasksData: WorkContent[] | undefined;
  let initAngerLogsData: AngerLogData | undefined;
  try {
    const apiBase = await getApiBase();
    initTasksData = await fetchTaskData();
    initAngerLogsData = await fetchAngerLogData(angerId, apiBase);
  } catch (error) {
    console.error(error);
  }

  if (!initTasksData || !initAngerLogsData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
  return (
    <AngerLogTemplate
      mode="edit"
      angerId={angerId}
      initTasksData={initTasksData}
      initAngerLogsData={initAngerLogsData}
    />
  );
};

export default AngerLogEditPage;
