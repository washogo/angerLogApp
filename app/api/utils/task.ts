type WorkContent = {
  id: number;
  userId: string;
  content: string;
  category: string;
};
export const fetchTaskData = async () => {
  const res = await import("../../api/task/route");
  const fetchedTasks = (await (await res.GET()).json()) as WorkContent[];
  return fetchedTasks;
};
