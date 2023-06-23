import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Fab, Grow, Typography } from "@mui/material";
import { CreateDialog, NoteShelf } from "@src/features/module";
import { EmptyMessage, HomeStyled, ModuleSkeleton, NoteSkeleton, NoteSkeletonWrap, Title } from "./Home.styled";
import { useHome } from "./useHome";

export const Home = () => {
  const { t, username, modules, openCreateModuleDialog, isLoading } = useHome();

  return (
    <HomeStyled>
      <Title>
        {t("hello")} {username}
      </Title>
      <Divider />
      {isLoading ? (
        <>
          <ModuleSkeleton />
          <NoteSkeletonWrap>
            <NoteSkeleton />
            <NoteSkeleton />
            <NoteSkeleton />
          </NoteSkeletonWrap>
        </>
      ) : null}
      {modules?.length === 0 ? (
        <EmptyMessage>
          <Typography variant="h5">{t("emptyText")}</Typography>
          <Button variant="contained" onClick={openCreateModuleDialog}>
            {t("createButton")}
          </Button>
        </EmptyMessage>
      ) : null}
      {modules?.map((module) => (
        <NoteShelf module={module} key={module.id} />
      ))}
      <Grow in={true}>
        <Fab color="primary" onClick={openCreateModuleDialog}>
          <AddIcon />
        </Fab>
      </Grow>
      <CreateDialog />
    </HomeStyled>
  );
};
