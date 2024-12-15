import { Container } from "@mui/material";
import AngerLogForm from "@/components/molecules/AngerLogForm";
import Header from "@/components/organisms/Header";

const EditAngerLogPage: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Header title="アンガーログ編集" />
    <AngerLogForm mode="edit" />
  </Container>
);

export default EditAngerLogPage;
