"use client";

import AngerLogList from "@/components/organisms/AngerLogList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AngerChart from "@/components/organisms/AngerLogChart";
import DataSelector from "@/components/molecules/DataSelector";
import Header from "@/components/organisms/Header";

const DashboardPage = () => {
  return (
    <>
      <Box>
        <Header title="アンガーログアプリ" />
        <Container>
          <Box sx={{ my: 2 }}>
            <DataSelector />
          </Box>
          <AngerChart />
          <Box sx={{ mt: 4 }}>
            <AngerLogList />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;
