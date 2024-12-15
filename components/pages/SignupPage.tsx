import SignupCard from "@/components/organisms/SignupCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SignupPage = () => {
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
          <SignupCard />
        </Box>
      </Container>
    </>
  );
};

export default SignupPage;
