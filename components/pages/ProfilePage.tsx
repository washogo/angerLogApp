import ProfileCard from "@/components/organisms/ProfileCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ProfilePage = () => {
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
          <ProfileCard />
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
