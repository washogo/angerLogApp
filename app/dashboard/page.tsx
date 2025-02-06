import getApiBase from "@/utils/apibase";
import DashboardTemplate from "@/components/templates/DashBoardTemplate";

/**
 * ダッシュボードページ
 * @returns ダッシュボードページ
 */
const DashboardPage = async () => {
  const apiBase = await getApiBase();
  return (
    <>
      <DashboardTemplate apiBase={apiBase} />
    </>
  );
};

export default DashboardPage;
