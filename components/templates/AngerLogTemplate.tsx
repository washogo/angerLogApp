import { Container } from "@mui/material";
import AngerLogForm from "../molecules/AngerLogForm";
import Header from "../organisms/Header";

type AngerLogTemplateProps = {
  mode: "new" | "edit";
  angerId?: number;
  baseUrl?: string;
};

const AngerLogTemplate = ({
  mode,
  angerId,
  baseUrl,
}: AngerLogTemplateProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {mode === "new" ? (
        <Header title="アンガーログ登録" />
      ) : (
        <Header title="アンガーログ編集" />
      )}
      <AngerLogForm mode={mode} angerId={angerId} baseUrl={baseUrl} />
    </Container>
  );
};

export default AngerLogTemplate;
