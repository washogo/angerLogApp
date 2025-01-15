"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import AngerLogIcon from "../atoms/AngerLogIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AngerLog = {
  id: number;
  level: number;
  situation: string | null;
  feeling: string | null;
  occurredDate: string;
  workType: {
    content: string;
    category: string;
  };
};
type AngerLogListProps = {
  filter: {
    type: "daily" | "monthly";
    year: string;
    month: string;
    day?: string;
  };
  apiBase: string;
};
const AngerLogList: React.FC<AngerLogListProps> = ({ filter, apiBase }) => {
  const [logs, setLogs] = useState<AngerLog[]>([]);

  useEffect(() => {
    let toastId: string | number | undefined;

    const fetchFilteredLogs = async () => {
      toastId = toast.loading("リスト情報取得中・・・・。");
      try {
        const params = new URLSearchParams(filter).toString();
        const response = await fetch(`${apiBase}/api/angerlog?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anger logs");
        }
        const data = await response.json();
        setLogs(data);
        if (data?.length === 0) {
          toast.update(toastId, {
            render: "アンガーログが登録されていません。",
            type: "info",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
        } else {
          toast.update(toastId, {
            render: "アンガーログを取得しました。",
            type: "success",
            isLoading: false,
            autoClose: 1000,
            closeOnClick: true,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。";
        toast.update(toastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      } finally {
        if (toastId && toast.isActive(toastId)) {
          toast.dismiss(toastId);
        }
      }
    };

    fetchFilteredLogs();
  }, [filter]);

  return (
    <Box>
      <Typography variant="h6">アンガーログ一覧</Typography>
      {logs.map((log) => (
        <Link key={log.id} href={`/angerLog/edit/${log.id}`}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              怒りレベル:{log.level}
              <AngerLogIcon level={log.level} />
              <Typography variant="body1">
                {log.workType.category} {log.workType.content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(log.occurredDate).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                状況: {log.situation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                気持ち:{" "}
                {log.feeling
                  ? log.feeling.length < 13
                    ? log.feeling
                    : log.feeling.substring(0, 13).concat("...")
                  : "なし"}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default AngerLogList;
