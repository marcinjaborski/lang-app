import { HomeStyled } from "../styles/Home.styled";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useHome } from "../hooks/useHome";
import NoteShelf from "../components/NoteShelf";

const Home = () => {
  const { t, username, modules } = useHome();

  return (
    <HomeStyled>
      <Typography variant="h4">
        {t("hello")} {username}
      </Typography>
      <Divider />
      {modules?.length === 0 ? (
        <Box className="empty-message">
          <Typography variant="h5">{t("emptyText")}</Typography>
          <Button variant="contained">{t("createButton")}</Button>
        </Box>
      ) : null}
      {modules?.map((module) => (
        <NoteShelf module={module} key={module.id} />
      ))}
    </HomeStyled>
  );
};

export default Home;
