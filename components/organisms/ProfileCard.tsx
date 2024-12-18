import ProfileForm from "../molecules/ProfileForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProfileCard: React.FC = () => (
  <Box
    sx={{
      p: 4,
      border: "1px solid #ccc",
      borderRadius: 2,
      maxWidth: 500,
      mx: "auto",
    }}
  >
    <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
      プロフィール変更
    </Typography>
    <hr></hr>
    <ProfileForm />
  </Box>
);

export default ProfileCard;
