"use client";

import Loading from "@/app/loading";
import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
import getApiBase from "@/utils/apibase";
import { Box } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const fetcheTaskData = async () => {
  const response = await fetch(`/api/task`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  const fetchedTasks: WorkContent[] = await response.json();
  return fetchedTasks;
};
const fetchAngerLogData = async (angerId: number, baseUrl: string) => {
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
const fetchApiBase = async (): Promise<string> => {
  const res = await fetch("/api/apibase");
  const data = await res.json();
  return data.baseUrl;
};
const AngerLogEditPage = async ({ params }: PageProps) => {
  const angerId = parseInt((await params).angerId);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const apiBase = await fetchApiBase();
        const initTasksData = await fetcheTaskData();
        const initAngerLogsData = await fetchAngerLogData(angerId, apiBase);
        return (
          <AngerLogTemplate
            mode="edit"
            angerId={angerId}
            initTasksData={initTasksData}
            initAngerLogsData={initAngerLogsData}
          />
        );
      } catch (error) {
        toast.error("取得中にエラーが発生しました");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [angerId]);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <Loading />
      </Box>
    );
  }
};

export default AngerLogEditPage;
