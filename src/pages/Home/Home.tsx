import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Fab, Grow, Typography } from "@mui/material";
import { CreateDialog, NoteShelf, SharedNoteShelf } from "@src/features/module";
import { DragDropContext } from "react-beautiful-dnd";

import { EmptyMessage, HomeStyled, ModuleSkeleton, NoteSkeleton, NoteSkeletonWrap } from "./Home.styled";
import { useHome } from "./useHome";

export const Home = () => {
  const { t, username, notes, modules, openCreateModuleDialog, onDragEnd, isLoading } = useHome();

  return (
    <HomeStyled>
      <Typography fontWeight={500} variant="h4">
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
      <DragDropContext onDragEnd={onDragEnd}>
        {modules?.map((module) => <NoteShelf key={module.id} module={module} />)}
      </DragDropContext>
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
