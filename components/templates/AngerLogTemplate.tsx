import { Container } from "@mui/material";
import AngerLogForm from "../molecules/AngerLogForm";
import Header from "../organisms/Header";

type AngerLogTemplateProps = {
  mode: "new" | "edit";
  angerId?: number;
  initTasksData?:
    | {
        id: number;
        userId: string;
        content: string;
        category: string;
      }[]
    | null;
  initAngerLogsData?: {
    level: number;
    workTypeId: number;
    date: string;
    time: string;
    situation: string;
    feeling: string;
  } | null;
};

const AngerLogTemplate = ({
  mode,
  angerId,
  initTasksData,
  initAngerLogsData,
}: AngerLogTemplateProps) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {mode === "new" ? (
        <Header title="アンガーログ登録" />
      ) : (
        <Header title="アンガーログ編集" />
      )}
      <AngerLogForm
        mode={mode}
        angerId={angerId}
        initTasksData={initTasksData}
        initAngerLogsData={initAngerLogsData}
      />
    </Container>
  );
};

export default AngerLogTemplate;
