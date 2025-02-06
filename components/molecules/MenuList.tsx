import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const menuItems = [
  { label: "ホームへ", link: "/dashboard" },
  { label: "作業内容一覧", link: "/tasks" },
  { label: "アンガーログ登録", link: "/angerLog/new" },
  { label: "プロフィール変更", link: "/auth/profile" },
  { label: "ログアウト", link: "/auth/login" },
];
/**
 * サブメニューリストエリア
 * @returns サブメニューリスト
 */
const MenuList: React.FC = () => (
  <List>
    {menuItems.map((item) => (
      <ListItem disablePadding key={item.label}>
        <ListItemButton component="a" href={item.link}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default MenuList;
