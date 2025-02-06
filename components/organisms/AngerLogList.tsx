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
/**
 * アンガーログリスト
 * @param param  対象のデータ　ベースURL
 * @returns アンガーログリスト
 */
const AngerLogList: React.FC<AngerLogListProps> = ({ filter, apiBase }) => {
  const [logs, setLogs] = useState<AngerLog[]>([]);

  useEffect(() => {
    const fetchFilteredLogs = async () => {
      try {
        const params = new URLSearchParams(filter).toString();
        // アンガーログ取得
        const response = await fetch(`${apiBase}/api/angerlog?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anger logs");
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。";
        toast.error(errorMessage);
        console.log(error);
      }
    };

    fetchFilteredLogs();
  }, [filter]);

  return (
    <Box>
      {logs.length === 0 ? (
        <Box></Box>
      ) : (
        <Typography variant="h6">アンガーログ一覧</Typography>
      )}
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
