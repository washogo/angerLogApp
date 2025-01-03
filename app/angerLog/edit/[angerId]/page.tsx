import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
import getApiBase from "@/utils/apibase";
type PageProps = {
  params: Promise<{
    angerId: string;
  }>;
};
const AngerLogEditPage = async ({ params }: PageProps) => {
  const apiBase = await getApiBase();
  const angerId = parseInt((await params).angerId);
  return <AngerLogTemplate mode="edit" angerId={angerId} baseUrl={apiBase} />;
};

export default AngerLogEditPage;
