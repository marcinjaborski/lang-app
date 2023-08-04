import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Fab, Grow, Typography } from "@mui/material";
import { CreateDialog, NoteShelf, SharedNoteShelf } from "@src/features/module";
import { EmptyMessage, HomeStyled, ModuleSkeleton, NoteSkeleton, NoteSkeletonWrap } from "./Home.styled";
import { useHome } from "./useHome";

export const Home = () => {
  const { t, username, notes, modules, openCreateModuleDialog, isLoading } = useHome();

  return (
    <HomeStyled>
      <Typography variant="h4" fontWeight={500}>
        {t("hello")} {username}
      </Typography>
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
      {notes.listShared.data?.length ? <SharedNoteShelf notes={notes.listShared.data} /> : null}
      <Grow in>
        <Fab color="primary" onClick={openCreateModuleDialog}>
          <AddIcon />
        </Fab>
      </Grow>
      <CreateDialog />
    </HomeStyled>
  );
};
