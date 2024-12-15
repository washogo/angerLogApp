import React from "react";
import { Container } from "@mui/material";
import AngerLogForm from "@/components/molecules/AngerLogForm";
import Header from "@/components/organisms/Header";

const NewAngerLogPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Header title="アンガーログ登録" />
    <AngerLogForm mode="new" />
  </Container>
);

export default NewAngerLogPage;
