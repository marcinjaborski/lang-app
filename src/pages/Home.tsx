import { HomeStyled } from "../styles/Home.styled";
import { Box, Button, Divider, Fab, Grow, Typography } from "@mui/material";
import { useHome } from "../hooks/useHome";
import NoteShelf from "../components/NoteShelf";
import CreateModuleDialog from "../components/CreateModuleDialog";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const { t, username, modules, openCreateModuleDialog } = useHome();

  return (
    <HomeStyled>
      <Typography variant="h4">
        {t("hello")} {username}
      </Typography>
      <Divider />
      {modules?.length === 0 ? (
        <Box className="empty-message">
          <Typography variant="h5">{t("emptyText")}</Typography>
          <Button variant="contained" onClick={openCreateModuleDialog}>
            {t("createButton")}
          </Button>
        </Box>
      ) : null}
      {modules?.map((module) => (
        <NoteShelf module={module} key={module.id} />
      ))}
      <Grow in={true}>
        <Fab color="primary" onClick={openCreateModuleDialog}>
          <AddIcon />
        </Fab>
      </Grow>
      <CreateModuleDialog />
    </HomeStyled>
  );
};

export default Home;
