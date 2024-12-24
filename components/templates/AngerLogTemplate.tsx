import { Container } from "@mui/material";
import AngerLogForm from "../molecules/AngerLogForm";
import Header from "../organisms/Header";

const AngerLogTemplate: React.FC<{ mode: "new" | "edit" }> = ({ mode }) => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    {mode === "new" ? (
      <Header title="アンガーログ登録" />
    ) : (
      <Header title="アンガーログ編集" />
    )}
    <AngerLogForm mode={mode} />
  </Container>
);

export default AngerLogTemplate;
