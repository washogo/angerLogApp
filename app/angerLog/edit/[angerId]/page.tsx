import AngerLogTemplate from "@/components/templates/AngerLogTemplate";
type PageProps = {
  params: Promise<{
    angerId: string;
  }>;
};
const AngerLogEditPage = async ({ params }: PageProps) => {
  const angerId = parseInt((await params).angerId);
  return <AngerLogTemplate mode="edit" angerId={angerId} />;
};

export default AngerLogEditPage;
