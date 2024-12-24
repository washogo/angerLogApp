import { Typography, Paper } from "@mui/material";
import Link from "next/link";

type TaskListItemProps = {
  id: number;
  category: string;
  content: string;
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  category,
  content,
}) => (
  <Link href={`/tasks/edit/${id}`}>
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Typography variant="body1" fontWeight="bold">
        カテゴリ: {category}
      </Typography>
      <Typography variant="body2">作業内容: {content}</Typography>
    </Paper>
  </Link>
);

export default TaskListItem;
