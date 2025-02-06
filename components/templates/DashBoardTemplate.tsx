"use client";

import AngerLogList from "@/components/organisms/AngerLogList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AngerChart from "@/components/organisms/AngerLogChart";
import DataSelector from "@/components/molecules/DataSelector";
import Header from "@/components/organisms/Header";
import { useState } from "react";

type Filter = {
  type: "daily" | "monthly";
  year: string;
  month: string;
  day?: string;
};
const today = new Date();

/**
 * ダッシュボードテンプレート
 * @param param ベースURL
 * @returns ダッシュボードテンプレート
 */
const DashboardTemplate = ({ apiBase }: { apiBase: string }) => {
  const [filter, setFilter] = useState<Filter>({
    type: "monthly",
    year: today.getFullYear().toString(),
    month: (today.getMonth() + 1).toString().padStart(2, "0"),
    day: today.getDate().toString().padStart(2, "0"),
  });

  return (
    <>
      <Box>
        <Header title="アンガーログアプリ" />
        <Container>
          <Box sx={{ my: 2 }}>
            <DataSelector filter={filter} onFilter={setFilter} />
          </Box>
          <AngerChart filter={filter} apiBase={apiBase} />
          <Box sx={{ mt: 4 }}>
            <AngerLogList filter={filter} apiBase={apiBase} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DashboardTemplate;
