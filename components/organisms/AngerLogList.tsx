"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

const logs = [
  {
    level: 7,
    type: "仕事 接客",
    time: "2024/12/03 14:00",
    situation: "クレームを言われる",
    feeling: "自分のせいじゃないのに悔しい",
  },
  {
    level: 7,
    type: "仕事 接客",
    time: "2024/12/03 14:00",
    situation: "クレームを言われる",
    feeling: "自分のせいじゃないのに悔しい",
  },
];

const AngerLogList: React.FC = () => (
  <Box>
    <Typography variant="h6">アンガーログ一覧</Typography>
    {logs.map((log, idx) => (
      <Link key={idx} href={"/angerLog/edit"}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1">
              怒りレベル: {log.level} 😡
            </Typography>
            <Typography variant="body1">{log.type}</Typography>
            <Typography variant="body2" color="text.secondary">
              {log.time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              状況: {log.situation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              気持ち:{" "}
              {log.feeling.length < 13
                ? log.feeling
                : log.feeling.substring(0, 13).concat("...")}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    ))}
  </Box>
);

export default AngerLogList;
