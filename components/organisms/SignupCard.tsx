import SignupForm from "../molecules/SignupForm";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const SignupCard: React.FC = () => (
  <Box
    sx={{
      p: 4,
      border: "1px solid #ccc",
      borderRadius: 2,
      maxWidth: 400,
      mx: "auto",
    }}
  >
    <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
      サインアップ
    </Typography>
    <hr></hr>
    <SignupForm />
    <Link
      href="/auth/login"
      sx={{ mt: 2, display: "block", textAlign: "center" }}
    >
      ログインへ戻る
    </Link>
  </Box>
);

export default SignupCard;
