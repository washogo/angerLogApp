import { Container } from "@mui/material";
import AngerLogForm from "../molecules/AngerLogForm";
import Header from "../organisms/Header";

type AngerLogTemplateProps = {
  mode: "new" | "edit";
  angerId?: number;
};

const AngerLogTemplate = ({ mode, angerId }: AngerLogTemplateProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {mode === "new" ? (
        <Header title="アンガーログ登録" />
      ) : (
        <Header title="アンガーログ編集" />
      )}
      <AngerLogForm mode={mode} angerId={angerId} />
    </Container>
  );
};

export default AngerLogTemplate;
