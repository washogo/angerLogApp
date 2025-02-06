import LoginCard from "@/components/organisms/LoginCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
/**
 * ログインページ
 * @returns ログインページ
 */
const LoginPage = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginCard />
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
