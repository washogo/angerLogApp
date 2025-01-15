import getApiBase from "@/utils/apibase";
import DashboardTemplate from "@/components/templates/DashBoardTemplate";

const DashboardPage = async () => {
  const apiBase = await getApiBase();
  return (
    <>
      <DashboardTemplate apiBase={apiBase} />
    </>
  );
};

export default DashboardPage;
